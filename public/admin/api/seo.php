<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  cms_json_response([
    'ok' => true,
    'seo' => cms_get_seo_payload(),
  ]);
}

cms_require_post();
cms_require_admin();

$input = cms_get_input_json();
$seo = $input['seo'] ?? [];
if (!is_array($seo)) {
  cms_json_response([
    'ok' => false,
    'error' => 'invalid_payload',
  ], 400);
}

$ok = cms_save_seo_payload($seo);
if (!$ok) {
  cms_json_response([
    'ok' => false,
    'error' => 'failed_to_save',
  ], 500);
}

cms_json_response([
  'ok' => true,
  'seo' => cms_get_seo_payload(),
]);
