-- ==============================================================================
-- Bihar Cancer Care Organisation (BCCO) - Database Schema
-- Optimized for GoDaddy cPanel MySQL / MariaDB (InnoDB, utf8mb4)
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Administrative Users
CREATE TABLE IF NOT EXISTS `cms_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('super_admin', 'editor') NOT NULL DEFAULT 'super_admin',
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Blog Posts & News Articles
CREATE TABLE IF NOT EXISTS `cms_posts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` ENUM('news', 'media', 'events', 'gallery', 'videos') NOT NULL DEFAULT 'news',
  `badge` VARCHAR(50) DEFAULT 'News',
  `excerpt` TEXT NOT NULL,
  `content` MEDIUMTEXT NOT NULL,
  `featured_image` VARCHAR(255) DEFAULT NULL,
  `author` VARCHAR(100) DEFAULT 'BCCO Team',
  `published_date` DATE NOT NULL,
  `read_time` VARCHAR(30) DEFAULT '3 min read',
  `status` ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` TEXT DEFAULT NULL,
  `video_url` VARCHAR(255) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (`status`, `published_date`),
  INDEX (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Central Media Library
CREATE TABLE IF NOT EXISTS `cms_media` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL UNIQUE,
  `original_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_size` INT UNSIGNED NOT NULL,
  `mime_type` VARCHAR(80) NOT NULL,
  `width` INT UNSIGNED NOT NULL DEFAULT 0,
  `height` INT UNSIGNED NOT NULL DEFAULT 0,
  `alt_text` VARCHAR(255) DEFAULT '',
  `caption` VARCHAR(255) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Website Section Images & Content
CREATE TABLE IF NOT EXISTS `cms_sections` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `section_key` VARCHAR(80) NOT NULL UNIQUE,
  `section_name` VARCHAR(120) NOT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `image_alt` VARCHAR(255) DEFAULT '',
  `caption` VARCHAR(255) DEFAULT '',
  `recommended_size` VARCHAR(60) DEFAULT '',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Profiles (Advisors, Core Committee, Working Team)
CREATE TABLE IF NOT EXISTS `cms_profiles` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `group_type` ENUM('advisory', 'committee', 'team') NOT NULL DEFAULT 'advisory',
  `name` VARCHAR(120) NOT NULL,
  `designation` VARCHAR(180) NOT NULL,
  `bio` TEXT DEFAULT NULL,
  `tag` VARCHAR(80) DEFAULT 'Advisory Member',
  `photo_url` VARCHAR(255) DEFAULT NULL,
  `photo_alt` VARCHAR(255) DEFAULT '',
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` ENUM('active', 'hidden') NOT NULL DEFAULT 'active',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (`group_type`, `status`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Audit & Administrative Activity Log
CREATE TABLE IF NOT EXISTS `cms_activity_log` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NULL,
  `username` VARCHAR(50) NOT NULL,
  `action` VARCHAR(60) NOT NULL,
  `entity_type` VARCHAR(40) NOT NULL,
  `entity_id` INT UNSIGNED NULL,
  `details` TEXT DEFAULT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Global Website Settings
CREATE TABLE IF NOT EXISTS `cms_settings` (
  `setting_key` VARCHAR(80) PRIMARY KEY,
  `setting_value` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- DEFAULT SEED DATA
-- ==============================================================================

-- Seed Section Image Locations (Mapped to existing website slots)
INSERT INTO `cms_sections` (`section_key`, `section_name`, `image_url`, `image_alt`, `caption`, `recommended_size`) VALUES
('hero_care_photo', 'Homepage Hero Main Care Photograph', NULL, 'Bihar Cancer Care Organisation Patient Support and Care', 'Hero visual panel showing compassionate healthcare care in Bihar', '800 x 820 px'),
('about_editorial_photo', 'About Us Section Editorial Photograph', NULL, 'BCCO Community Care and Healthcare Team', 'Editorial photograph showing community awareness sessions', '700 x 820 px'),
('gallery_item_1', 'Past Highlights Gallery 1', NULL, 'Awareness drive in rural Bihar', 'Awareness drive — grassroots community session', '600 x 450 px'),
('gallery_item_2', 'Past Highlights Gallery 2', NULL, 'Community guidance camp', 'Community session — cancer screening & education', '600 x 450 px'),
('gallery_item_3', 'Past Highlights Gallery 3', NULL, 'Volunteer orientation session', 'Volunteer orientation — medical literacy team', '600 x 450 px'),
('gallery_item_4', 'Past Highlights Gallery 4', NULL, 'Outreach health visit', 'Outreach visit — patient family support', '600 x 450 px'),
('gallery_item_5', 'Past Highlights Gallery 5', NULL, 'Health education class in Bihar', 'Health education class for rural women', '600 x 450 px'),
('gallery_item_6', 'Past Highlights Gallery 6', NULL, 'State health campaign moment', 'Campaign moment — prevention & early detection', '600 x 450 px'),
('contact_map_preview', 'Contact Section Office Location Map/Image', NULL, 'BCCO Registered Office in Patna, Bihar', 'Patna Headquarters beside Patel Bhawan', '800 x 450 px')
ON DUPLICATE KEY UPDATE `section_name`=VALUES(`section_name`);

-- Seed Default Blog / Educational Articles
INSERT INTO `cms_posts` (`title`, `slug`, `category`, `badge`, `excerpt`, `content`, `author`, `published_date`, `read_time`, `status`, `sort_order`) VALUES
('Preparing for your first oncology visit: a practical checklist', 'visit', 'news', 'Educational Guide', 'A practical guide turning anxiety into purpose — what to write down, who to bring, and the key questions doctors wish families asked.', '<p>A first appointment with a cancer specialist can feel overwhelming — but a little preparation turns anxiety into purpose. Before the visit, write down everything you want to remember: when symptoms began, what tests you have already had, and every medicine or supplement being taken.</p><p>Bring someone you trust. Two pairs of ears catch more than one, and a companion can take notes while you listen. Ask the doctor to slow down whenever you need — good doctors are grateful for clear questions.</p><p>Questions worth asking: What do we know so far, and what remains uncertain? Which tests are next, and why? What should we watch for at home? Who do we call if something changes?</p><p>Finally, ask for the plan in writing, or write it down yourself before leaving. A visit that ends with everyone understanding the next step is a visit that worked.</p>', 'Medical Guidance Desk', '2026-10-01', '4 min read', 'published', 1),
('Talking about cancer at home: why words matter', 'talk', 'media', 'Special Feature', 'How open, kind conversations dismantle silence and fear, helping families stay united during screening and diagnosis.', '<p>When cancer enters a family, silence often follows. People worry that naming it makes it more real, or that children and elderly parents will break under the weight of the word. In reality, secrecy breeds its own fear.</p><p>You do not need speeches or rehearsed explanations. Simple, honest words are enough: "We are running some tests to understand what is happening," or "The doctor has given us a plan, and here is what the next few weeks look like."</p><p>Give people permission to feel sad, angry or quiet without trying to fix every emotion right away. Steady presence matters far more than having the right answers to impossible questions.</p>', 'Community Support Desk', '2026-08-15', '3 min read', 'published', 2)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- Seed Default Settings
INSERT INTO `cms_settings` (`setting_key`, `setting_value`) VALUES
('site_name', 'Bihar Cancer Care Organisation'),
('helpline_phone_1', '+91 9431893358'),
('helpline_phone_2', '+91 6123573290'),
('official_email', 'bccoofficial01@gmail.com'),
('registered_address', 'Ward No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023, India'),
('max_upload_size_mb', '5')
ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

SET FOREIGN_KEY_CHECKS = 1;

