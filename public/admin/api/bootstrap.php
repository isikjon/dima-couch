<?php

declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
  ]);
}

const CMS_ADMIN_FLAG = 'coachdim_admin_authenticated';
const CMS_DEFAULT_PASSWORD = 'admin123';

function cms_base_path(): string
{
  return dirname(__DIR__, 2);
}

function cms_data_dir(): string
{
  return cms_base_path() . '/cms/data';
}

function cms_uploads_dir(): string
{
  return cms_base_path() . '/cms/uploads';
}

function cms_content_file(): string
{
  return cms_data_dir() . '/content.json';
}

function cms_seo_file(): string
{
  return cms_data_dir() . '/seo.json';
}

function cms_default_seo(): array
{
  return [
    'title' => 'Дима — Коуч нового мышления',
    'description' => 'Коучинг для тех, кто не ищет шаблонных ответов. Трансформация через честный разговор и нестандартное мышление.',
    'keywords' => 'коуч, коучинг, бизнес-коуч, личный коуч, трансформация, мышление',
    'canonical' => '',
    'robots' => 'index, follow',
    'ogTitle' => 'Дима — Коуч нового мышления',
    'ogDescription' => 'Коучинг для тех, кто не ищет шаблонных ответов. Трансформация через честный разговор и нестандартное мышление.',
    'ogImage' => '',
    'ogType' => 'website',
    'twitterCard' => 'summary_large_image',
    'twitterTitle' => 'Дима — Коуч нового мышления',
    'twitterDescription' => 'Коучинг для тех, кто не ищет шаблонных ответов. Трансформация через честный разговор и нестандартное мышление.',
    'twitterImage' => '',
  ];
}

function cms_json_response(array $payload, int $status = 200): void
{
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function cms_read_json_file(string $path, array $fallback): array
{
  if (!is_file($path)) {
    return $fallback;
  }

  $raw = file_get_contents($path);
  if ($raw === false || $raw === '') {
    return $fallback;
  }

  $decoded = json_decode($raw, true);
  if (!is_array($decoded)) {
    return $fallback;
  }

  return $decoded;
}

function cms_write_json_file(string $path, array $data): bool
{
  $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  if ($json === false) {
    return false;
  }

  $dir = dirname($path);
  if (!is_dir($dir) && !mkdir($dir, 0775, true) && !is_dir($dir)) {
    return false;
  }

  return file_put_contents($path, $json . PHP_EOL, LOCK_EX) !== false;
}

function cms_is_authenticated(): bool
{
  return !empty($_SESSION[CMS_ADMIN_FLAG]);
}

function cms_require_admin(): void
{
  if (!cms_is_authenticated()) {
    cms_json_response([
      'ok' => false,
      'error' => 'unauthorized',
    ], 401);
  }
}

function cms_require_post(): void
{
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    cms_json_response([
      'ok' => false,
      'error' => 'method_not_allowed',
    ], 405);
  }
}

function cms_get_input_json(): array
{
  $raw = file_get_contents('php://input');
  if ($raw === false || trim($raw) === '') {
    return [];
  }

  $decoded = json_decode($raw, true);
  if (!is_array($decoded)) {
    return [];
  }

  return $decoded;
}

function cms_get_admin_password(): string
{
  $envPassword = getenv('CMS_ADMIN_PASSWORD');
  if (is_string($envPassword) && $envPassword !== '') {
    return $envPassword;
  }

  return CMS_DEFAULT_PASSWORD;
}

function cms_get_content_payload(): array
{
  $default = [
    'entries' => [],
    'updatedAt' => null,
  ];

  $payload = cms_read_json_file(cms_content_file(), $default);
  $entries = $payload['entries'] ?? [];

  if (!is_array($entries)) {
    $entries = [];
  }

  return [
    'entries' => $entries,
    'updatedAt' => $payload['updatedAt'] ?? null,
  ];
}

function cms_save_content_entries(array $entries): bool
{
  $filtered = [];
  foreach ($entries as $key => $value) {
    if (!is_string($key)) {
      continue;
    }
    if (!is_scalar($value) && $value !== null) {
      continue;
    }
    $filtered[$key] = (string) $value;
  }

  return cms_write_json_file(cms_content_file(), [
    'entries' => $filtered,
    'updatedAt' => gmdate('c'),
  ]);
}

function cms_get_seo_payload(): array
{
  $stored = cms_read_json_file(cms_seo_file(), []);
  return array_merge(cms_default_seo(), $stored);
}

function cms_save_seo_payload(array $seo): bool
{
  $defaults = cms_default_seo();
  $payload = [];

  foreach ($defaults as $key => $defaultValue) {
    $raw = $seo[$key] ?? $defaultValue;
    $payload[$key] = is_scalar($raw) ? trim((string) $raw) : (string) $defaultValue;
  }

  $payload['updatedAt'] = gmdate('c');

  return cms_write_json_file(cms_seo_file(), $payload);
}

function cms_safe_file_name(string $base): string
{
  $normalized = preg_replace('/[^a-zA-Z0-9_-]+/', '-', $base) ?? 'photo';
  $normalized = trim($normalized, '-');
  return $normalized !== '' ? strtolower($normalized) : 'photo';
}
