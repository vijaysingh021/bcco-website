<?php
define('BCCO_CMS', true);
$pageTitle = 'Dashboard Overview';
require_once __DIR__ . '/includes/header.php';

$db = get_db_connection();

$stats = [
    'posts_total' => 0,
    'posts_published' => 0,
    'posts_draft' => 0,
    'media_count' => 0,
    'media_size' => 0,
    'profiles_count' => 0,
    'sections_count' => 0
];

$recentPosts = [];
$recentActivity = [];

if ($db) {
    try {
        $stats['posts_total'] = $db->query("SELECT COUNT(*) FROM `cms_posts`")->fetchColumn();
        $stats['posts_published'] = $db->query("SELECT COUNT(*) FROM `cms_posts` WHERE `status` = 'published'")->fetchColumn();
        $stats['posts_draft'] = $db->query("SELECT COUNT(*) FROM `cms_posts` WHERE `status` = 'draft'")->fetchColumn();

        $stats['media_count'] = $db->query("SELECT COUNT(*) FROM `cms_media`")->fetchColumn();
        $stats['media_size'] = $db->query("SELECT COALESCE(SUM(file_size), 0) FROM `cms_media`")->fetchColumn();

        $stats['profiles_count'] = $db->query("SELECT COUNT(*) FROM `cms_profiles` WHERE `status` = 'active'")->fetchColumn();
        $stats['sections_count'] = $db->query("SELECT COUNT(*) FROM `cms_sections`")->fetchColumn();

        // Recent Posts
        $recentPostsStmt = $db->query("SELECT `id`, `title`, `slug`, `category`, `status`, `published_at`, `created_at` FROM `cms_posts` ORDER BY `created_at` DESC LIMIT 5");
        $recentPosts = $recentPostsStmt->fetchAll();

        // Recent Activity
        $recentActivityStmt = $db->query("SELECT `username`, `action`, `entity_type`, `details`, `created_at` FROM `cms_activity_log` ORDER BY `created_at` DESC LIMIT 8");
        $recentActivity = $recentActivityStmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Dashboard query error: " . $e->getMessage());
    }
}
?>

<!-- Quick Stats -->
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-icon purple">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    </div>
    <div>
      <div class="stat-value"><?php echo (int)$stats['posts_total']; ?></div>
      <div class="stat-label">Blog &amp; News Posts (<?php echo (int)$stats['posts_published']; ?> published)</div>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon green">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    </div>
    <div>
      <div class="stat-value"><?php echo (int)$stats['media_count']; ?></div>
      <div class="stat-label">Media Assets (<?php echo format_file_size($stats['media_size']); ?>)</div>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon yellow">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    </div>
    <div>
      <div class="stat-value"><?php echo (int)$stats['profiles_count']; ?></div>
      <div class="stat-label">Advisors &amp; Leaders</div>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon red">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    </div>
    <div>
      <div class="stat-value"><?php echo (int)$stats['sections_count']; ?></div>
      <div class="stat-label">Configured Image Slots</div>
    </div>
  </div>
</div>

<!-- Quick Shortcuts -->
<div class="card" style="margin-bottom: 24px;">
  <div class="card-header">
    <h2 class="card-title">Quick Actions</h2>
  </div>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <a href="posts.php?action=new" class="btn btn-primary">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Write New Article
    </a>
    <a href="media.php" class="btn btn-outline">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      Upload to Media Library
    </a>
    <a href="sections.php" class="btn btn-outline">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      Update Website Images
    </a>
    <a href="profiles.php" class="btn btn-outline">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
      Manage Advisors &amp; Team
    </a>
  </div>
</div>

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
  <!-- Recent Articles -->
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Recent Blog &amp; News Posts</h2>
      <a href="posts.php" class="btn btn-outline btn-sm">View All &rarr;</a>
    </div>

    <?php if (empty($recentPosts)): ?>
      <p style="color: #718096; font-size: 0.9rem; padding: 10px 0;">No posts published yet. Click "Write New Article" to publish your first post!</p>
    <?php else: ?>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($recentPosts as $p): ?>
              <tr>
                <td><strong><?php echo e($p['title']); ?></strong></td>
                <td><span class="badge badge-purple"><?php echo e($p['category']); ?></span></td>
                <td>
                  <?php if ($p['status'] === 'published'): ?>
                    <span class="badge badge-success">Published</span>
                  <?php else: ?>
                    <span class="badge badge-warning">Draft</span>
                  <?php endif; ?>
                </td>
                <td style="color:#718096; font-size:0.85rem;"><?php echo date('M d, Y', strtotime($p['created_at'])); ?></td>
                <td style="text-align: right;">
                  <a href="posts.php?action=edit&id=<?php echo (int)$p['id']; ?>" class="btn btn-outline btn-sm">Edit</a>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
  </div>

  <!-- Recent System Activity -->
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Recent Activity</h2>
      <a href="activity.php" class="btn btn-outline btn-sm">View All</a>
    </div>

    <?php if (empty($recentActivity)): ?>
      <p style="color: #718096; font-size: 0.85rem;">No recent activities logged.</p>
    <?php else: ?>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <?php foreach ($recentActivity as $act): ?>
          <div style="font-size: 0.85rem; border-bottom: 1px solid #EDF2F7; padding-bottom: 8px;">
            <div style="font-weight: 600; color: #2D3748;">
              <?php echo e(ucwords(str_replace('_', ' ', $act['action']))); ?>
            </div>
            <div style="color: #718096; font-size: 0.8rem; margin: 2px 0;">
              <?php echo e($act['details'] ?: $act['entity_type']); ?>
            </div>
            <div style="color: #A0AEC0; font-size: 0.75rem;">
              By <?php echo e($act['username']); ?> &bull; <?php echo date('M d, H:i', strtotime($act['created_at'])); ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
