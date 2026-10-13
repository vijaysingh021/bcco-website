<?php
define('BCCO_CMS', true);
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

require_auth();

$db = get_db_connection();
$action = $_GET['action'] ?? 'list';
$postId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$message = '';
$error = '';

// Handle Delete Action
if ($action === 'delete' && $postId > 0 && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        try {
            $stmt = $db->prepare("SELECT `title` FROM `cms_posts` WHERE `id` = ?");
            $stmt->execute([$postId]);
            $postTitle = $stmt->fetchColumn();

            $delStmt = $db->prepare("DELETE FROM `cms_posts` WHERE `id` = ?");
            $delStmt->execute([$postId]);

            log_activity('delete_post', 'cms_posts', $postId, "Deleted post: " . ($postTitle ?: $postId));
            header('Location: posts.php?msg=deleted');
            exit;
        } catch (PDOException $e) {
            $error = 'Error deleting post: ' . $e->getMessage();
        }
    }
}

// Handle Save (Create / Update)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && in_array($action, ['new', 'edit'])) {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        $title = trim($_POST['title'] ?? '');
        $slug = trim($_POST['slug'] ?? '');
        $category = trim($_POST['category'] ?? 'General');
        $author = trim($_POST['author'] ?? 'BCCO Team');
        $excerpt = trim($_POST['excerpt'] ?? '');
        $content = $_POST['content'] ?? '';
        $featuredImage = trim($_POST['featured_image'] ?? '');
        $tags = trim($_POST['tags'] ?? '');
        $status = in_array($_POST['status'] ?? '', ['draft', 'published', 'archived']) ? $_POST['status'] : 'draft';
        $publishedAt = !empty($_POST['published_at']) ? $_POST['published_at'] : date('Y-m-d H:i:s');

        // Automatic slug if empty
        if (empty($slug)) {
            $slug = generate_slug($title);
        } else {
            $slug = generate_slug($slug);
        }

        // Handle Image Upload if supplied
        if (!empty($_FILES['image_file']['name'])) {
            $uploadResult = handle_image_upload($_FILES['image_file']);
            if (isset($uploadResult['error'])) {
                $error = $uploadResult['error'];
            } else {
                $featuredImage = $uploadResult['path'];
            }
        }

        if (empty($title)) {
            $error = 'Post title is required.';
        } elseif (empty($slug)) {
            $error = 'Post slug is required.';
        } elseif (empty($error)) {
            // Check for duplicate slug
            $slugCheck = $db->prepare("SELECT `id` FROM `cms_posts` WHERE `slug` = ? AND `id` != ?");
            $slugCheck->execute([$slug, $postId]);
            if ($slugCheck->fetch()) {
                $error = 'A post with this URL slug already exists. Please choose a unique slug.';
            } else {
                $cleanContent = sanitize_html($content);

                if ($action === 'new') {
                    $insertStmt = $db->prepare("
                        INSERT INTO `cms_posts` 
                        (`title`, `slug`, `category`, `author`, `excerpt`, `content`, `featured_image`, `tags`, `status`, `published_at`) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ");
                    $insertStmt->execute([
                        $title, $slug, $category, $author, $excerpt, $cleanContent, $featuredImage, $tags, $status, $publishedAt
                    ]);
                    $newId = $db->lastInsertId();
                    log_activity('create_post', 'cms_posts', $newId, "Created post: {$title}");
                    header('Location: posts.php?msg=created');
                    exit;
                } else {
                    $updateStmt = $db->prepare("
                        UPDATE `cms_posts` 
                        SET `title` = ?, `slug` = ?, `category` = ?, `author` = ?, `excerpt` = ?, `content` = ?, `featured_image` = ?, `tags` = ?, `status` = ?, `published_at` = ?, `updated_at` = NOW() 
                        WHERE `id` = ?
                    ");
                    $updateStmt->execute([
                        $title, $slug, $category, $author, $excerpt, $cleanContent, $featuredImage, $tags, $status, $publishedAt, $postId
                    ]);
                    log_activity('update_post', 'cms_posts', $postId, "Updated post: {$title}");
                    header('Location: posts.php?msg=updated');
                    exit;
                }
            }
        }
    }
}

// Display messages
if (isset($_GET['msg'])) {
    if ($_GET['msg'] === 'created') $message = 'Article created and saved successfully.';
    if ($_GET['msg'] === 'updated') $message = 'Article updated successfully.';
    if ($_GET['msg'] === 'deleted') $message = 'Article deleted successfully.';
}

$pageTitle = ($action === 'new') ? 'Write New Article' : (($action === 'edit') ? 'Edit Article' : 'Blog & News Management');
$headerActionHtml = ($action === 'list') ? '<a href="posts.php?action=new" class="btn btn-primary btn-sm">+ New Article</a>' : '<a href="posts.php" class="btn btn-outline btn-sm">&larr; Back to Posts</a>';

require_once __DIR__ . '/includes/header.php';
$csrfToken = generate_csrf_token();
?>

<?php if (!empty($message)): ?>
  <div class="alert alert-success"><?php echo e($message); ?></div>
<?php endif; ?>
<?php if (!empty($error)): ?>
  <div class="alert alert-danger"><?php echo e($error); ?></div>
<?php endif; ?>

<?php if ($action === 'new' || $action === 'edit'): ?>
  <?php
  $post = [
      'title' => '',
      'slug' => '',
      'category' => 'Medical',
      'author' => current_user()['username'] ?? 'BCCO Team',
      'excerpt' => '',
      'content' => '',
      'featured_image' => '',
      'tags' => '',
      'status' => 'published',
      'published_at' => date('Y-m-d\TH:i')
  ];

  if ($action === 'edit' && $postId > 0) {
      $fetchStmt = $db->prepare("SELECT * FROM `cms_posts` WHERE `id` = ?");
      $fetchStmt->execute([$postId]);
      $found = $fetchStmt->fetch();
      if ($found) {
          $post = $found;
          $post['published_at'] = date('Y-m-d\TH:i', strtotime($found['published_at']));
      } else {
          echo '<div class="alert alert-danger">Post not found.</div>';
          require_once __DIR__ . '/includes/footer.php';
          exit;
      }
  }
  ?>

  <div class="card">
    <div class="card-header">
      <h2 class="card-title"><?php echo ($action === 'new') ? 'Compose New Article' : 'Edit Article: ' . e($post['title']); ?></h2>
    </div>

    <form method="POST" action="posts.php?action=<?php echo $action; ?><?php echo $postId ? '&id=' . $postId : ''; ?>" enctype="multipart/form-data">
      <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
        <!-- Left: Content Fields -->
        <div>
          <div class="form-group">
            <label class="form-label" for="postTitle">Article Title *</label>
            <input type="text" id="postTitle" name="title" class="form-control" required value="<?php echo e($post['title']); ?>" placeholder="e.g. Early Cancer Detection Camps in Patna">
          </div>

          <div class="form-group">
            <label class="form-label" for="postSlug">URL Slug *</label>
            <input type="text" id="postSlug" name="slug" class="form-control" required value="<?php echo e($post['slug']); ?>" placeholder="early-cancer-detection-camps-patna">
            <small style="color: #718096; font-size: 0.8rem;">Used in clean URL and reader modal.</small>
          </div>

          <div class="form-group">
            <label class="form-label" for="postExcerpt">Short Summary / Excerpt</label>
            <textarea id="postExcerpt" name="excerpt" class="form-control" rows="3" placeholder="Brief 1-2 sentence overview shown on news cards..."><?php echo e($post['excerpt']); ?></textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="postContent">Full Article Content *</label>
            <textarea id="postContent" name="content" class="form-control" rows="14" required placeholder="Write the full news story or announcement here. Paragraphs and basic HTML formatting like &lt;b&gt;, &lt;i&gt;, &lt;ul&gt;, &lt;p&gt; are supported."><?php echo e($post['content']); ?></textarea>
          </div>
        </div>

        <!-- Right: Publishing Metadata -->
        <div>
          <div class="card" style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 18px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 14px; color: #2D3748;">Publish Settings</h3>

            <div class="form-group">
              <label class="form-label">Publication Status</label>
              <select name="status" class="form-control">
                <option value="published" <?php echo $post['status'] === 'published' ? 'selected' : ''; ?>>Published (Live)</option>
                <option value="draft" <?php echo $post['status'] === 'draft' ? 'selected' : ''; ?>>Draft (Hidden)</option>
                <option value="archived" <?php echo $post['status'] === 'archived' ? 'selected' : ''; ?>>Archived</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Publish Date &amp; Time</label>
              <input type="datetime-local" name="published_at" class="form-control" value="<?php echo e($post['published_at']); ?>">
            </div>

            <div class="form-group">
              <label class="form-label">Category</label>
              <select name="category" class="form-control">
                <option value="Medical" <?php echo $post['category'] === 'Medical' ? 'selected' : ''; ?>>Medical</option>
                <option value="Awareness" <?php echo $post['category'] === 'Awareness' ? 'selected' : ''; ?>>Awareness</option>
                <option value="Community" <?php echo $post['category'] === 'Community' ? 'selected' : ''; ?>>Community</option>
                <option value="Events" <?php echo $post['category'] === 'Events' ? 'selected' : ''; ?>>Events</option>
                <option value="Announcement" <?php echo $post['category'] === 'Announcement' ? 'selected' : ''; ?>>Announcement</option>
                <option value="General" <?php echo $post['category'] === 'General' ? 'selected' : ''; ?>>General</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Author Byline</label>
              <input type="text" name="author" class="form-control" value="<?php echo e($post['author']); ?>">
            </div>

            <div class="form-group">
              <label class="form-label">Tags (comma-separated)</label>
              <input type="text" name="tags" class="form-control" value="<?php echo e($post['tags']); ?>" placeholder="Cancer Care, Patna, Health Camp">
            </div>
          </div>

          <!-- Featured Image Card -->
          <div class="card" style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 18px; border-radius: 10px;">
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 14px; color: #2D3748;">Featured Image</h3>

            <?php if (!empty($post['featured_image'])): ?>
              <div style="margin-bottom: 12px; border-radius: 8px; overflow: hidden; border: 1px solid #CBD5E0;">
                <img src="../<?php echo e(ltrim($post['featured_image'], '/')); ?>" alt="Featured Image Preview" style="width: 100%; height: 140px; object-fit: cover;">
              </div>
            <?php endif; ?>

            <div class="form-group">
              <label class="form-label">Upload New Image</label>
              <input type="file" name="image_file" class="form-control" accept="image/jpeg,image/png,image/webp">
              <small style="color:#718096;font-size:0.75rem;">JPG, PNG, or WebP. Max 5MB.</small>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Or Image URL / Path</label>
              <input type="text" name="featured_image" class="form-control" value="<?php echo e($post['featured_image']); ?>" placeholder="assets/images/news-1.jpg">
            </div>
          </div>

          <div style="margin-top: 20px;">
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 1rem;">
              Save &amp; Publish Article
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>

<?php else: ?>
  <!-- Post List View -->
  <?php
  $statusFilter = $_GET['status'] ?? 'all';
  $searchQuery = trim($_GET['q'] ?? '');

  $sql = "SELECT * FROM `cms_posts` WHERE 1=1";
  $params = [];

  if ($statusFilter !== 'all') {
      $sql .= " AND `status` = ?";
      $params[] = $statusFilter;
  }
  if (!empty($searchQuery)) {
      $sql .= " AND (`title` LIKE ? OR `content` LIKE ?)";
      $params[] = "%{$searchQuery}%";
      $params[] = "%{$searchQuery}%";
  }
  $sql .= " ORDER BY `created_at` DESC";

  $postsStmt = $db->prepare($sql);
  $postsStmt->execute($params);
  $posts = $postsStmt->fetchAll();
  ?>

  <div class="card" style="margin-bottom: 20px;">
    <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center; flex-wrap: wrap;">
      <div style="display: flex; gap: 8px; align-items: center;">
        <a href="posts.php?status=all" class="btn btn-sm <?php echo $statusFilter === 'all' ? 'btn-primary' : 'btn-outline'; ?>">All Posts</a>
        <a href="posts.php?status=published" class="btn btn-sm <?php echo $statusFilter === 'published' ? 'btn-primary' : 'btn-outline'; ?>">Published</a>
        <a href="posts.php?status=draft" class="btn btn-sm <?php echo $statusFilter === 'draft' ? 'btn-primary' : 'btn-outline'; ?>">Drafts</a>
      </div>

      <form method="GET" action="posts.php" style="display: flex; gap: 8px;">
        <input type="text" name="q" class="form-control" placeholder="Search articles..." value="<?php echo e($searchQuery); ?>" style="width: 220px; padding: 6px 12px;">
        <button type="submit" class="btn btn-outline btn-sm">Search</button>
      </form>
    </div>
  </div>

  <div class="card">
    <?php if (empty($posts)): ?>
      <div style="text-align: center; padding: 40px 20px; color: #718096;">
        <p style="font-size: 1.1rem; margin-bottom: 12px;">No articles found matching criteria.</p>
        <a href="posts.php?action=new" class="btn btn-primary">+ Write New Article</a>
      </div>
    <?php else: ?>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width: 60px;">Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Date</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($posts as $p): ?>
              <tr>
                <td>
                  <?php if (!empty($p['featured_image'])): ?>
                    <img src="../<?php echo e(ltrim($p['featured_image'], '/')); ?>" alt="Thumb" style="width: 48px; height: 36px; object-fit: cover; border-radius: 4px; border: 1px solid #E2E8F0;">
                  <?php else: ?>
                    <div style="width: 48px; height: 36px; background: #EDF2F7; border-radius: 4px; display:flex; align-items:center; justify-content:center; color:#A0AEC0; font-size:10px;">None</div>
                  <?php endif; ?>
                </td>
                <td>
                  <strong style="color: #2D3748;"><?php echo e($p['title']); ?></strong>
                  <div style="font-size: 0.75rem; color: #718096;"><?php echo e($p['slug']); ?></div>
                </td>
                <td><span class="badge badge-purple"><?php echo e($p['category']); ?></span></td>
                <td style="color: #4A5568; font-size: 0.85rem;"><?php echo e($p['author']); ?></td>
                <td>
                  <?php if ($p['status'] === 'published'): ?>
                    <span class="badge badge-success">Published</span>
                  <?php else: ?>
                    <span class="badge badge-warning">Draft</span>
                  <?php endif; ?>
                </td>
                <td style="color: #718096; font-size: 0.85rem;">
                  <?php echo date('M d, Y', strtotime($p['published_at'] ?: $p['created_at'])); ?>
                </td>
                <td style="text-align: right; white-space: nowrap;">
                  <a href="posts.php?action=edit&id=<?php echo (int)$p['id']; ?>" class="btn btn-outline btn-sm">Edit</a>
                  
                  <form method="POST" action="posts.php?action=delete&id=<?php echo (int)$p['id']; ?>" style="display: inline-block;" onsubmit="return confirm('Are you sure you want to permanently delete this post?');">
                    <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">
                    <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                  </form>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
  </div>

<?php endif; ?>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

