<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

cms_require_post();

$input = cms_get_input_json();
$password = '';

if (isset($input['password']) && is_scalar($input['password'])) {
  $password = (string) $input['password'];
} elseif (isset($_POST['password']) && is_scalar($_POST['password'])) {
  $password = (string) $_POST['password'];
}

if (!hash_equals(cms_get_admin_password(), $password)) {
  cms_json_response([
    'ok' => false,
    'error' => 'invalid_password',
  ], 401);
}

$_SESSION[CMS_ADMIN_FLAG] = true;

cms_json_response([
  'ok' => true,
  'authenticated' => true,
]);
