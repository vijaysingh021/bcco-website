<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - Authentication & CSRF Security
 */

if (!defined('BCCO_CMS')) {
    require_once __DIR__ . '/config.php';
}
require_once __DIR__ . '/db.php';

function start_cms_session() {
    if (session_status() === PHP_SESSION_NONE) {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
        
        session_set_cookie_params([
            'lifetime' => SESSION_LIFETIME,
            'path'     => '/',
            'domain'   => '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Strict'
        ]);

        ini_set('session.use_only_cookies', '1');
        ini_set('session.use_strict_mode', '1');
        
        session_start();
    }
}

function is_logged_in() {
    start_cms_session();
    return !empty($_SESSION['cms_user_id']) && !empty($_SESSION['cms_username']);
}

function require_auth() {
    if (!is_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function current_user() {
    if (!is_logged_in()) return null;
    return [
        'id'       => $_SESSION['cms_user_id'],
        'username' => $_SESSION['cms_username'],
        'email'    => $_SESSION['cms_email'] ?? '',
        'role'     => $_SESSION['cms_role'] ?? 'editor'
    ];
}

function generate_csrf_token() {
    start_cms_session();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token($token) {
    start_cms_session();
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

function get_client_ip() {
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function check_login_throttle($ip) {
    $tempDir = sys_get_temp_dir();
    $throttleFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_' . md5($ip) . '.json';
    
    if (file_exists($throttleFile)) {
        $data = @json_decode(file_get_contents($throttleFile), true);
        if ($data && isset($data['count'], $data['last_attempt'])) {
            $elapsedMinutes = (time() - $data['last_attempt']) / 60;
            if ($elapsedMinutes < LOGIN_LOCKOUT_MINUTES && $data['count'] >= MAX_LOGIN_ATTEMPTS) {
                return false; // locked out
            }
            if ($elapsedMinutes >= LOGIN_LOCKOUT_MINUTES) {
                @unlink($throttleFile);
            }
        }
    }
    return true;
}

function record_failed_login($ip) {
    $tempDir = sys_get_temp_dir();
    $throttleFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_' . md5($ip) . '.json';
    
    $count = 1;
    if (file_exists($throttleFile)) {
        $data = @json_decode(file_get_contents($throttleFile), true);
        if ($data && isset($data['count'])) {
            $count = $data['count'] + 1;
        }
    }
    
    @file_put_contents($throttleFile, json_encode([
        'count' => $count,
        'last_attempt' => time()
    ]));
}

function clear_failed_logins($ip) {
    $tempDir = sys_get_temp_dir();
    $throttleFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_throttle_' . md5($ip) . '.json';
    if (file_exists($throttleFile)) {
        @unlink($throttleFile);
    }
}

function log_activity($action, $entityType = '', $entityId = null, $details = '') {
    $db = get_db_connection();
    if (!$db) return;

    $user = current_user();
    $userId = $user ? $user['id'] : null;
    $username = $user ? $user['username'] : 'system';
    $ip = get_client_ip();

    try {
        $stmt = $db->prepare("INSERT INTO `cms_activity_log` (`user_id`, `username`, `action`, `entity_type`, `entity_id`, `details`, `ip_address`) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$userId, $username, $action, $entityType, $entityId, $details, $ip]);
    } catch (PDOException $e) {
        error_log("Activity Log Error: " . $e->getMessage());
    }
}

