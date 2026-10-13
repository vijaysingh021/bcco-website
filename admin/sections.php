<?php
define('BCCO_CMS', true);
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

require_auth();

$db = get_db_connection();
$message = '';
$error = '';

// Handle Section Update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['section_key'])) {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        $sectionKey = trim($_POST['section_key']);
        $title = trim($_POST['title'] ?? '');
        $subtitle = trim($_POST['subtitle'] ?? '');
        $altText = trim($_POST['alt_text'] ?? '');
        $imageUrl = trim($_POST['image_url'] ?? '');

        // Handle direct upload if present
        if (!empty($_FILES['image_file']['name'])) {
            $uploadResult = handle_image_upload($_FILES['image_file']);
            if (isset($uploadResult['error'])) {
                $error = $uploadResult['error'];
            } else {
                $imageUrl = $uploadResult['path'];
            }
        }

        if (empty($error)) {
            try {
                $updateStmt = $db->prepare("
                    UPDATE `cms_sections` 
                    SET `title` = ?, `subtitle` = ?, `alt_text` = ?, `image_url` = ?, `updated_at` = NOW() 
                    WHERE `section_key` = ?
                ");
                $updateStmt->execute([$title, $subtitle, $altText, $imageUrl, $sectionKey]);

                log_activity('update_section', 'cms_sections', null, "Updated website section image: {$sectionKey}");
                $message = "Section slot '{$sectionKey}' updated successfully!";
            } catch (PDOException $e) {
                $error = 'Failed to update section: ' . $e->getMessage();
            }
        }
    }
}

$pageTitle = 'Website Images & Sections';
require_once __DIR__ . '/includes/header.php';
$csrfToken = generate_csrf_token();

// Fetch all configured sections
$sectionsStmt = $db->query("SELECT * FROM `cms_sections` ORDER BY `id` ASC");
$sections = $sectionsStmt->fetchAll();
?>

<?php if (!empty($message)): ?>
  <div class="alert alert-success"><?php echo e($message); ?></div>
<?php endif; ?>
<?php if (!empty($error)): ?>
  <div class="alert alert-danger"><?php echo e($error); ?></div>
<?php endif; ?>

<div class="card" style="margin-bottom: 24px;">
  <h2 class="card-title" style="margin-bottom: 8px;">Homepage Image Management</h2>
  <p style="color: #718096; font-size: 0.9rem; margin: 0;">
    Manage and update images displayed throughout the BCCO public homepage without touching HTML or CSS. You can select existing files or upload replacements directly.
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
  <?php foreach ($sections as $sec): ?>
    <?php
    $cleanPath = ltrim($sec['image_url'], '/');
    ?>
    <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; color: #2D3748; margin: 0;"><?php echo e($sec['title'] ?: $sec['section_key']); ?></h3>
            <span class="badge badge-purple" style="font-size: 0.75rem; margin-top: 4px;"><?php echo e($sec['section_key']); ?></span>
          </div>
        </div>

        <div style="width: 100%; height: 160px; background: #EDF2F7; border-radius: 8px; overflow: hidden; margin-bottom: 14px; border: 1px solid #E2E8F0; display:flex; align-items:center; justify-content:center;">
          <?php if (!empty($sec['image_url'])): ?>
            <img src="../<?php echo e($cleanPath); ?>" alt="<?php echo e($sec['alt_text']); ?>" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='../assets/images/logo.png'; this.style.objectFit='contain';">
          <?php else: ?>
            <span style="color: #A0AEC0; font-size: 0.85rem;">No image configured</span>
          <?php endif; ?>
        </div>

        <p style="font-size: 0.85rem; color: #718096; margin-bottom: 16px;">
          <strong>Alt:</strong> <?php echo e($sec['alt_text'] ?: 'Not set'); ?><br>
          <small style="word-break: break-all; color: #A0AEC0;"><?php echo e($sec['image_url']); ?></small>
        </p>
      </div>

      <!-- Quick Edit Form -->
      <details style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px;">
        <summary style="font-weight: 600; font-size: 0.85rem; color: #5B176F; cursor: pointer;">
          Change Image / Details &darr;
        </summary>

        <form method="POST" action="sections.php" enctype="multipart/form-data" style="margin-top: 14px;">
          <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">
          <input type="hidden" name="section_key" value="<?php echo e($sec['section_key']); ?>">

          <div class="form-group">
            <label class="form-label" style="font-size: 0.8rem;">Upload New Image</label>
            <input type="file" name="image_file" class="form-control" style="font-size: 0.8rem; padding: 6px;" accept="image/jpeg,image/png,image/webp">
          </div>

          <div class="form-group">
            <label class="form-label" style="font-size: 0.8rem;">Or Enter Image Path</label>
            <input type="text" name="image_url" class="form-control" style="font-size: 0.8rem;" value="<?php echo e($sec['image_url']); ?>">
          </div>

          <div class="form-group">
            <label class="form-label" style="font-size: 0.8rem;">Title / Caption</label>
            <input type="text" name="title" class="form-control" style="font-size: 0.8rem;" value="<?php echo e($sec['title']); ?>">
          </div>

          <div class="form-group">
            <label class="form-label" style="font-size: 0.8rem;">Alt Text (Accessibility)</label>
            <input type="text" name="alt_text" class="form-control" style="font-size: 0.8rem;" value="<?php echo e($sec['alt_text']); ?>">
          </div>

          <button type="submit" class="btn btn-primary btn-sm" style="width: 100%; margin-top: 6px;">
            Save Changes
          </button>
        </form>
      </details>
    </div>
  <?php endforeach; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
