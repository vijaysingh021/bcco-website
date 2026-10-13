<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - Database Connection
 * PDO wrapper with prepared statements and secure error handling
 */

if (!defined('BCCO_CMS')) {
    require_once __DIR__ . '/config.php';
}

function get_db_connection() {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("BCCO CMS DB Connection Error: " . $e->getMessage());
        return null;
    }
}

function is_db_connected() {
    $db = get_db_connection();
    return ($db !== null);
}
