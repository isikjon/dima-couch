<?php

declare(strict_types=1);

require __DIR__ . '/api/bootstrap.php';

$authenticated = cms_is_authenticated();
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Coachdim Admin</title>
  <style>
    :root {
      --bg: #050505;
      --panel: #0d0d0d;
      --text: #f0ece6;
      --muted: #8a8075;
      --gold: #c9a84c;
      --border: rgba(255,255,255,0.08);
      --ok: #22c55e;
      --danger: #ef4444;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: radial-gradient(circle at 20% 0%, rgba(124,58,237,0.12), transparent 35%),
                  radial-gradient(circle at 100% 100%, rgba(201,168,76,0.10), transparent 45%),
                  var(--bg);
      color: var(--text);
      min-height: 100vh;
    }

    .shell {
      max-width: 1180px;
      margin: 0 auto;
      padding: 24px;
    }

    .card {
      background: rgba(13,13,13,0.9);
      border: 1px solid var(--border);
      border-radius: 20px;
      backdrop-filter: blur(18px);
      box-shadow: 0 20px 70px rgba(0,0,0,0.4);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 14px;
      margin-bottom: 14px;
      position: sticky;
      top: 10px;
      z-index: 5;
    }

    .brand {
      font-size: 15px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--gold);
      font-weight: 600;
    }

    .tabs {
      display: inline-flex;
      gap: 8px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 4px;
    }

    .tab-btn,
    button,
    .btn {
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      cursor: pointer;
      transition: 0.2s ease;
      border-radius: 999px;
      padding: 10px 16px;
      font-size: 13px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .tab-btn.active {
      background: rgba(201,168,76,0.15);
      border-color: rgba(201,168,76,0.45);
      color: var(--gold);
    }

    .btn-primary {
      background: var(--gold);
      color: #050505;
      border-color: var(--gold);
      font-weight: 600;
    }

    .btn-primary:hover {
      background: #d9b85c;
      border-color: #d9b85c;
    }

    .btn-ghost {
      border-color: var(--border);
      color: var(--text);
    }

    .btn-ghost:hover,
    .tab-btn:hover {
      border-color: rgba(201,168,76,0.35);
      color: var(--text);
    }

    .content {
      padding: 16px;
    }

    .pane {
      display: none;
      animation: fadeIn 0.25s ease;
    }

    .pane.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .iframe-wrap {
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
      margin-top: 14px;
      background: #000;
      height: min(72vh, 920px);
    }

    iframe {
      border: 0;
      width: 100%;
      height: 100%;
      background: #000;
    }

    .muted {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.6;
    }

    .login {
      max-width: 440px;
      margin: 10vh auto 0;
      padding: 28px;
    }

    h1, h2 {
      margin: 0;
      font-family: "Cormorant Garamond", Georgia, serif;
      letter-spacing: 0.02em;
      font-weight: 600;
    }

    h1 { font-size: 42px; margin-bottom: 12px; }
    h2 { font-size: 26px; margin-bottom: 12px; }

    form { margin: 0; }

    .field-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .field.full {
      grid-column: 1 / -1;
    }

    label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--muted);
    }

    input,
    textarea {
      width: 100%;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      color: var(--text);
      padding: 12px;
      font-size: 14px;
      outline: none;
      font-family: inherit;
    }

    textarea { min-height: 92px; resize: vertical; }

    input:focus,
    textarea:focus {
      border-color: rgba(201,168,76,0.5);
      box-shadow: 0 0 0 2px rgba(201,168,76,0.15);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 14px;
      flex-wrap: wrap;
    }

    .status {
      font-size: 12px;
      color: var(--muted);
    }

    .status.ok { color: var(--ok); }
    .status.error { color: var(--danger); }

    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
      margin: 16px 0;
    }

    @media (max-width: 900px) {
      .field-grid { grid-template-columns: 1fr; }
      .header { flex-direction: column; align-items: stretch; }
      .tabs { width: 100%; justify-content: center; }
      .header-actions { display: flex; justify-content: center; }
      h1 { font-size: 34px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <?php if (!$authenticated): ?>
      <section class="card login">
        <h1>Admin</h1>
        <p class="muted" style="margin-bottom: 16px;">Введите пароль, чтобы включить режим визуального редактирования контента и SEO.</p>

        <form id="login-form">
          <div class="field full">
            <label for="password">Пароль</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required>
          </div>

          <div class="row" style="margin-top: 18px;">
            <span id="login-status" class="status"></span>
            <button class="btn btn-primary" type="submit">Войти</button>
          </div>
        </form>
      </section>
    <?php else: ?>
      <section class="card header">
        <div class="brand">Coachdim Admin</div>
        <div class="tabs" role="tablist" aria-label="Разделы админки">
          <button class="tab-btn active" data-tab="content" type="button">Контент</button>
          <button class="tab-btn" data-tab="seo" type="button">SEO</button>
        </div>
        <div class="header-actions">
          <button id="logout-btn" type="button" class="btn btn-ghost">Выйти</button>
        </div>
      </section>

      <section class="card content">
        <div id="pane-content" class="pane active">
          <h2>Контент</h2>
          <p class="muted">Редактируйте текст, ссылки и фото прямо в лендинге. Внутри предпросмотра нажмите кнопку <b>Редактировать</b> в правом нижнем углу.</p>
          <div class="row">
            <a class="btn btn-primary" href="/" target="_blank" rel="noopener">Открыть сайт в новой вкладке</a>
            <span class="status">Изменения сохраняются на сервере автоматически.</span>
          </div>
          <div class="iframe-wrap">
            <iframe src="/" title="Редактор контента"></iframe>
          </div>
        </div>

        <div id="pane-seo" class="pane">
          <h2>SEO</h2>
          <p class="muted">Редактируйте мета-данные: title, description, OG, Twitter и canonical. После сохранения настройки применяются на сайте.</p>
          <div class="divider"></div>

          <form id="seo-form">
            <div class="field-grid">
              <div class="field full">
                <label for="title">Title</label>
                <input id="title" name="title" maxlength="160">
              </div>

              <div class="field full">
                <label for="description">Description</label>
                <textarea id="description" name="description"></textarea>
              </div>

              <div class="field full">
                <label for="keywords">Keywords (через запятую)</label>
                <input id="keywords" name="keywords">
              </div>

              <div class="field full">
                <label for="canonical">Canonical URL</label>
                <input id="canonical" name="canonical" placeholder="https://example.com/">
              </div>

              <div class="field">
                <label for="robots">Robots</label>
                <input id="robots" name="robots" placeholder="index, follow">
              </div>

              <div class="field">
                <label for="ogType">OG Type</label>
                <input id="ogType" name="ogType" placeholder="website">
              </div>

              <div class="field full">
                <label for="ogTitle">OG Title</label>
                <input id="ogTitle" name="ogTitle">
              </div>

              <div class="field full">
                <label for="ogDescription">OG Description</label>
                <textarea id="ogDescription" name="ogDescription"></textarea>
              </div>

              <div class="field full">
                <label for="ogImage">OG Image URL</label>
                <input id="ogImage" name="ogImage" placeholder="https://example.com/og.jpg">
              </div>

              <div class="field">
                <label for="twitterCard">Twitter Card</label>
                <input id="twitterCard" name="twitterCard" placeholder="summary_large_image">
              </div>

              <div class="field"></div>

              <div class="field full">
                <label for="twitterTitle">Twitter Title</label>
                <input id="twitterTitle" name="twitterTitle">
              </div>

              <div class="field full">
                <label for="twitterDescription">Twitter Description</label>
                <textarea id="twitterDescription" name="twitterDescription"></textarea>
              </div>

              <div class="field full">
                <label for="twitterImage">Twitter Image URL</label>
                <input id="twitterImage" name="twitterImage" placeholder="https://example.com/twitter.jpg">
              </div>
            </div>

            <div class="row">
              <span id="seo-status" class="status"></span>
              <button type="submit" class="btn btn-primary">Сохранить SEO</button>
            </div>
          </form>
        </div>
      </section>
    <?php endif; ?>
  </div>

  <script>
    const authenticated = <?php echo $authenticated ? 'true' : 'false'; ?>;

    async function requestJson(url, options) {
      const response = await fetch(url, {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        const message = payload.error || 'request_failed';
        throw new Error(message);
      }
      return payload;
    }

    function setStatus(el, text, type = '') {
      if (!el) return;
      el.textContent = text;
      el.className = 'status' + (type ? ' ' + type : '');
    }

    if (!authenticated) {
      const form = document.getElementById('login-form');
      const statusEl = document.getElementById('login-status');

      form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const password = document.getElementById('password')?.value || '';

        setStatus(statusEl, 'Проверяем...');
        try {
          await requestJson('/admin/api/login.php', {
            method: 'POST',
            body: JSON.stringify({ password }),
          });
          setStatus(statusEl, 'Успешный вход', 'ok');
          window.location.reload();
        } catch (error) {
          setStatus(statusEl, 'Неверный пароль', 'error');
        }
      });
    } else {
      const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
      const panes = {
        content: document.getElementById('pane-content'),
        seo: document.getElementById('pane-seo'),
      };

      tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const tab = btn.getAttribute('data-tab');
          tabButtons.forEach((other) => other.classList.remove('active'));
          btn.classList.add('active');

          Object.values(panes).forEach((pane) => pane?.classList.remove('active'));
          panes[tab]?.classList.add('active');
        });
      });

      const logoutBtn = document.getElementById('logout-btn');
      logoutBtn?.addEventListener('click', async () => {
        try {
          await requestJson('/admin/api/logout.php', { method: 'POST', body: '{}' });
          window.location.reload();
        } catch (error) {
          alert('Не удалось выйти из аккаунта');
        }
      });

      const seoForm = document.getElementById('seo-form');
      const seoStatus = document.getElementById('seo-status');
      const seoFields = [
        'title',
        'description',
        'keywords',
        'canonical',
        'robots',
        'ogType',
        'ogTitle',
        'ogDescription',
        'ogImage',
        'twitterCard',
        'twitterTitle',
        'twitterDescription',
        'twitterImage',
      ];

      function readSeoForm() {
        return seoFields.reduce((acc, field) => {
          const input = document.getElementById(field);
          acc[field] = (input?.value || '').trim();
          return acc;
        }, {});
      }

      function writeSeoForm(seo) {
        seoFields.forEach((field) => {
          const input = document.getElementById(field);
          if (input && typeof seo[field] === 'string') {
            input.value = seo[field];
          }
        });
      }

      async function loadSeo() {
        setStatus(seoStatus, 'Загружаем SEO...');
        try {
          const payload = await requestJson('/admin/api/seo.php', { method: 'GET' });
          writeSeoForm(payload.seo || {});
          setStatus(seoStatus, 'Данные загружены', 'ok');
        } catch (error) {
          setStatus(seoStatus, 'Ошибка загрузки SEO', 'error');
        }
      }

      seoForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        setStatus(seoStatus, 'Сохраняем...');

        try {
          await requestJson('/admin/api/seo.php', {
            method: 'POST',
            body: JSON.stringify({ seo: readSeoForm() }),
          });
          setStatus(seoStatus, 'SEO сохранено', 'ok');
        } catch (error) {
          setStatus(seoStatus, 'Ошибка сохранения SEO', 'error');
        }
      });

      loadSeo();
    }
  </script>
</body>
</html>
