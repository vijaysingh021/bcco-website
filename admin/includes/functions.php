<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - Helper Functions
 */

if (!defined('BCCO_CMS')) {
    require_once __DIR__ . '/config.php';
}

/**
 * Escape HTML output
 */
function e($str) {
    return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8');
}

/**
 * Sanitize plain single-line text
 */
function sanitize_text($str, $max_len = 255) {
    $str = strip_tags((string)$str);
    $str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    return mb_substr(trim($str), 0, $max_len);
}

/**
 * Sanitize rich text / article body, preserving safe tags and preventing XSS
 */
function sanitize_html($html) {
    // Strip malicious tags
    $html = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $html);
    $html = preg_replace('#<iframe(.*?)>(.*?)</iframe>#is', '', $html);
    $html = preg_replace('#<object(.*?)>(.*?)</object>#is', '', $html);
    $html = preg_replace('#<embed(.*?)>(.*?)</embed>#is', '', $html);
    $html = preg_replace('#<applet(.*?)>(.*?)</applet>#is', '', $html);
    $html = preg_replace('#<style(.*?)>(.*?)</style>#is', '', $html);
    
    // Strip inline event attributes like onload, onclick, onerror
    $html = preg_replace('#\s*on\w+\s*=\s*(["\']).*?\1#is', '', $html);
    $html = preg_replace('#\s*on\w+\s*=\s*[^>\s]+#is', '', $html);
    
    // Disallow javascript: pseudo-protocols
    $html = preg_replace('#href\s*=\s*(["\'])javascript:.*?\1#is', 'href="#"', $html);
    $html = preg_replace('#src\s*=\s*(["\'])javascript:.*?\1#is', '', $html);

    // Allowed tags whitelist
    $allowed_tags = '<p><br><b><strong><i><em><u><h3><h4><h5><h6><ul><ol><li><a><blockquote><code><pre><img><hr>';
    return strip_tags(trim($html), $allowed_tags);
}

/**
 * Generate a clean URL-friendly slug
 */
function generate_slug($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'post-' . time() : $text;
}

/**
 * Handle secure image upload
 */
function handle_image_upload($fileArray, $altText = '', $caption = '') {
    if (!isset($fileArray['error']) || is_array($fileArray['error'])) {
        return ['success' => false, 'error' => 'Invalid upload parameters.'];
    }

    if ($fileArray['error'] !== UPLOAD_ERR_OK) {
        $uploadErrors = [
            UPLOAD_ERR_INI_SIZE   => 'The uploaded file exceeds the upload_max_filesize directive in php.ini.',
            UPLOAD_ERR_FORM_SIZE  => 'The uploaded file exceeds the MAX_FILE_SIZE directive.',
            UPLOAD_ERR_PARTIAL    => 'The uploaded file was only partially uploaded.',
            UPLOAD_ERR_NO_FILE    => 'No file was uploaded.',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing a temporary folder.',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk.',
            UPLOAD_ERR_EXTENSION  => 'A PHP extension stopped the file upload.',
        ];
        return ['success' => false, 'error' => $uploadErrors[$fileArray['error']] ?? 'Unknown upload error.'];
    }

    // 1. File size check
    if ($fileArray['size'] > MAX_UPLOAD_BYTES) {
        return ['success' => false, 'error' => 'File size exceeds maximum allowed limit (5 MB).'];
    }

    // 2. Extension check
    $origName = basename($fileArray['name']);
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
    if (!in_array($ext, ALLOWED_EXTENSIONS, true)) {
        return ['success' => false, 'error' => 'Invalid file extension. Only JPG, PNG, and WebP are allowed.'];
    }

    // 3. MIME type check via finfo
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($fileArray['tmp_name']);
    if (!in_array($mimeType, ALLOWED_MIME_TYPES, true)) {
        return ['success' => false, 'error' => 'Invalid file content type: ' . e($mimeType)];
    }

    // 4. Dimensions check via getimagesize
    $imgInfo = @getimagesize($fileArray['tmp_name']);
    if ($imgInfo === false) {
        return ['success' => false, 'error' => 'The uploaded file is not a valid recognized image.'];
    }
    $width = $imgInfo[0];
    $height = $imgInfo[1];

    // Ensure upload dir exists
    if (!is_dir(UPLOAD_DIR)) {
        @mkdir(UPLOAD_DIR, 0755, true);
    }

    // 5. Generate secure random filename
    $uniqueName = 'img_' . date('Ymd_His') . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
    $targetPath = UPLOAD_DIR . DIRECTORY_SEPARATOR . $uniqueName;

    if (!move_uploaded_file($fileArray['tmp_name'], $targetPath)) {
        return ['success' => false, 'error' => 'Failed to move uploaded file to destination directory.'];
    }

    // 6. Record in Database
    $db = get_db_connection();
    $mediaId = null;
    $fileUrl = 'uploads/' . $uniqueName;

    if ($db) {
        try {
            $stmt = $db->prepare("INSERT INTO `cms_media` (`filename`, `original_name`, `file_path`, `file_size`, `mime_type`, `width`, `height`, `alt_text`, `caption`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $uniqueName,
                $origName,
                $fileUrl,
                $fileArray['size'],
                $mimeType,
                $width,
                $height,
                $altText,
                $caption
            ]);
            $mediaId = $db->lastInsertId();
            log_activity('image_uploaded', 'media', $mediaId, "Uploaded: $uniqueName ($origName)");
        } catch (PDOException $e) {
            error_log("DB Media insert error: " . $e->getMessage());
        }
    }

    return [
        'success'   => true,
        'id'        => $mediaId,
        'filename'  => $uniqueName,
        'url'       => $fileUrl,
        'width'     => $width,
        'height'    => $height,
        'size'      => $fileArray['size'],
        'alt'       => $altText
    ];
}

/**
 * Check where an image is currently in use across the CMS
 */
function check_image_usage($imageUrl) {
    $db = get_db_connection();
    if (!$db) return [];

    $usages = [];

    // Check posts
    try {
        $stmt = $db->prepare("SELECT `id`, `title` FROM `cms_posts` WHERE `featured_image` = ?");
        $stmt->execute([$imageUrl]);
        while ($row = $stmt->fetch()) {
            $usages[] = [
                'type'  => 'Blog / Article',
                'title' => $row['title'],
                'url'   => 'posts.php?action=edit&id=' . $row['id']
            ];
        }
    } catch (PDOException $e) {}

    // Check section images
    try {
        $stmt = $db->prepare("SELECT `id`, `section_name` FROM `cms_sections` WHERE `image_url` = ?");
        $stmt->execute([$imageUrl]);
        while ($row = $stmt->fetch()) {
            $usages[] = [
                'type'  => 'Section Image',
                'title' => $row['section_name'],
                'url'   => 'sections.php'
            ];
        }
    } catch (PDOException $e) {}

    // Check profiles
    try {
        $stmt = $db->prepare("SELECT `id`, `name`, `group_type` FROM `cms_profiles` WHERE `photo_url` = ?");
        $stmt->execute([$imageUrl]);
        while ($row = $stmt->fetch()) {
            $usages[] = [
                'type'  => ucfirst($row['group_type']) . ' Profile',
                'title' => $row['name'],
                'url'   => 'profiles.php?group=' . $row['group_type']
            ];
        }
    } catch (PDOException $e) {}

    return $usages;
}

/**
 * Return JSON response
 */
function json_response($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data);
    exit;
}

