<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - CMS Configuration
 * Optimized for GoDaddy cPanel Linux Shared Hosting
 */

// Prevent direct access
if (!defined('BCCO_CMS')) {
    define('BCCO_CMS', true);
}

// Environment settings
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Database Credentials (Update with your cPanel MySQL details)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'bcco_cms');
define('DB_USER', getenv('DB_USER') ?: 'bcco_user');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

// CMS Paths
define('CMS_PATH', dirname(__DIR__));
define('ROOT_PATH', dirname(CMS_PATH));
define('UPLOAD_DIR', ROOT_PATH . DIRECTORY_SEPARATOR . 'uploads');
define('UPLOAD_URL', '../uploads/');

// Upload constraints
define('MAX_UPLOAD_BYTES', 5 * 1024 * 1024); // 5 MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'webp']);
define('ALLOWED_MIME_TYPES', [
    'image/jpeg',
    'image/png',
    'image/webp'
]);

// Security settings
define('SESSION_LIFETIME', 86400); // 24 hours
define('MAX_LOGIN_ATTEMPTS', 10);
define('LOGIN_LOCKOUT_MINUTES', 15);

// Check if a local override configuration file exists
if (file_exists(CMS_PATH . '/includes/config.local.php')) {
    include_once CMS_PATH . '/includes/config.local.php';
}

