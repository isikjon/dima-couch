<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

cms_require_post();

$_SESSION = [];
if (ini_get('session.use_cookies')) {
  $params = session_get_cookie_params();
  setcookie(session_name(), '', time() - 3600, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
}
session_destroy();

cms_json_response([
  'ok' => true,
  'authenticated' => false,
]);
