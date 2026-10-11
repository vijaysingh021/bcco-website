<?php
/**
 * Bihar Cancer Care Organisation (BCCO) - Contact & Form Submission Handler
 * Compatible with PHP 7.4+ and PHP 8.x on Apache/cPanel shared hosting
 */

// ============================================================================
// CONFIGURATION
// ============================================================================
// Replace with your verified official organization mailbox created in cPanel
$TO_EMAIL = "info@YOURDOMAIN.com";
$SITE_NAME = "Bihar Cancer Care Organisation";

// Set JSON response header
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// ============================================================================
// RATE LIMITING & HONEYPOT
// ============================================================================
// 1. Honeypot check: If the hidden honeypot field is filled, silently ignore / reject bot
$honeypot = isset($_POST['website']) ? trim($_POST['website']) : '';
if (!empty($honeypot)) {
    // Artificial delay to deter bots, then return success response
    sleep(1);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for reaching out.'
    ]);
    exit;
}

// 2. IP-based rate limiting (Max 5 requests per 10 minutes per IP)
$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitKey = md5('bcco_rl_' . $clientIp);
$tempDir = sys_get_temp_dir();
$rateLimitFile = $tempDir . DIRECTORY_SEPARATOR . 'bcco_rl_' . $rateLimitKey . '.json';

$currentTime = time();
$windowSeconds = 600; // 10 minutes
$maxAttempts = 5;

$rateData = ['count' => 0, 'first_seen' => $currentTime];
if (file_exists($rateLimitFile)) {
    $content = @file_get_contents($rateLimitFile);
    if ($content) {
        $parsed = json_decode($content, true);
        if (is_array($parsed) && isset($parsed['first_seen'], $parsed['count'])) {
            if ($currentTime - $parsed['first_seen'] < $windowSeconds) {
                $rateData = $parsed;
            }
        }
    }
}

if ($rateData['count'] >= $maxAttempts) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Too many requests. Please wait a few minutes before trying again or call our helpline.'
    ]);
    exit;
}

$rateData['count']++;
@file_put_contents($rateLimitFile, json_encode($rateData));

// ============================================================================
// SANITIZATION HELPERS
// ============================================================================
function sanitize_text($str, $max_len = 500) {
    $str = strip_tags((string)$str);
    $str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    return mb_substr(trim($str), 0, $max_len);
}

function sanitize_email($email) {
    return filter_var(trim((string)$email), FILTER_SANITIZE_EMAIL);
}

// ============================================================================
// PROCESS FORM TYPES
// ============================================================================
$type = isset($_POST['type']) ? trim($_POST['type']) : 'contact';

if ($type === 'newsletter') {
    $email = sanitize_email($_POST['email'] ?? '');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please provide a valid email address.'
        ]);
        exit;
    }

    $subject = "[$SITE_NAME] Newsletter Subscription";
    $body = "New newsletter subscription received:\n\n"
          . "Email: $email\n"
          . "Date: " . date('Y-m-d H:i:s T') . "\n"
          . "IP Address: $clientIp\n";

    $headers = [
        "From: noreply@" . ($_SERVER['SERVER_NAME'] ?? 'yourdomain.com'),
        "Reply-To: $email",
        "X-Mailer: PHP/" . phpversion(),
        "Content-Type: text/plain; charset=UTF-8"
    ];

    $sent = @mail($TO_EMAIL, $subject, $body, implode("\r\n", $headers));

    echo json_encode([
        'success' => true,
        'message' => "You're on the list. Updates will arrive in your inbox."
    ]);
    exit;
}

// General Contact, Callback, or Careers Form
$name = sanitize_text($_POST['name'] ?? '', 100);
$email = sanitize_email($_POST['email'] ?? '');
$phone = sanitize_text($_POST['phone'] ?? '', 30);
$formSubject = sanitize_text($_POST['subject'] ?? 'Website Inquiry', 150);
$message = sanitize_text($_POST['message'] ?? '', 3000);
$position = sanitize_text($_POST['position'] ?? '', 100);

if (empty($name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter your name.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$subjectPrefix = ($type === 'careers') ? "[$SITE_NAME Careers] " : "[$SITE_NAME Contact] ";
$mailSubject = $subjectPrefix . ($formSubject ?: 'New Submission');

$body = "New inquiry received from $SITE_NAME website:\n\n"
      . "Submission Type: " . ucfirst($type) . "\n"
      . "Name: $name\n"
      . "Email: $email\n"
      . "Phone: " . ($phone ?: 'Not provided') . "\n";

if (!empty($position)) {
    $body .= "Position of Interest: $position\n";
}
if (!empty($formSubject)) {
    $body .= "Subject: $formSubject\n";
}
if (!empty($message)) {
    $body .= "\nMessage:\n$message\n";
}

$body .= "\n---\n"
      . "Date: " . date('Y-m-d H:i:s T') . "\n"
      . "IP: $clientIp\n";

$fromHost = $_SERVER['SERVER_NAME'] ?? 'yourdomain.com';
if (preg_match('/^www\./i', $fromHost)) {
    $fromHost = substr($fromHost, 4);
}
$fromEmail = "noreply@" . $fromHost;

$headers = [
    "From: $SITE_NAME <$fromEmail>",
    "Reply-To: $name <$email>",
    "X-Mailer: PHP/" . phpversion(),
    "Content-Type: text/plain; charset=UTF-8"
];

$mailSent = @mail($TO_EMAIL, $mailSubject, $body, implode("\r\n", $headers));

if ($mailSent) {
    $responseMsg = ($type === 'careers') 
        ? "Thank you — your application has been received."
        : "Thank you — your message has been received. A BCCO team member will respond shortly.";
    echo json_encode(['success' => true, 'message' => $responseMsg]);
} else {
    // Return friendly error while keeping status 500 for fetch handler
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'We were unable to deliver your message at this moment. Please call our helpline or try again shortly.'
    ]);
}
