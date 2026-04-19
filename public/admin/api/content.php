<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $payload = cms_get_content_payload();
  cms_json_response([
    'ok' => true,
    'entries' => $payload['entries'],
    'updatedAt' => $payload['updatedAt'],
  ]);
}

cms_require_post();
cms_require_admin();

$input = cms_get_input_json();
$entries = $input['entries'] ?? [];

if (!is_array($entries)) {
  cms_json_response([
    'ok' => false,
    'error' => 'invalid_payload',
  ], 400);
}

$ok = cms_save_content_entries($entries);
if (!$ok) {
  cms_json_response([
    'ok' => false,
    'error' => 'failed_to_save',
  ], 500);
}

$payload = cms_get_content_payload();

cms_json_response([
  'ok' => true,
  'entries' => $payload['entries'],
  'updatedAt' => $payload['updatedAt'],
]);
