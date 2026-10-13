<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - Enterprise Authentication & Anti-Bruteforce Engine
 * Hardened against: Brute-Force, Credential Stuffing, Session Hijacking, CSRF, & DDoS Floods
 */

if (!defined('BCCO_CMS')) {
    require_once __DIR__ . '/config.php';
}
require_once __DIR__ . '/db.php';

/**
 * Start and secure PHP session with strict cookie security flags
 */
function start_cms_session() {
    if (session_status() === PHP_SESSION_NONE) {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') 
            || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443)
            || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
        
        session_set_cookie_params([
            'lifetime' => defined('SESSION_LIFETIME') ? SESSION_LIFETIME : 86400,
            'path'     => '/',
            'domain'   => '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Strict'
        ]);

        ini_set('session.use_only_cookies', '1');
        ini_set('session.use_strict_mode', '1');
        ini_set('session.cookie_httponly', '1');
        
        session_start();
    }
}

/**
 * Check if the active session is valid, untampered, and unexpired
 */
function is_logged_in() {
    start_cms_session();
    
    if (empty($_SESSION['cms_user_id']) || empty($_SESSION['cms_username'])) {
        return false;
    }

    // Session inactivity timeout (default: 2 hours)
    $maxInactivity = 7200;
    if (isset($_SESSION['cms_last_active']) && (time() - $_SESSION['cms_last_active'] > $maxInactivity)) {
        destroy_cms_session();
        return false;
    }
    $_SESSION['cms_last_active'] = time();

    // Anti-Session Hijacking: Verify User Agent fingerprint
    $currentUaHash = hash('sha256', $_SERVER['HTTP_USER_AGENT'] ?? 'unknown_agent');
    if (!empty($_SESSION['cms_ua_hash']) && !hash_equals($_SESSION['cms_ua_hash'], $currentUaHash)) {
        destroy_cms_session();
        return false;
    }

    return true;
}

/**
 * Guard protected pages; redirect unauthenticated users to login
 */
function require_auth() {
    if (!is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

/**
 * Cleanly destroy the CMS session and invalidate cookie
 */
function destroy_cms_session() {
    start_cms_session();
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    @session_destroy();
}

/**
 * Get current authenticated user details
 */
function current_user() {
    if (!is_logged_in()) return null;
    return [
        'id'       => $_SESSION['cms_user_id'],
        'username' => $_SESSION['cms_username'],
        'email'    => $_SESSION['cms_email'] ?? '',
        'role'     => $_SESSION['cms_role'] ?? 'editor'
    ];
}

/**
 * Generate cryptographically secure CSRF token
 */
function generate_csrf_token() {
    start_cms_session();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token using timing-safe comparison
 */
function verify_csrf_token(string $token): bool {
    start_cms_session();
    $expected = $_SESSION['csrf_token'] ?? '';

    if (!is_string($expected) || $token === '' || $expected === '') {
        return false;
    }

    return hash_equals($expected, $token);
}

/**
 * Get real client IP address (Cloudflare & proxy aware)
 */
function get_client_ip() {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ip = trim($ips[0]);
    } else {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}

/**
 * Check brute-force throttle by IP and username.
 * Returns array: ['allowed' => bool, 'remaining_minutes' => int, 'attempts' => int]
 */
function check_login_throttle($ip, $username = '') {
    $tempDir = sys_get_temp_dir();
    $maxAttempts = defined('MAX_LOGIN_ATTEMPTS') ? MAX_LOGIN_ATTEMPTS : 5;
    $lockoutMinutes = defined('LOGIN_LOCKOUT_MINUTES') ? LOGIN_LOCKOUT_MINUTES : 15;
    $lockoutSeconds = $lockoutMinutes * 60;

    // Check IP throttle
    $ipFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_ip_' . md5($ip) . '.json';
    $ipData = load_throttle_file($ipFile, $lockoutSeconds);

    // Check Username throttle (blocks distributed brute-force targeting one account)
    $userFile = !empty($username) ? ($tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_usr_' . md5(strtolower(trim($username))) . '.json') : null;
    $userData = $userFile ? load_throttle_file($userFile, $lockoutSeconds) : ['count' => 0, 'last_attempt' => 0];

    $highestCount = max($ipData['count'], $userData['count']);
    $lastAttempt = max($ipData['last_attempt'], $userData['last_attempt']);

    // Tarpit slow-down: add intentional micro-delay if failures have begun
    if ($highestCount >= 2 && $highestCount < $maxAttempts) {
        // Sleep between 0.3s to 1.5s to throttle automated rapid fire scripts
        usleep(min($highestCount * 300000, 1500000));
    }

    if ($highestCount >= $maxAttempts) {
        $elapsed = time() - $lastAttempt;
        if ($elapsed < $lockoutSeconds) {
            $remaining = ceil(($lockoutSeconds - $elapsed) / 60);
            return [
                'allowed' => false,
                'remaining_minutes' => max(1, $remaining),
                'attempts' => $highestCount
            ];
        } else {
            // Lockout expired, clean up
            @unlink($ipFile);
            if ($userFile) @unlink($userFile);
        }
    }

    return [
        'allowed' => true,
        'remaining_minutes' => 0,
        'attempts' => $highestCount
    ];
}

/**
 * Record a failed login attempt for both IP and username
 */
function record_failed_login($ip, $username = '') {
    $tempDir = sys_get_temp_dir();
    $lockoutSeconds = (defined('LOGIN_LOCKOUT_MINUTES') ? LOGIN_LOCKOUT_MINUTES : 15) * 60;

    // Increment IP throttle
    $ipFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_ip_' . md5($ip) . '.json';
    increment_throttle_file($ipFile, $lockoutSeconds);

    // Increment Username throttle
    if (!empty($username)) {
        $userFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_usr_' . md5(strtolower(trim($username))) . '.json';
        increment_throttle_file($userFile, $lockoutSeconds);
    }
}

/**
 * Clear failed login attempts after successful authentication
 */
function clear_failed_logins($ip, $username = '') {
    $tempDir = sys_get_temp_dir();
    $ipFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_ip_' . md5($ip) . '.json';
    if (file_exists($ipFile)) @unlink($ipFile);

    if (!empty($username)) {
        $userFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_usr_' . md5(strtolower(trim($username))) . '.json';
        if (file_exists($userFile)) @unlink($userFile);
    }
}

/**
 * Load and validate throttle file data
 */
function load_throttle_file($filePath, $windowSeconds) {
    if (file_exists($filePath)) {
        $content = @file_get_contents($filePath);
        if ($content) {
            $data = json_decode($content, true);
            if (is_array($data) && isset($data['count'], $data['last_attempt'])) {
                if (time() - $data['last_attempt'] < $windowSeconds) {
                    return $data;
                }
            }
        }
    }
    return ['count' => 0, 'last_attempt' => 0];
}

/**
 * Increment throttle count in storage file
 */
function increment_throttle_file($filePath, $windowSeconds) {
    $current = load_throttle_file($filePath, $windowSeconds);
    $data = [
        'count' => $current['count'] + 1,
        'last_attempt' => time()
    ];
    @file_put_contents($filePath, json_encode($data));
}

/**
 * Log administrative activity to database audit trail
 */
function log_activity($action, $entityType = '', $entityId = null, $details = '') {
    $db = get_db_connection();
    if (!$db) return;

    $user = current_user();
    $userId = $user ? $user['id'] : null;
    $username = $user ? $user['username'] : 'system';
    $ip = get_client_ip();

    try {
        $stmt = $db->prepare("
            INSERT INTO `cms_activity_log` 
            (`user_id`, `username`, `action`, `entity_type`, `entity_id`, `details`, `ip_address`) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$userId, $username, $action, $entityType, $entityId, $details, $ip]);
    } catch (PDOException $e) {
        error_log("Activity Log Error: " . $e->getMessage());
    }
}
