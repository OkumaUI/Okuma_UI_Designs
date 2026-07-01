/* ════════════════════════════════════════════════════════════════
   Okuma Parts Portal — Shared chrome components
   Injects the app header, sidebar, and auth header/footer into
   placeholder elements, then wires shared behaviors (avatar menu).

   Usage in a page:
     App page:   <div id="okuma-header"></div>
                 <div class="app-body-shell">
                   <div id="okuma-sidebar" data-active="dashboard"></div>
                   <main> ...page content... </main>
                 </div>
     Auth page:  <div id="okuma-auth-header"></div> ... <div id="okuma-auth-footer"></div>
     Then:       <script src="components.js"></script>  (before </body>)
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ---------- APP HEADER (nav 92px + sub-bar 29px) ---------- */
  function appHeaderHTML() {
    return `
    <header class="app-header">
      <nav class="nav">
        <div class="nav__logo">
          <a href="dashboard.html"><img src="okuma-logo.png" alt="Okuma – Open Possibilities"></a>
        </div>
        <ul class="nav__links" style="display:none">
          <li><a href="#">PRODUCTS</a></li>
          <li><a href="#">TECHNOLOGY</a></li>
          <li><a href="#">SUPPORT</a></li>
          <li><a href="#">INDUSTRIES</a></li>
          <li><a href="#">KNOWLEDGE CENTER</a></li>
          <li><a href="#">WHY OKUMA</a></li>
        </ul>
        <div class="nav__search" id="navSearch">
          <svg viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="2"/><path d="M12 12L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="text" id="navSearchInput" placeholder="Search parts, machines, catalogues…" autocomplete="off">
        </div>
        <div class="nav__actions">
          <button class="nav__icon-btn" id="navSearchBtn" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="2"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <div class="nav__cart">
            <button class="nav__icon-btn" aria-label="Cart" onclick="window.location='cart.html'" style="cursor:pointer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 1h2.2l2.1 10.4a1.5 1.5 0 0 0 1.5 1.2h7.6a1.5 1.5 0 0 0 1.47-1.2L19 4.5H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="17" r="1.3" fill="currentColor"/><circle cx="16" cy="17" r="1.3" fill="currentColor"/></svg>
            </button>
            <span class="nav__cart-badge">3</span>
          </div>
          <div class="nav__user">
            <span class="nav__user-name">John Doe</span>
            <div class="nav__avatar"><img src="avatar.png" alt="John Doe"></div>
            <div class="user-menu" id="userMenu">
              <div class="user-menu__head">
                <div class="user-menu__name">John Smith</div>
                <div class="user-menu__org">ACME Precision Manufacturing</div>
              </div>
              <a href="#" class="user-menu__item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="#005EB8" stroke-width="1.3"/><path d="M2.5 12c0-2.2 2-3.8 4.5-3.8s4.5 1.6 4.5 3.8" stroke="#005EB8" stroke-width="1.3" stroke-linecap="round"/></svg>
                My Account
              </a>
              <a href="#" class="user-menu__item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4.5 3.5h7M4.5 7h7M4.5 10.5h7" stroke="#005EB8" stroke-width="1.3" stroke-linecap="round"/><circle cx="2" cy="3.5" r="0.7" fill="#005EB8"/><circle cx="2" cy="7" r="0.7" fill="#005EB8"/><circle cx="2" cy="10.5" r="0.7" fill="#005EB8"/></svg>
                Order History
              </a>
              <a href="#" class="user-menu__item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 1.5h4.5L11 4.5v8a0.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5z" stroke="#005EB8" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 1.5V4.5h3" stroke="#005EB8" stroke-width="1.3" stroke-linejoin="round"/></svg>
                My Quotes
              </a>
              <div class="user-menu__sep"></div>
              <a href="login.html" class="user-menu__item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 12H2.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="#9E9E9E" stroke-width="1.3" stroke-linecap="round"/><path d="M9 9.5L12 7 9 4.5M12 7H5.5" stroke="#9E9E9E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="sub-header">
        <div class="sub-header__left">
          <span>Default Machine : LU300-M</span>
          <svg class="sub-header__chevron" viewBox="0 0 10 10" fill="none"><path d="M2.5 3.5L5 6L7.5 3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="sub-header__right">
          <span>My Distributor :&nbsp;<b>ABC Industries</b></span>
        </div>
      </div>
    </header>`;
  }

  /* ---------- SIDEBAR (collapsible, hover to expand) ---------- */
  var SIDEBAR_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', href: 'dashboard.html',
      icon: '<rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>' },
    { key: 'parts', label: 'Browse Parts Book', href: 'parts-book.html',
      icon: '<path d="M4 2h11a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="2"/><path d="M7 2v16M10 6h3M10 9h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    { key: 'orders', label: 'My Orders', href: '#',
      icon: '<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/><path d="M10 5.5V10l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    { key: 'quotes', label: 'My Quotes', href: '#',
      icon: '<path d="M5 2h6l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M11 2v4h4M7 11h6M7 14h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    { key: 'account', label: 'My Account', href: '#',
      icon: '<circle cx="10" cy="6.5" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M3 18c0-3.6 3.13-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    { key: 'request', label: 'Request a Quote', href: '#',
      icon: '<rect x="3" y="2" width="14" height="16" rx="1" stroke="currentColor" stroke-width="2"/><path d="M7 6h6M7 9h6M7 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' }
  ];

  function sidebarHTML(active) {
    var items = SIDEBAR_ITEMS.map(function (it) {
      var cls = 'sidebar-item' + (it.key === active ? ' active' : '');
      return '<a href="' + it.href + '" class="' + cls + '">' +
        '<svg viewBox="0 0 20 20" fill="none">' + it.icon + '</svg>' +
        '<span>' + it.label + '</span></a>';
    }).join('');
    return '<aside class="sidebar">' + items + '</aside>';
  }

  /* ---------- AUTH HEADER + FOOTER ---------- */
  function authHeaderHTML() {
    return '<header class="auth-header"><img src="okuma-logo.png" alt="Okuma – Open Possibilities" class="auth-header__logo"></header>';
  }
  function authFooterHTML() {
    return '<footer class="auth-footer">' +
      '<div class="auth-footer__logo-row">' +
        '<img src="okuma-logo.png" alt="Okuma" class="auth-footer__logo">' +
        '<nav class="auth-footer__nav">' +
          '<a href="#">Privacy Policy</a><a href="#">Contact Okuma</a><a href="#">Find a Distributor</a>' +
        '</nav>' +
      '</div>' +
      '<p class="auth-footer__copyright">&copy; 2024 Okuma America Corporation. All rights reserved. Open Possibilities is a trademark of Okuma.</p>' +
    '</footer>';
  }

  /* ---------- mount: replace placeholders with rendered chrome ---------- */
  function replace(id, html) {
    var el = document.getElementById(id);
    if (!el) return false;
    el.insertAdjacentHTML('beforebegin', html);
    el.parentNode.removeChild(el);
    return true;
  }

  var sb = document.getElementById('okuma-sidebar');
  var sbActive = sb ? (sb.getAttribute('data-active') || '') : '';

  replace('okuma-header', appHeaderHTML());
  if (sb) replace('okuma-sidebar', sidebarHTML(sbActive));
  replace('okuma-auth-header', authHeaderHTML());
  replace('okuma-auth-footer', authFooterHTML());

  /* ---------- behaviors: avatar dropdown ---------- */
  var menu = document.getElementById('userMenu');
  if (menu) {
    var trigger = menu.parentElement; /* .nav__user */
    trigger.style.cursor = 'pointer';
    trigger.addEventListener('click', function (e) {
      if (menu.contains(e.target)) return;
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!trigger.contains(e.target)) menu.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') menu.classList.remove('open');
    });
  }

  /* ---------- behaviors: header search ---------- */
  var searchBtn = document.getElementById('navSearchBtn');
  var navSearch = document.getElementById('navSearch');
  var navSearchInput = document.getElementById('navSearchInput');
  function goSearch(q) {
    q = (q || '').trim();
    if (q) window.location = 'search-results.html?q=' + encodeURIComponent(q);
  }
  if (searchBtn && navSearch) {
    searchBtn.style.cursor = 'pointer';
    searchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = navSearch.classList.toggle('open');
      if (open && navSearchInput) { navSearchInput.focus(); }
      else if (!open && navSearchInput && navSearchInput.value.trim()) { goSearch(navSearchInput.value); }
    });
  }
  if (navSearchInput) {
    navSearchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { goSearch(navSearchInput.value); }
      else if (e.key === 'Escape') { navSearch.classList.remove('open'); }
    });
  }
})();
