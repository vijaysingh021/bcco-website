<?php
define('BCCO_CMS', true);
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

require_auth();

$db = get_db_connection();
$user = current_user();
$message = '';
$error = '';

// Handle Settings Save
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        $actionType = $_POST['action_type'] ?? 'settings';

        if ($actionType === 'settings') {
            $settingsFields = [
                'site_title', 'contact_email', 'contact_phone1', 'contact_phone2',
                'contact_address', 'pan_number', 'csr_number', 'certifications',
                'donation_account_name', 'donation_account_number', 'donation_ifsc', 'donation_upi'
            ];

            try {
                $upsertStmt = $db->prepare("
                    INSERT INTO `cms_settings` (`setting_key`, `setting_value`, `updated_at`) 
                    VALUES (?, ?, NOW()) 
                    ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`), `updated_at` = NOW()
                ");

                foreach ($settingsFields as $key) {
                    if (isset($_POST[$key])) {
                        $upsertStmt->execute([$key, trim($_POST[$key])]);
                    }
                }

                log_activity('update_settings', 'cms_settings', null, 'Updated organization and website settings');
                $message = 'Settings updated successfully!';
            } catch (PDOException $e) {
                $error = 'Failed to update settings: ' . $e->getMessage();
            }
        } elseif ($actionType === 'password') {
            $currentPass = $_POST['current_password'] ?? '';
            $newPass = $_POST['new_password'] ?? '';
            $confirmPass = $_POST['confirm_password'] ?? '';

            if (empty($currentPass) || empty($newPass)) {
                $error = 'Please fill all password fields.';
            } elseif (strlen($newPass) < 10) {
                $error = 'New password must be at least 10 characters long.';
            } elseif ($newPass !== $confirmPass) {
                $error = 'New passwords do not match.';
            } else {
                $userStmt = $db->prepare("SELECT `password_hash` FROM `cms_users` WHERE `id` = ?");
                $userStmt->execute([$user['id']]);
                $hash = $userStmt->fetchColumn();

                if (!$hash || !password_verify($currentPass, $hash)) {
                    $error = 'Current password is incorrect.';
                } else {
                    $newHash = password_hash($newPass, PASSWORD_DEFAULT, ['cost' => 12]);
                    $updPass = $db->prepare("UPDATE `cms_users` SET `password_hash` = ?, `updated_at` = NOW() WHERE `id` = ?");
                    $updPass->execute([$newHash, $user['id']]);

                    log_activity('change_password', 'cms_users', $user['id'], 'User changed password');
                    $message = 'Password changed successfully!';
                }
            }
        }
    }
}

$pageTitle = 'Website & Account Settings';
require_once __DIR__ . '/includes/header.php';
$csrfToken = generate_csrf_token();

// Load current settings from DB
$currentSettings = [];
try {
    $setStmt = $db->query("SELECT `setting_key`, `setting_value` FROM `cms_settings`");
    while ($row = $setStmt->fetch()) {
        $currentSettings[$row['setting_key']] = $row['setting_value'];
    }
} catch (PDOException $e) {
    // fallback
}
?>

<?php if (!empty($message)): ?>
  <div class="alert alert-success"><?php echo e($message); ?></div>
<?php endif; ?>
<?php if (!empty($error)): ?>
  <div class="alert alert-danger"><?php echo e($error); ?></div>
<?php endif; ?>

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
  <!-- Organization & Contact Settings -->
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Organization &amp; Contact Details</h2>
    </div>

    <form method="POST" action="settings.php">
      <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">
      <input type="hidden" name="action_type" value="settings">

      <div class="form-group">
        <label class="form-label" for="site_title">Organization Name / Title</label>
        <input type="text" id="site_title" name="site_title" class="form-control" value="<?php echo e($currentSettings['site_title'] ?? 'Bihar Cancer Care Organisation (BCCO)'); ?>">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="contact_email">Official Email Address</label>
          <input type="email" id="contact_email" name="contact_email" class="form-control" value="<?php echo e($currentSettings['contact_email'] ?? 'bccoofficial01@gmail.com'); ?>">
        </div>

        <div class="form-group">
          <label class="form-label" for="contact_phone1">Helpline Phone 1</label>
          <input type="text" id="contact_phone1" name="contact_phone1" class="form-control" value="<?php echo e($currentSettings['contact_phone1'] ?? '+91 9431893358'); ?>">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="contact_phone2">Phone 2 (Landline / Secondary)</label>
          <input type="text" id="contact_phone2" name="contact_phone2" class="form-control" value="<?php echo e($currentSettings['contact_phone2'] ?? '+91 6123573290'); ?>">
        </div>

        <div class="form-group">
          <label class="form-label" for="pan_number">PAN Number</label>
          <input type="text" id="pan_number" name="pan_number" class="form-control" value="<?php echo e($currentSettings['pan_number'] ?? 'AAQAB0546B'); ?>">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="contact_address">Registered Office Address</label>
        <textarea id="contact_address" name="contact_address" class="form-control" rows="2"><?php echo e($currentSettings['contact_address'] ?? 'Ward No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023, India'); ?></textarea>
      </div>

      <h3 style="font-size: 1rem; font-weight: 700; color: #2D3748; margin: 24px 0 14px 0; border-top: 1px solid #E2E8F0; padding-top: 16px;">
        Tax &amp; Donation Credentials
      </h3>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="csr_number">CSR Registration Number</label>
          <input type="text" id="csr_number" name="csr_number" class="form-control" value="<?php echo e($currentSettings['csr_number'] ?? 'CSR00107875'); ?>">
        </div>

        <div class="form-group">
          <label class="form-label" for="certifications">Tax Certifications</label>
          <input type="text" id="certifications" name="certifications" class="form-control" value="<?php echo e($currentSettings['certifications'] ?? '12A and 80G Certified'); ?>">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="donation_account_name">Donation Account Name</label>
          <input type="text" id="donation_account_name" name="donation_account_name" class="form-control" value="<?php echo e($currentSettings['donation_account_name'] ?? 'Bihar Cancer Care Organization'); ?>">
        </div>

        <div class="form-group">
          <label class="form-label" for="donation_account_number">Bank Account Number</label>
          <input type="text" id="donation_account_number" name="donation_account_number" class="form-control" value="<?php echo e($currentSettings['donation_account_number'] ?? '44908340531'); ?>">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="donation_ifsc">Bank IFSC Code</label>
          <input type="text" id="donation_ifsc" name="donation_ifsc" class="form-control" value="<?php echo e($currentSettings['donation_ifsc'] ?? 'SBIN0009004'); ?>">
        </div>

        <div class="form-group">
          <label class="form-label" for="donation_upi">SBI UPI ID</label>
          <input type="text" id="donation_upi" name="donation_upi" class="form-control" value="<?php echo e($currentSettings['donation_upi'] ?? 'biharcancercareorganisation@sbi'); ?>">
        </div>
      </div>

      <button type="submit" class="btn btn-primary" style="margin-top: 10px;">
        Save Website Settings
      </button>
    </form>
  </div>

  <!-- Security & Password -->
  <div>
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header">
        <h2 class="card-title">Change Password</h2>
      </div>

      <form method="POST" action="settings.php">
        <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">
        <input type="hidden" name="action_type" value="password">

        <div class="form-group">
          <label class="form-label" for="current_password">Current Password</label>
          <input type="password" id="current_password" name="current_password" class="form-control" required placeholder="••••••••••••">
        </div>

        <div class="form-group">
          <label class="form-label" for="new_password">New Password (Min 10 chars)</label>
          <input type="password" id="new_password" name="new_password" class="form-control" required minlength="10" placeholder="••••••••••••">
        </div>

        <div class="form-group">
          <label class="form-label" for="confirm_password">Confirm New Password</label>
          <input type="password" id="confirm_password" name="confirm_password" class="form-control" required minlength="10" placeholder="••••••••••••">
        </div>

        <button type="submit" class="btn btn-outline" style="width: 100%; border-color: #5B176F; color: #5B176F;">
          Update Password
        </button>
      </form>
    </div>

    <div class="card" style="background: #F8FAFC;">
      <h3 style="font-size: 0.95rem; font-weight: 700; color: #2D3748; margin-bottom: 10px;">Server Information</h3>
      <div style="font-size: 0.85rem; color: #4A5568; line-height: 1.8;">
        <div><strong>PHP Version:</strong> <?php echo phpversion(); ?></div>
        <div><strong>Upload Max:</strong> <?php echo ini_get('upload_max_filesize'); ?></div>
        <div><strong>Post Max:</strong> <?php echo ini_get('post_max_size'); ?></div>
        <div><strong>Memory Limit:</strong> <?php echo ini_get('memory_limit'); ?></div>
      </div>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

