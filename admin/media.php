<?php
define('BCCO_CMS', true);
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

require_auth();

$db = get_db_connection();
$action = $_GET['action'] ?? 'grid';
$mediaId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$message = '';
$error = '';

// Handle Delete Media
if ($action === 'delete' && $mediaId > 0 && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        try {
            $stmt = $db->prepare("SELECT * FROM `cms_media` WHERE `id` = ?");
            $stmt->execute([$mediaId]);
            $media = $stmt->fetch();

            if ($media) {
                $filePath = $media['file_path'];
                $fullDiskPath = dirname(__DIR__) . '/' . ltrim($filePath, '/');

                // Delete physical file safely
                if (file_exists($fullDiskPath) && is_file($fullDiskPath)) {
                    @unlink($fullDiskPath);
                }

                $delStmt = $db->prepare("DELETE FROM `cms_media` WHERE `id` = ?");
                $delStmt->execute([$mediaId]);

                log_activity('delete_media', 'cms_media', $mediaId, "Deleted media: " . $media['file_name']);
                header('Location: media.php?msg=deleted');
                exit;
            } else {
                $error = 'Media file not found.';
            }
        } catch (PDOException $e) {
            $error = 'Error deleting media: ' . $e->getMessage();
        }
    }
}

// Handle Upload POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['media_file'])) {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        $altText = trim($_POST['alt_text'] ?? '');
        $uploadResult = handle_image_upload($_FILES['media_file']);

        if (isset($uploadResult['error'])) {
            $error = $uploadResult['error'];
        } else {
            try {
                $insertStmt = $db->prepare("
                    INSERT INTO `cms_media` 
                    (`file_name`, `file_path`, `file_size`, `mime_type`, `dimensions`, `alt_text`, `uploaded_by`) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ");
                $insertStmt->execute([
                    $uploadResult['file_name'],
                    $uploadResult['path'],
                    $uploadResult['file_size'],
                    $uploadResult['mime_type'],
                    $uploadResult['dimensions'],
                    $altText,
                    current_user()['id'] ?? null
                ]);
                $newId = $db->lastInsertId();
                log_activity('upload_media', 'cms_media', $newId, "Uploaded media file: " . $uploadResult['file_name']);
                header('Location: media.php?msg=uploaded');
                exit;
            } catch (PDOException $e) {
                $error = 'Failed to record media in database: ' . $e->getMessage();
            }
        }
    }
}

if (isset($_GET['msg'])) {
    if ($_GET['msg'] === 'uploaded') $message = 'File uploaded successfully to media library.';
    if ($_GET['msg'] === 'deleted') $message = 'Media file deleted successfully.';
}

$pageTitle = 'Media Library';
require_once __DIR__ . '/includes/header.php';
$csrfToken = generate_csrf_token();

// Fetch Media Items
$searchQuery = trim($_GET['q'] ?? '');
$sql = "SELECT * FROM `cms_media` WHERE 1=1";
$params = [];

if (!empty($searchQuery)) {
    $sql .= " AND (`file_name` LIKE ? OR `alt_text` LIKE ?)";
    $params[] = "%{$searchQuery}%";
    $params[] = "%{$searchQuery}%";
}
$sql .= " ORDER BY `created_at` DESC";
$mediaStmt = $db->prepare($sql);
$mediaStmt->execute($params);
$mediaItems = $mediaStmt->fetchAll();
?>

<?php if (!empty($message)): ?>
  <div class="alert alert-success"><?php echo e($message); ?></div>
<?php endif; ?>
<?php if (!empty($error)): ?>
  <div class="alert alert-danger"><?php echo e($error); ?></div>
<?php endif; ?>

<!-- Upload Section -->
<div class="card" style="margin-bottom: 24px;">
  <div class="card-header">
    <h2 class="card-title">Upload New Image</h2>
  </div>

  <form method="POST" action="media.php" enctype="multipart/form-data">
    <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">

    <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: flex-end;">
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" for="media_file">Select Image File *</label>
        <input type="file" id="media_file" name="media_file" class="form-control" required accept="image/jpeg,image/png,image/webp">
        <small style="color: #718096; font-size: 0.75rem;">Supported: JPG, PNG, WebP (Max 5MB)</small>
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" for="alt_text">Alt Text / Description (for Accessibility)</label>
        <input type="text" id="alt_text" name="alt_text" class="form-control" placeholder="e.g. Free cancer screening camp in rural Bihar">
      </div>

      <div>
        <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload Image
        </button>
      </div>
    </div>
  </form>
</div>

<!-- Media Grid & Search -->
<div class="card">
  <div class="card-header">
    <div style="display:flex;align-items:center;gap:12px;">
      <h2 class="card-title">Uploaded Media Files (<?php echo count($mediaItems); ?>)</h2>
    </div>

    <form method="GET" action="media.php" style="display: flex; gap: 8px;">
      <input type="text" name="q" class="form-control" placeholder="Search files..." value="<?php echo e($searchQuery); ?>" style="width: 220px; padding: 6px 12px;">
      <button type="submit" class="btn btn-outline btn-sm">Filter</button>
      <?php if (!empty($searchQuery)): ?>
        <a href="media.php" class="btn btn-outline btn-sm">Clear</a>
      <?php endif; ?>
    </form>
  </div>

  <?php if (empty($mediaItems)): ?>
    <div style="text-align: center; padding: 40px 20px; color: #718096;">
      <p style="font-size: 1.1rem; margin-bottom: 8px;">No media files found.</p>
      <small>Use the form above to upload images for blog posts, advisors, and website sections.</small>
    </div>
  <?php else: ?>
    <div class="media-grid">
      <?php foreach ($mediaItems as $item): ?>
        <?php
        $usage = check_image_usage($db, $item['file_path']);
        $isInUse = !empty($usage);
        $cleanPath = ltrim($item['file_path'], '/');
        ?>
        <div class="media-card">
          <img src="../<?php echo e($cleanPath); ?>" alt="<?php echo e($item['alt_text'] ?: $item['file_name']); ?>" loading="lazy">
          <div class="media-info">
            <div class="media-title" title="<?php echo e($item['file_name']); ?>"><?php echo e($item['file_name']); ?></div>
            <div class="media-meta">
              <?php echo e($item['dimensions'] ?: 'Image'); ?> &bull; <?php echo format_file_size($item['file_size']); ?>
            </div>

            <div style="margin: 8px 0;">
              <?php if ($isInUse): ?>
                <span class="badge badge-success" title="<?php echo e(implode(', ', $usage)); ?>">
                  In Use (<?php echo count($usage); ?> <?php echo count($usage) === 1 ? 'place' : 'places'; ?>)
                </span>
              <?php else: ?>
                <span class="badge" style="background:#EDF2F7;color:#4A5568;">Unused</span>
              <?php endif; ?>
            </div>

            <div style="display: flex; gap: 6px; margin-top: 10px;">
              <button type="button" class="btn btn-outline btn-sm" style="flex:1; font-size: 0.75rem; padding: 4px 6px;" onclick="copyToClipboard('<?php echo e($item['file_path']); ?>', this)">
                Copy Path
              </button>

              <form method="POST" action="media.php?action=delete&id=<?php echo (int)$item['id']; ?>" onsubmit="return confirm('<?php echo $isInUse ? 'WARNING: This image is currently in use in: ' . addslashes(implode(', ', $usage)) . '. Deleting it will result in broken images. Are you sure you want to delete?' : 'Are you sure you want to permanently delete this media file?'; ?>');">
                <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">
                <button type="submit" class="btn btn-danger btn-sm" style="padding: 4px 8px; font-size: 0.75rem;" title="Delete File">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

