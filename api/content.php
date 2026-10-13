<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - Public Content API
 * Read-only JSON endpoint for frontend content hydration.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');
header('X-Content-Type-Options: nosniff');

define('BCCO_CMS', true);
require_once __DIR__ . '/../admin/includes/config.php';
require_once __DIR__ . '/../admin/includes/db.php';

$response = [
    'success' => false,
    'posts' => [],
    'sections' => (object)[],
    'profiles' => [],
    'settings' => (object)[]
];

$db = get_db_connection();

if (!$db) {
    echo json_encode($response);
    exit;
}

try {
    // 1. Fetch Published Posts
    $postsStmt = $db->query("
        SELECT `id`, `title`, `slug`, `category`, `author`, `excerpt`, `content`, `featured_image`, `tags`, `published_at` 
        FROM `cms_posts` 
        WHERE `status` = 'published' 
        ORDER BY `published_at` DESC 
        LIMIT 20
    ");
    $response['posts'] = $postsStmt->fetchAll(PDO::FETCH_ASSOC);

    // 2. Fetch Section Images and Captions
    $sectionsStmt = $db->query("
        SELECT `section_key`, `title`, `subtitle`, `alt_text`, `image_url` 
        FROM `cms_sections`
    ");
    $sectionsMap = [];
    while ($row = $sectionsStmt->fetch(PDO::FETCH_ASSOC)) {
        $sectionsMap[$row['section_key']] = [
            'title'     => $row['title'],
            'subtitle'  => $row['subtitle'],
            'alt_text'  => $row['alt_text'],
            'image_url' => $row['image_url']
        ];
    }
    $response['sections'] = (object)$sectionsMap;

    // 3. Fetch Active Profiles
    $profilesStmt = $db->query("
        SELECT `id`, `name`, `role`, `organization`, `category`, `photo_url`, `bio` 
        FROM `cms_profiles` 
        WHERE `status` = 'active' 
        ORDER BY `sort_order` ASC, `created_at` ASC
    ");
    $response['profiles'] = $profilesStmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Fetch Public Settings
    $settingsStmt = $db->query("SELECT `setting_key`, `setting_value` FROM `cms_settings`");
    $settingsMap = [];
    while ($row = $settingsStmt->fetch(PDO::FETCH_ASSOC)) {
        $settingsMap[$row['setting_key']] = $row['setting_value'];
    }
    $response['settings'] = (object)$settingsMap;

    $response['success'] = true;
} catch (PDOException $e) {
    error_log("API Content Fetch Error: " . $e->getMessage());
}

echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
