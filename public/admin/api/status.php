<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

cms_json_response([
  'ok' => true,
  'authenticated' => cms_is_authenticated(),
]);
