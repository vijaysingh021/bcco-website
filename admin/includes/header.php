<?php
if (!defined('BCCO_CMS')) {
    require_once __DIR__ . '/config.php';
}
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/functions.php';

require_auth();
$user = current_user();
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? e($pageTitle) . ' — ' : ''; ?>BCCO Admin CMS</title>
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <link rel="stylesheet" href="css/admin.css">
</head>
<body>

<div class="admin-wrapper">
  <!-- Sidebar -->
  <aside class="admin-sidebar">
    <a href="index.php" class="sidebar-brand">
      <img src="../assets/images/logo.png" alt="BCCO Logo">
      <div>
        <span>BCCO CMS</span>
        <small>Control Center</small>
      </div>
    </a>

    <nav class="sidebar-nav">
      <div class="nav-label">Main Menu</div>
      <a href="index.php" class="<?php echo $currentPage === 'index.php' ? 'active' : ''; ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Dashboard
      </a>
      <a href="posts.php" class="<?php echo $currentPage === 'posts.php' ? 'active' : ''; ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        Blog &amp; News
      </a>
      <a href="media.php" class="<?php echo $currentPage === 'media.php' ? 'active' : ''; ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        Media Library
      </a>

      <div class="nav-label" style="margin-top:16px;">Content Sections</div>
      <a href="sections.php" class="<?php echo $currentPage === 'sections.php' ? 'active' : ''; ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        Website Images
      </a>
      <a href="profiles.php" class="<?php echo $currentPage === 'profiles.php' ? 'active' : ''; ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Advisors &amp; Team
      </a>

      <div class="nav-label" style="margin-top:16px;">System</div>
      <a href="activity.php" class="<?php echo $currentPage === 'activity.php' ? 'active' : ''; ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Activity Log
      </a>
      <a href="settings.php" class="<?php echo $currentPage === 'settings.php' ? 'active' : ''; ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        Website Settings
      </a>
      <a href="../" target="_blank">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        View Live Site &rarr;
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <b><?php echo e($user['username']); ?></b>
        <span><?php echo ucfirst(e($user['role'])); ?></span>
      </div>
      <a href="logout.php" class="btn btn-outline btn-sm" title="Log Out" style="color:#fff;border-color:rgba(255,255,255,0.25);">
        Log Out
      </a>
    </div>
  </aside>

  <!-- Main Workspace -->
  <main class="admin-main">
    <header class="admin-header">
      <div style="display:flex;align-items:center;gap:14px;">
        <button type="button" class="mobile-toggle" id="mobileSidebarToggle" aria-label="Toggle Navigation">&#9776;</button>
        <h1 class="header-title"><?php echo isset($pageTitle) ? e($pageTitle) : 'Dashboard'; ?></h1>
      </div>
      <div class="header-actions">
        <?php if (isset($headerActionHtml)) echo $headerActionHtml; ?>
        <a href="../" target="_blank" class="btn btn-outline btn-sm">Preview Site</a>
      </div>
    </header>

    <div class="admin-content">
