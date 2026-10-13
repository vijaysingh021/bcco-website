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

// Handle login POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? '';
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!verify_csrf_token($csrfToken)) {
        $error = 'Security session expired. Please refresh and try again.';
    } elseif (!check_login_throttle($ip)) {
        $error = 'Too many failed login attempts. Please wait 15 minutes before trying again.';
    } elseif (empty($username) || empty($password)) {
        $error = 'Please enter both username and password.';
    } else {
        $db = get_db_connection();
        if (!$db) {
            $error = 'Database connection failed. Please ensure the database credentials in admin/includes/config.php are correct.';
        } else {
            $stmt = $db->prepare("SELECT * FROM `cms_users` WHERE (`username` = ? OR `email` = ?) AND `status` = 'active' LIMIT 1");
            $stmt->execute([$username, $username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                // Successful login
                session_regenerate_id(true);
                $_SESSION['cms_user_id'] = $user['id'];
                $_SESSION['cms_username'] = $user['username'];
                $_SESSION['cms_email'] = $user['email'];
                $_SESSION['cms_role'] = $user['role'];

                // Update last login
                $updateStmt = $db->prepare("UPDATE `cms_users` SET `last_login` = NOW() WHERE `id` = ?");
                $updateStmt->execute([$user['id']]);

                clear_failed_logins($ip);
                log_activity('login', 'cms_users', $user['id'], 'User logged in successfully');

                header('Location: index.php');
                exit;
            } else {
                record_failed_login($ip);
                log_activity('login_failed', 'cms_users', null, "Failed login attempt for user: {$username}");
                $error = 'Invalid username or password.';
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
  </style>
</head>
<body>

<div class="login-card">
  <div class="login-brand">
    <img src="../assets/images/logo.png" alt="BCCO Logo">
    <h1>BCCO Admin CMS</h1>
    <p>Sign in to manage website content and media</p>
  </div>

  <?php if (!empty($error)): ?>
    <div class="alert alert-danger" style="margin-bottom: 20px;">
      <?php echo e($error); ?>
    </div>
  <?php endif; ?>

  <form method="POST" action="login.php" autocomplete="on">
    <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">

    <div class="form-group">
      <label class="form-label" for="username">Username or Email</label>
      <input type="text" id="username" name="username" class="form-control" required autofocus autocomplete="username" placeholder="admin or email@example.com">
    </div>

    <div class="form-group">
      <label class="form-label" for="password">Password</label>
      <input type="password" id="password" name="password" class="form-control" required autocomplete="current-password" placeholder="••••••••••••">
    </div>

    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px; padding: 12px; font-size: 1rem;">
      Sign In to Dashboard
    </button>
  </form>

  <div style="margin-top: 24px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
    <a href="../" style="font-size: 0.85rem; color: #5B176F; text-decoration: none; font-weight: 600;">
      &larr; Return to Public Website
    </a>
  </div>
</div>

</body>
</html>

