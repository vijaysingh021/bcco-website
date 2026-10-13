<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

start_cms_session();

$db = get_db_connection();
$isLocked = false;
$error = '';
$success = '';

if ($db) {
    try {
        $stmt = $db->query("SELECT COUNT(*) FROM `cms_users` WHERE `role` = 'admin'");
        if ($stmt && $stmt->fetchColumn() > 0) {
            $isLocked = true;
        }
    } catch (PDOException $e) {
        // Tables might not exist yet, which is expected before setup
    }
}

// Handle Form Submission
if (!$isLocked && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'] ?? '';
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if (!verify_csrf_token($csrfToken)) {
        $error = 'Security session expired. Please refresh and try again.';
    } elseif (!$db) {
        $error = 'Cannot connect to database. Please check your DB credentials in admin/includes/config.php.';
    } elseif (empty($username) || empty($email) || empty($password)) {
        $error = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please enter a valid email address.';
    } elseif (strlen($password) < 10) {
        $error = 'Password must be at least 10 characters long.';
    } elseif ($password !== $confirmPassword) {
        $error = 'Passwords do not match.';
    } else {
        try {
            // Check if tables exist, if not run schema
            $tableCheck = $db->query("SHOW TABLES LIKE 'cms_users'");
            if ($tableCheck->rowCount() === 0) {
                $schemaSql = @file_get_contents(__DIR__ . '/schema.sql');
                if ($schemaSql) {
                    $db->exec($schemaSql);
                }
            }

            // Insert new Admin
            $hash = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
            $stmt = $db->prepare("INSERT INTO `cms_users` (`username`, `email`, `password_hash`, `role`, `status`) VALUES (?, ?, ?, 'admin', 'active')");
            $stmt->execute([$username, $email, $hash]);

            $newId = $db->lastInsertId();
            log_activity('setup_completed', 'cms_users', $newId, 'Initial administrator account created');

            $success = 'Administrator account created successfully! You can now log in.';
            $isLocked = true;
        } catch (PDOException $e) {
            $error = 'Setup failed: ' . $e->getMessage();
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
  <title>CMS Setup Wizard — BCCO CMS</title>
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
    .setup-card {
      width: 100%;
      max-width: 500px;
      background: #ffffff;
      border-radius: 16px;
      padding: 36px 32px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
    }
    .setup-brand {
      text-align: center;
      margin-bottom: 24px;
    }
    .setup-brand img {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      margin-bottom: 12px;
      object-fit: contain;
    }
  </style>
</head>
<body>

<div class="setup-card">
  <div class="setup-brand">
    <img src="../assets/images/logo.png" alt="BCCO Logo">
    <h1 style="font-size: 1.4rem; color: #250A2E; margin: 0; font-weight: 800;">BCCO CMS Setup Wizard</h1>
    <p style="font-size: 0.85rem; color: #718096; margin-top: 4px;">Initial Setup &amp; Admin Configuration</p>
  </div>

  <?php if ($isLocked && empty($success)): ?>
    <div class="alert alert-info" style="margin-bottom: 20px;">
      <strong>Setup is Locked:</strong> An administrator account is already configured. Setup cannot be re-run for security reasons.
    </div>
    <div style="text-align: center;">
      <a href="login.php" class="btn btn-primary" style="width: 100%; padding: 12px;">Go to Admin Login &rarr;</a>
    </div>
  <?php elseif (!empty($success)): ?>
    <div class="alert alert-success" style="margin-bottom: 20px;">
      <?php echo e($success); ?>
    </div>
    <div style="text-align: center;">
      <a href="login.php" class="btn btn-primary" style="width: 100%; padding: 12px;">Proceed to Admin Login &rarr;</a>
    </div>
  <?php else: ?>
    <?php if (!empty($error)): ?>
      <div class="alert alert-danger" style="margin-bottom: 20px;">
        <?php echo e($error); ?>
      </div>
    <?php endif; ?>

    <p style="font-size: 0.9rem; color: #4A5568; margin-bottom: 20px;">
      Create the primary administrator account for the BCCO Content Management System.
    </p>

    <form method="POST" action="setup.php">
      <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">

      <div class="form-group">
        <label class="form-label" for="username">Admin Username</label>
        <input type="text" id="username" name="username" class="form-control" required placeholder="e.g. bcco_admin">
      </div>

      <div class="form-group">
        <label class="form-label" for="email">Admin Email Address</label>
        <input type="email" id="email" name="email" class="form-control" required placeholder="bccoofficial01@gmail.com">
      </div>

      <div class="form-group">
        <label class="form-label" for="password">Password (Minimum 10 characters)</label>
        <input type="password" id="password" name="password" class="form-control" required minlength="10" placeholder="••••••••••••">
      </div>

      <div class="form-group">
        <label class="form-label" for="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" name="confirm_password" class="form-control" required minlength="10" placeholder="••••••••••••">
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; margin-top: 10px;">
        Complete Setup &amp; Create Admin
      </button>
    </form>
  <?php endif; ?>

  <div style="margin-top: 24px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
    <a href="../" style="font-size: 0.85rem; color: #5B176F; text-decoration: none; font-weight: 600;">
      &larr; Return to Public Website
    </a>
  </div>
</div>

</body>
</html>

