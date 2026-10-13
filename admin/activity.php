<?php
define('BCCO_CMS', true);
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

require_auth();

$db = get_db_connection();
$pageTitle = 'Activity & Audit Log';
require_once __DIR__ . '/includes/header.php';

$filterAction = trim($_GET['action_filter'] ?? '');
$sql = "SELECT * FROM `cms_activity_log` WHERE 1=1";
$params = [];

if (!empty($filterAction)) {
    $sql .= " AND `action` = ?";
    $params[] = $filterAction;
}
$sql .= " ORDER BY `created_at` DESC LIMIT 150";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$logs = $stmt->fetchAll();
?>

<div class="card" style="margin-bottom: 20px;">
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
    <div>
      <h2 class="card-title">Administrative Audit Trail</h2>
      <p style="color: #718096; font-size: 0.85rem; margin: 4px 0 0 0;">
        Immutable record of all login events, content edits, uploads, and deletions for security and governance.
      </p>
    </div>

    <form method="GET" action="activity.php" style="display: flex; gap: 8px;">
      <select name="action_filter" class="form-control" style="width: auto; padding: 6px 12px;">
        <option value="">All Actions</option>
        <option value="login" <?php echo $filterAction === 'login' ? 'selected' : ''; ?>>Login</option>
        <option value="logout" <?php echo $filterAction === 'logout' ? 'selected' : ''; ?>>Logout</option>
        <option value="create_post" <?php echo $filterAction === 'create_post' ? 'selected' : ''; ?>>Create Post</option>
        <option value="update_post" <?php echo $filterAction === 'update_post' ? 'selected' : ''; ?>>Update Post</option>
        <option value="delete_post" <?php echo $filterAction === 'delete_post' ? 'selected' : ''; ?>>Delete Post</option>
        <option value="upload_media" <?php echo $filterAction === 'upload_media' ? 'selected' : ''; ?>>Upload Media</option>
        <option value="delete_media" <?php echo $filterAction === 'delete_media' ? 'selected' : ''; ?>>Delete Media</option>
        <option value="update_section" <?php echo $filterAction === 'update_section' ? 'selected' : ''; ?>>Update Section</option>
      </select>
      <button type="submit" class="btn btn-outline btn-sm">Filter</button>
      <?php if (!empty($filterAction)): ?>
        <a href="activity.php" class="btn btn-outline btn-sm">Reset</a>
      <?php endif; ?>
    </form>
  </div>
</div>

<div class="card">
  <?php if (empty($logs)): ?>
    <div style="text-align: center; padding: 40px; color: #718096;">
      No activity logs found.
    </div>
  <?php else: ?>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
            <th>Target</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($logs as $log): ?>
            <tr>
              <td style="color: #718096; font-size: 0.8rem; white-space: nowrap;">
                <?php echo date('M d, Y H:i:s', strtotime($log['created_at'])); ?>
              </td>
              <td>
                <strong><?php echo e($log['username']); ?></strong>
              </td>
              <td>
                <span class="badge badge-purple" style="font-size: 0.75rem;">
                  <?php echo e(str_replace('_', ' ', $log['action'])); ?>
                </span>
              </td>
              <td style="font-size: 0.85rem; color: #2D3748;">
                <?php echo e($log['details'] ?: '—'); ?>
              </td>
              <td style="color: #718096; font-size: 0.8rem;">
                <?php echo e($log['entity_type'] ? $log['entity_type'] . ' #' . $log['entity_id'] : '—'); ?>
              </td>
              <td style="font-family: monospace; font-size: 0.8rem; color: #718096;">
                <?php echo e($log['ip_address']); ?>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

