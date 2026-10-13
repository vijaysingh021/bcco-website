<?php
define('BCCO_CMS', true);
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

require_auth();

$db = get_db_connection();
$action = $_GET['action'] ?? 'list';
$profileId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$message = '';
$error = '';

// Handle Delete Profile
if ($action === 'delete' && $profileId > 0 && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        try {
            $stmt = $db->prepare("SELECT `name` FROM `cms_profiles` WHERE `id` = ?");
            $stmt->execute([$profileId]);
            $name = $stmt->fetchColumn();

            $del = $db->prepare("DELETE FROM `cms_profiles` WHERE `id` = ?");
            $del->execute([$profileId]);

            log_activity('delete_profile', 'cms_profiles', $profileId, "Deleted profile: {$name}");
            header('Location: profiles.php?msg=deleted');
            exit;
        } catch (PDOException $e) {
            $error = 'Error deleting profile: ' . $e->getMessage();
        }
    }
}

// Handle Save Profile
if ($_SERVER['REQUEST_METHOD'] === 'POST' && in_array($action, ['new', 'edit'])) {
    $token = $_POST['csrf_token'] ?? '';
    if (!verify_csrf_token($token)) {
        $error = 'Invalid security token.';
    } else {
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? '');
        $organization = trim($_POST['organization'] ?? '');
        $category = in_array($_POST['category'] ?? '', ['advisor', 'committee', 'team']) ? $_POST['category'] : 'advisor';
        $bio = trim($_POST['bio'] ?? '');
        $sortOrder = (int)($_POST['sort_order'] ?? 0);
        $status = ($_POST['status'] ?? '') === 'active' ? 'active' : 'hidden';
        $photoUrl = trim($_POST['photo_url'] ?? '');

        // Handle avatar upload
        if (!empty($_FILES['photo_file']['name'])) {
            $uploadResult = handle_image_upload($_FILES['photo_file']);
            if (isset($uploadResult['error'])) {
                $error = $uploadResult['error'];
            } else {
                $photoUrl = $uploadResult['path'];
            }
        }

        if (empty($name) || empty($role)) {
            $error = 'Name and Role are required.';
        } elseif (empty($error)) {
            if ($action === 'new') {
                $ins = $db->prepare("
                    INSERT INTO `cms_profiles` 
                    (`name`, `role`, `organization`, `category`, `photo_url`, `bio`, `sort_order`, `status`) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ");
                $ins->execute([$name, $role, $organization, $category, $photoUrl, $bio, $sortOrder, $status]);
                $newId = $db->lastInsertId();
                log_activity('create_profile', 'cms_profiles', $newId, "Created profile: {$name}");
                header('Location: profiles.php?msg=created');
                exit;
            } else {
                $upd = $db->prepare("
                    UPDATE `cms_profiles` 
                    SET `name` = ?, `role` = ?, `organization` = ?, `category` = ?, `photo_url` = ?, `bio` = ?, `sort_order` = ?, `status` = ?, `updated_at` = NOW() 
                    WHERE `id` = ?
                ");
                $upd->execute([$name, $role, $organization, $category, $photoUrl, $bio, $sortOrder, $status, $profileId]);
                log_activity('update_profile', 'cms_profiles', $profileId, "Updated profile: {$name}");
                header('Location: profiles.php?msg=updated');
                exit;
            }
        }
    }
}

if (isset($_GET['msg'])) {
    if ($_GET['msg'] === 'created') $message = 'Profile created successfully.';
    if ($_GET['msg'] === 'updated') $message = 'Profile updated successfully.';
    if ($_GET['msg'] === 'deleted') $message = 'Profile deleted successfully.';
}

$pageTitle = ($action === 'new') ? 'Add New Profile' : (($action === 'edit') ? 'Edit Profile' : 'Advisors & Team Members');
$headerActionHtml = ($action === 'list') ? '<a href="profiles.php?action=new" class="btn btn-primary btn-sm">+ Add New Profile</a>' : '<a href="profiles.php" class="btn btn-outline btn-sm">&larr; Back to Profiles</a>';

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
  $profile = [
      'name' => '',
      'role' => '',
      'organization' => '',
      'category' => 'advisor',
      'photo_url' => '',
      'bio' => '',
      'sort_order' => 0,
      'status' => 'active'
  ];

  if ($action === 'edit' && $profileId > 0) {
      $fetchStmt = $db->prepare("SELECT * FROM `cms_profiles` WHERE `id` = ?");
      $fetchStmt->execute([$profileId]);
      $found = $fetchStmt->fetch();
      if ($found) {
          $profile = $found;
      }
  }
  ?>

  <div class="card" style="max-width: 700px; margin: 0 auto;">
    <div class="card-header">
      <h2 class="card-title"><?php echo ($action === 'new') ? 'Add New Profile' : 'Edit Profile: ' . e($profile['name']); ?></h2>
    </div>

    <form method="POST" action="profiles.php?action=<?php echo $action; ?><?php echo $profileId ? '&id=' . $profileId : ''; ?>" enctype="multipart/form-data">
      <input type="hidden" name="csrf_token" value="<?php echo e($csrfToken); ?>">

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="name">Full Name &amp; Titles *</label>
          <input type="text" id="name" name="name" class="form-control" required value="<?php echo e($profile['name']); ?>" placeholder="e.g. Dr. A. K. Singh">
        </div>

        <div class="form-group">
          <label class="form-label" for="category">Category</label>
          <select id="category" name="category" class="form-control">
            <option value="advisor" <?php echo $profile['category'] === 'advisor' ? 'selected' : ''; ?>>Board of Advisors</option>
            <option value="committee" <?php echo $profile['category'] === 'committee' ? 'selected' : ''; ?>>Managing Committee</option>
            <option value="team" <?php echo $profile['category'] === 'team' ? 'selected' : ''; ?>>Working Team</option>
          </select>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label" for="role">Designation / Role *</label>
          <input type="text" id="role" name="role" class="form-control" required value="<?php echo e($profile['role']); ?>" placeholder="e.g. Senior Oncologist &amp; Medical Advisor">
        </div>

        <div class="form-group">
          <label class="form-label" for="organization">Organization / Affiliation</label>
          <input type="text" id="organization" name="organization" class="form-control" value="<?php echo e($profile['organization']); ?>" placeholder="e.g. AIIMS Patna / Ex-IGIMS">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bio">Short Biography</label>
        <textarea id="bio" name="bio" class="form-control" rows="3" placeholder="Brief summary of their contribution or medical leadership..."><?php echo e($profile['bio']); ?></textarea>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="form-group">
          <label class="form-label">Profile Avatar / Photo</label>
          <?php if (!empty($profile['photo_url'])): ?>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <img src="../<?php echo e(ltrim($profile['photo_url'], '/')); ?>" alt="Photo" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid #CBD5E0;">
              <small style="color: #718096;"><?php echo e($profile['photo_url']); ?></small>
            </div>
          <?php endif; ?>
          <input type="file" name="photo_file" class="form-control" accept="image/jpeg,image/png,image/webp">
          <input type="text" name="photo_url" class="form-control" style="margin-top: 6px; font-size: 0.8rem;" value="<?php echo e($profile['photo_url']); ?>" placeholder="Or enter image path">
        </div>

        <div>
          <div class="form-group">
            <label class="form-label" for="sort_order">Display Order (Lower numbers appear first)</label>
            <input type="number" id="sort_order" name="sort_order" class="form-control" value="<?php echo (int)$profile['sort_order']; ?>">
          </div>

          <div class="form-group">
            <label class="form-label">Visibility Status</label>
            <select name="status" class="form-control">
              <option value="active" <?php echo $profile['status'] === 'active' ? 'selected' : ''; ?>>Active (Visible on website)</option>
              <option value="hidden" <?php echo $profile['status'] === 'hidden' ? 'selected' : ''; ?>>Hidden (Archived)</option>
            </select>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; display: flex; gap: 12px;">
        <button type="submit" class="btn btn-primary" style="flex: 1; padding: 10px;">Save Profile</button>
        <a href="profiles.php" class="btn btn-outline" style="padding: 10px;">Cancel</a>
      </div>
    </form>
  </div>

<?php else: ?>
  <!-- Profile List View -->
  <?php
  $categoryFilter = $_GET['cat'] ?? 'all';
  $sql = "SELECT * FROM `cms_profiles` WHERE 1=1";
  $params = [];

  if ($categoryFilter !== 'all') {
      $sql .= " AND `category` = ?";
      $params[] = $categoryFilter;
  }
  $sql .= " ORDER BY `sort_order` ASC, `created_at` ASC";
  $profilesStmt = $db->prepare($sql);
  $profilesStmt->execute($params);
  $profiles = $profilesStmt->fetchAll();
  ?>

  <div class="card" style="margin-bottom: 20px;">
    <div style="display: flex; gap: 8px;">
      <a href="profiles.php?cat=all" class="btn btn-sm <?php echo $categoryFilter === 'all' ? 'btn-primary' : 'btn-outline'; ?>">All Categories</a>
      <a href="profiles.php?cat=advisor" class="btn btn-sm <?php echo $categoryFilter === 'advisor' ? 'btn-primary' : 'btn-outline'; ?>">Advisors</a>
      <a href="profiles.php?cat=committee" class="btn btn-sm <?php echo $categoryFilter === 'committee' ? 'btn-primary' : 'btn-outline'; ?>">Managing Committee</a>
      <a href="profiles.php?cat=team" class="btn btn-sm <?php echo $categoryFilter === 'team' ? 'btn-primary' : 'btn-outline'; ?>">Working Team</a>
    </div>
  </div>

  <div class="card">
    <?php if (empty($profiles)): ?>
      <div style="text-align: center; padding: 40px; color: #718096;">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">No profiles found.</p>
        <a href="profiles.php?action=new" class="btn btn-primary">+ Add New Profile</a>
      </div>
    <?php else: ?>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width: 50px;">Photo</th>
              <th>Name &amp; Affiliation</th>
              <th>Category</th>
              <th>Role</th>
              <th>Order</th>
              <th>Status</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($profiles as $prof): ?>
              <tr>
                <td>
                  <?php if (!empty($prof['photo_url'])): ?>
                    <img src="../<?php echo e(ltrim($prof['photo_url'], '/')); ?>" alt="Photo" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #CBD5E0;" onerror="this.src='../assets/images/logo.png';">
                  <?php else: ?>
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: #EDF2F7; display:flex; align-items:center; justify-content:center; color:#A0AEC0; font-size:12px;">👤</div>
                  <?php endif; ?>
                </td>
                <td>
                  <strong style="color: #2D3748;"><?php echo e($prof['name']); ?></strong>
                  <?php if (!empty($prof['organization'])): ?>
                    <div style="font-size: 0.8rem; color: #718096;"><?php echo e($prof['organization']); ?></div>
                  <?php endif; ?>
                </td>
                <td>
                  <span class="badge badge-purple"><?php echo ucfirst(e($prof['category'])); ?></span>
                </td>
                <td style="color: #4A5568; font-size: 0.85rem;"><?php echo e($prof['role']); ?></td>
                <td style="color: #718096; font-size: 0.85rem;"><?php echo (int)$prof['sort_order']; ?></td>
                <td>
                  <?php if ($prof['status'] === 'active'): ?>
                    <span class="badge badge-success">Active</span>
                  <?php else: ?>
                    <span class="badge badge-warning">Hidden</span>
                  <?php endif; ?>
                </td>
                <td style="text-align: right; white-space: nowrap;">
                  <a href="profiles.php?action=edit&id=<?php echo (int)$prof['id']; ?>" class="btn btn-outline btn-sm">Edit</a>

                  <form method="POST" action="profiles.php?action=delete&id=<?php echo (int)$prof['id']; ?>" style="display:inline-block;" onsubmit="return confirm('Are you sure you want to delete this profile?');">
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
