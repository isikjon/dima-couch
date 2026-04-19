<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

cms_require_post();
cms_require_admin();

if (!isset($_FILES['photo']) || !is_array($_FILES['photo'])) {
  cms_json_response([
    'ok' => false,
    'error' => 'file_required',
  ], 400);
}

$file = $_FILES['photo'];
$id = isset($_POST['id']) && is_scalar($_POST['id']) ? (string) $_POST['id'] : 'photo';

if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
  cms_json_response([
    'ok' => false,
    'error' => 'upload_failed',
  ], 400);
}

$tmpPath = $file['tmp_name'] ?? '';
if (!is_string($tmpPath) || $tmpPath === '' || !is_uploaded_file($tmpPath)) {
  cms_json_response([
    'ok' => false,
    'error' => 'invalid_upload',
  ], 400);
}

$size = (int) ($file['size'] ?? 0);
if ($size <= 0 || $size > 8 * 1024 * 1024) {
  cms_json_response([
    'ok' => false,
    'error' => 'invalid_size',
  ], 400);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = $finfo ? finfo_file($finfo, $tmpPath) : null;
if ($finfo) {
  finfo_close($finfo);
}

$allowed = [
  'image/jpeg' => 'jpg',
  'image/png' => 'png',
  'image/webp' => 'webp',
  'image/gif' => 'gif',
  'image/avif' => 'avif',
];

if (!is_string($mime) || !isset($allowed[$mime])) {
  cms_json_response([
    'ok' => false,
    'error' => 'unsupported_type',
  ], 400);
}

$ext = $allowed[$mime];
$basename = cms_safe_file_name($id);
$filename = sprintf('%s-%s-%s.%s', $basename, date('YmdHis'), bin2hex(random_bytes(4)), $ext);

$uploadsDir = cms_uploads_dir();
if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0775, true) && !is_dir($uploadsDir)) {
  cms_json_response([
    'ok' => false,
    'error' => 'mkdir_failed',
  ], 500);
}

$target = $uploadsDir . '/' . $filename;
if (!move_uploaded_file($tmpPath, $target)) {
  cms_json_response([
    'ok' => false,
    'error' => 'move_failed',
  ], 500);
}

$publicPath = '/cms/uploads/' . $filename;

$content = cms_get_content_payload();
$entries = $content['entries'];
$entries['photo:' . $id] = $publicPath;
cms_save_content_entries($entries);

cms_json_response([
  'ok' => true,
  'path' => $publicPath,
]);
