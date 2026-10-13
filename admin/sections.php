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
            $jsonFilePath = __DIR__ . '/../data/cms_data.json';
            if ($db) {
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
            
            // Keep JSON store in sync
            if (file_exists($jsonFilePath)) {
                $cmsData = json_decode(file_get_contents($jsonFilePath), true);
                if ($cmsData && !empty($cmsData['sections'])) {
                    foreach ($cmsData['sections'] as &$s) {
                        if ($s['section_key'] === $sectionKey) {
                            $s['title'] = $title;
                            $s['subtitle'] = $subtitle;
                            $s['alt_text'] = $altText;
                            $s['image_url'] = $imageUrl;
                            $s['updated_at'] = date('c');
                            break;
                        }
                    }
                    file_put_contents($jsonFilePath, json_encode($cmsData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                    if (!$db) {
                        $message = "Section slot '{$sectionKey}' updated successfully in CMS storage!";
                    }
                }
            }
        }
    }
}

$pageTitle = 'Website Images & Sections';
require_once __DIR__ . '/includes/header.php';
$csrfToken = generate_csrf_token();

// Fetch all configured sections
$sections = [];
if ($db) {
    try {
        $sectionsStmt = $db->query("SELECT * FROM `cms_sections` ORDER BY `id` ASC");
        $sections = $sectionsStmt->fetchAll();
    } catch (PDOException $e) {
        $error = 'Database query failed: ' . $e->getMessage();
    }
}

if (empty($sections)) {
    $jsonFilePath = __DIR__ . '/../data/cms_data.json';
    if (file_exists($jsonFilePath)) {
        $cmsData = json_decode(file_get_contents($jsonFilePath), true);
        if ($cmsData && !empty($cmsData['sections'])) {
            $sections = $cmsData['sections'];
        }
    }
}
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

<div class="section-grid">
  <?php foreach ($sections as $sec): ?>
    <?php
    $cleanPath = ltrim($sec['image_url'], '/');
    $isLogo = str_contains($sec['image_url'], 'logo');
    ?>
    <div class="section-card">
      <div>
        <div class="section-card-header">
          <div>
            <h3 class="section-card-title"><?php echo e($sec['title'] ?: $sec['section_key']); ?></h3>
            <span class="badge badge-purple" style="margin-top: 6px;"><?php echo e($sec['section_key']); ?></span>
          </div>
        </div>

        <div class="section-card-preview">
          <?php if (!empty($sec['image_url'])): ?>
            <img src="../<?php echo e($cleanPath); ?>" alt="<?php echo e($sec['alt_text']); ?>" class="<?php echo $isLogo ? 'is-logo' : ''; ?>" style="<?php echo $isLogo ? 'object-fit:contain;padding:22px;background:#FAF5FC;' : 'object-fit:cover;'; ?>" onerror="this.onerror=null;this.src='../assets/images/placeholder-image.svg';">
          <?php else: ?>
            <img src="../assets/images/placeholder-image.svg" alt="Placeholder" style="object-fit: cover;">
          <?php endif; ?>
        </div>

        <div class="section-card-meta">
          <div><strong>Alt Text:</strong> <?php echo e($sec['alt_text'] ?: 'Not set'); ?></div>
          <div style="font-size: 11.5px; color: var(--text-subtle); word-break: break-all; margin-top: 3px;">
            <?php echo e($sec['image_url']); ?>
          </div>
        </div>
      </div>

      <!-- Quick Edit Form Dropdown -->
      <details style="background: #FAF7FB; border: 1.5px solid var(--border); border-radius: 9px; padding: 12px; margin-top: 10px;">
        <summary style="font-weight: 600; font-size: 13px; color: var(--primary); cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none;">
          <span>Change Image / Details</span>
          <span style="font-size: 12px;">&darr;</span>
        </summary>

        <form method="POST" action="sections.php" enctype="multipart/form-data" style="margin-top: 14px;">
          <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">
          <input type="hidden" name="section_key" value="<?php echo e($sec['section_key']); ?>">

          <div class="form-group">
            <label class="form-label" style="font-size: 12px;">Upload New Image</label>
            <input type="file" name="image_file" class="form-control" style="font-size: 12px; padding: 6px;" accept="image/jpeg,image/png,image/webp">
          </div>

          <div class="form-group">
            <label class="form-label" style="font-size: 12px;">Or Enter Image Path</label>
            <input type="text" name="image_url" class="form-control" style="font-size: 12px;" value="<?php echo e($sec['image_url']); ?>">
          </div>

          <div class="form-group">
            <label class="form-label" style="font-size: 12px;">Title / Caption</label>
            <input type="text" name="title" class="form-control" style="font-size: 12px;" value="<?php echo e($sec['title']); ?>">
          </div>

          <div class="form-group">
            <label class="form-label" style="font-size: 12px;">Alt Text (Accessibility)</label>
            <input type="text" name="alt_text" class="form-control" style="font-size: 12px;" value="<?php echo e($sec['alt_text']); ?>">
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

