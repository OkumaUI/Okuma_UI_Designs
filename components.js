/* ════════════════════════════════════════════════════════════════
   Okuma Parts Portal — Shared chrome components
   Injects the app header, sidebar, and auth header/footer into
   placeholder elements, then wires shared behaviors.
   Responsive (mobile drawer nav) + WCAG 2.1 AA (landmarks, ARIA,
   keyboard operation, skip link, focus management).

   Usage in a page:
     App page:   <div id="okuma-header"></div>
                 <div class="app-body-shell">
                   <div id="okuma-sidebar" data-active="dashboard"></div>
                   <main class="main-area"> ...page content... </main>
                 </div>
     Auth page:  <div id="okuma-auth-header"></div> ... <div id="okuma-auth-footer"></div>
     Then:       <script src="components.js"></script>  (before </body>)
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  console.log("Deploy UI designs agent working!")
  /* ---------- MACHINE DATA ---------- */
  var _MACHINE_LIST = [
    { name: 'LU300-M',           model: 'M560-V',    serial: 'M5-2891-K', installDate: 'Mar 15, 2021' },
    { name: 'MULTUS U3000',      model: 'U3000-M',   serial: 'MU-9102-L', installDate: 'Jul 08, 2022' },
    { name: 'LB2000 EX III',     model: 'LB2000-EX', serial: 'LB-4431-M', installDate: 'Nov 22, 2023' },
    { name: 'GENOS L200E',       model: 'L200E',     serial: 'L2-1108-A', installDate: 'Feb 10, 2020' },
    { name: 'SPACE TURN LB3000', model: 'LB3000',    serial: 'LB-8821-X', installDate: 'Sep 03, 2022' },
    { name: 'MB-56V AII',        model: 'MB-56V',    serial: 'MB-2234-P', installDate: 'Apr 19, 2023' },
  ];

  /* ---------- APP HEADER (nav 92px + sub-bar 29px) ---------- */
  var _okuma_user = (typeof okuma_getUser === 'function') ? okuma_getUser() : null;
  function appHeaderHTML() {
    var isDealer = (_okuma_user && _okuma_user.role === 'dealer');
    var _machSearchHTML =
      '<div class="mach-search-wrap">' +
        '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" stroke="#9E9E9E" stroke-width="1.5"/><path d="M11 11l3 3" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/></svg>' +
        '<input id="machSearchInput" type="text" class="mach-search-input" placeholder="Search by model or serial…" autocomplete="off" aria-label="Search machines">' +
      '</div>';
    var _firstMach = _MACHINE_LIST[0];
    var machPickHTML =
      '<div class="machine-picker" id="machinePicker">' +
        '<button class="machine-picker__btn" id="machinePickerBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Change selected machine">' +
          '<span id="machinePickerLabel">Selected Machine : ' + _firstMach.model + ' ' + _firstMach.serial + '</span>' +
          '<svg class="machine-picker__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 3.5L5 6L7.5 3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        '<div class="machine-picker__menu" id="machinePickerMenu" role="listbox" aria-label="Select machine">' +
          _machSearchHTML +
          '<div id="machPickerList"></div>' +
        '</div>' +
      '</div>';
    var custPickHTML =
      '<div class="customer-picker" id="customerPicker">' +
        '<button class="customer-picker__btn" id="customerPickerBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Change customer context">' +
          '<span id="customerPickerLabel">Order for: Stock Order</span>' +
          '<svg class="customer-picker__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 3.5L5 6L7.5 3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        '<div class="customer-picker__menu" id="customerPickerMenu" aria-label="Select customer">' +
          '<div class="cust-stock-item" id="custStockItem" data-customer="" role="option" tabindex="0">Stock Order</div>' +
          '<div class="cust-search-wrap">' +
            '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" stroke="#9E9E9E" stroke-width="1.5"/><path d="M11 11l3 3" stroke="#9E9E9E" stroke-width="1.5" stroke-linecap="round"/></svg>' +
            '<input id="custSearchInput" type="text" class="cust-search-input" placeholder="Search customers…" autocomplete="off" aria-label="Search customers">' +
          '</div>' +
          '<div id="custPickerList" class="cust-picker-list" role="listbox"></div>' +
        '</div>' +
      '</div>';
    var subLeftHTML  = isDealer ? custPickHTML : '<div class="sub-header__left"><span>My Distributor&nbsp;:&nbsp;<b>ABC Industries</b></span></div>';
    var subRightHTML = machPickHTML;
    return `
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="app-header">
      <nav class="nav" aria-label="Primary">
        <div class="nav__left">
          <button class="nav__hamburger" id="navHamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="okumaSidebar" hidden>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <div class="nav__logo">
            <a href="${isDealer ? 'dealer-dashboard.html' : 'dashboard.html'}" aria-label="Okuma — go to dashboard"><img src="images/okuma-logo.png" alt="Okuma – Open Possibilities"></a>
          </div>
        </div>
        <ul class="nav__links" style="display:none">
          <li><a href="#">PRODUCTS</a></li>
          <li><a href="#">TECHNOLOGY</a></li>
          <li><a href="#">SUPPORT</a></li>
          <li><a href="#">INDUSTRIES</a></li>
          <li><a href="#">KNOWLEDGE CENTER</a></li>
          <li><a href="#">WHY OKUMA</a></li>
        </ul>
        <div class="nav__search" id="navSearch" role="search">
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="2"/><path d="M12 12L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="text" id="navSearchInput" placeholder="Search by part number or part name" autocomplete="off" aria-label="Search by part number or part name">
          <button class="nav__search-close" id="navSearchClose" aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M14 4L4 14M4 4l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="nav__actions">
          <button class="nav__search-btn" id="navSearchBtn" aria-label="Search" aria-expanded="false" aria-controls="navSearch">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="2"/><path d="M14 14l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <div class="nav__cart">
            <a class="nav__icon-btn" href="cart.html" aria-label="Cart, 3 items">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M1 1h2.2l2.1 10.4a1.5 1.5 0 0 0 1.5 1.2h7.6a1.5 1.5 0 0 0 1.47-1.2L19 4.5H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="17" r="1.3" fill="currentColor"/><circle cx="16" cy="17" r="1.3" fill="currentColor"/></svg>
            </a>
            <span class="nav__cart-badge" aria-hidden="true">3</span>
          </div>
          <div class="nav__user">
            <button class="nav__user-trigger" id="userMenuBtn" aria-haspopup="true" aria-expanded="false" aria-controls="userMenu">
              <span class="nav__user-name">${_okuma_user ? (_okuma_user.firstName + ' ' + _okuma_user.lastName) : 'Guest'}</span>
              <span class="nav__avatar">${_okuma_user ? ((_okuma_user.firstName || '?')[0] + (_okuma_user.lastName || '')[0]).toUpperCase() : '?'}</span>
            </button>
            <div class="user-menu" id="userMenu" role="menu" aria-label="Account">
              <div class="user-menu__head">
                <div class="user-menu__name">${_okuma_user ? (_okuma_user.firstName + ' ' + _okuma_user.lastName) : 'Guest'}</div>
                <div class="user-menu__org">${_okuma_user ? (_okuma_user.role === 'dealer' ? 'Dealer Account' : 'Customer Account') : ''}</div>
              </div>
              <a href="profile.html" class="user-menu__item" role="menuitem">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="4.5" r="2.5" stroke="#005EB8" stroke-width="1.3"/><path d="M2.5 12c0-2.2 2-3.8 4.5-3.8s4.5 1.6 4.5 3.8" stroke="#005EB8" stroke-width="1.3" stroke-linecap="round"/></svg>
                My Account
              </a>
              <div class="user-menu__sep"></div>
              <a href="#" onclick="if(typeof okuma_logout==='function'){okuma_logout();}else{sessionStorage.removeItem('okuma_session');window.location.replace('login.html');}return false;" class="user-menu__item" role="menuitem">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5.5 12H2.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="#9E9E9E" stroke-width="1.3" stroke-linecap="round"/><path d="M9 9.5L12 7 9 4.5M12 7H5.5" stroke="#9E9E9E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="sub-header">
        ${subLeftHTML}
        ${subRightHTML}
      </div>
    </header>`;
  }

  /* ---------- SIDEBAR (desktop: hover-expand rail; mobile: drawer) ---------- */
  var _dashHref = (_okuma_user && _okuma_user.role === 'dealer') ? 'dealer-dashboard.html' : 'dashboard.html';
  var SIDEBAR_ITEMS = [
    { key: 'dashboard', label: 'Dashboard', href: _dashHref,
      icon: '<rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>' },
    { key: 'parts', label: 'Browse Parts Book', href: 'parts-catalogue.html',
      icon: '<path d="M4 2h11a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="2"/><path d="M7 2v16M10 6h3M10 9h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    { key: 'orders', label: 'My Orders', href: 'my-orders.html',
      icon: '<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/><path d="M10 5.5V10l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    { key: 'quotes', label: 'My Quotes', href: 'my-quotes.html',
      icon: '<path d="M5 2h6l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M11 2v4h4M7 11h6M7 14h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
    { key: 'account', label: 'My Account', href: 'profile.html',
      icon: '<circle cx="10" cy="6.5" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M3 18c0-3.6 3.13-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
  ];

  function sidebarHTML(active) {
    var items = SIDEBAR_ITEMS.map(function (it) {
      var isActive = it.key === active;
      var cls = 'sidebar-item' + (isActive ? ' active' : '');
      return '<a href="' + it.href + '" class="' + cls + '"' + (isActive ? ' aria-current="page"' : '') + '>' +
        '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">' + it.icon + '</svg>' +
        '<span>' + it.label + '</span></a>';
    }).join('');
    return '<nav class="sidebar" id="okumaSidebar" aria-label="Sections">' + items + '</nav>';
  }

  /* ---------- AUTH HEADER + FOOTER ---------- */
  function authHeaderHTML() {
    return '<header class="auth-header"><a href="login.html" aria-label="Okuma home"><img src="images/okuma-logo.png" alt="Okuma – Open Possibilities" class="auth-header__logo"></a></header>';
  }
  function authFooterHTML() {
    return '<footer class="auth-footer">' +

      /* ── Subscribe strip ── */
      '<div class="footer-subscribe">' +
        '<span class="footer-subscribe__text">Subscribe to Okuma updates, tips, news, and more</span>' +
        '<a href="#" class="footer-subscribe__btn">Subscribe Now</a>' +
      '</div>' +

      /* ── Divider ── */
      '<div class="footer-divider"><hr class="footer-divider__line"></div>' +

      /* ── Main body ── */
      '<div class="footer-body">' +

        '<div class="footer-brand">' +
          '<img src="images/okuma-logo.png" alt="Okuma" class="footer-logo">' +
          '<address class="footer-address">' +
            '<strong>OKUMA AMERICA CORPORATION</strong>' +
            '11900 Westhall Drive<br>Charlotte, NC 28278<br><br>P 704.588.7000' +
          '</address>' +
        '</div>' +

        '<nav class="footer-nav" aria-label="Footer navigation">' +

          /* Company */
          '<div class="footer-col">' +
            '<div class="footer-col__heading">Company</div>' +
            '<a href="#">Mission, Vision &amp; Values</a>' +
            '<a href="#">Leadership</a>' +
            '<a href="#">Motorsports</a>' +
            '<a href="#">Okuma App Store</a>' +
            '<a href="#">Community Involvement</a>' +
            '<a href="#">Events</a>' +
            '<a href="#">FAQs</a>' +
            '<a href="#">E-Store</a>' +
            '<a href="#">Contact Okuma</a>' +
          '</div>' +

          /* Resources + Media */
          '<div class="footer-col">' +
            '<div class="footer-col__heading">Resources</div>' +
            '<a href="#">Partners in Technology</a>' +
            '<a href="#">Tech Centers</a>' +
            '<a href="#">Education Partners</a>' +
            '<div class="footer-col__heading footer-col__gap">Media</div>' +
            '<a href="#">Press Releases</a>' +
            '<a href="#">Media Resources</a>' +
          '</div>' +

          /* Standalone links */
          '<div class="footer-col">' +
            '<a href="#" style="font-weight:700;color:#fff;">Okuma Careers</a>' +
            '<a href="#" style="font-weight:700;color:#fff;">Distributor Login</a>' +
          '</div>' +

        '</nav>' +
      '</div>' +

      /* ── Bottom bar ── */
      '<div class="footer-bottom">' +
        '<div class="footer-bottom__left">' +
          '<a href="#" class="footer-bottom__item">Okuma Americas &#9660;</a>' +
          '<span class="footer-bottom__sep"></span>' +
          '<a href="#" class="footer-bottom__item">Privacy Policy</a>' +
          '<span class="footer-bottom__sep"></span>' +
          '<span class="footer-bottom__item footer-bottom__cert">ISO 9001:2015 Certified</span>' +
        '</div>' +
        '<div class="footer-social">' +
          '<a href="#" class="footer-social__btn" style="background:#0A66C2" aria-label="LinkedIn">' +
            '<svg viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5H4.5V24H.5V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.74 2.64 4.74 6.07V24h-4V15.4c0-2.07-.04-4.73-2.88-4.73-2.89 0-3.33 2.26-3.33 4.59V24h-4V8.5z"/></svg>' +
          '</a>' +
          '<a href="#" class="footer-social__btn" style="background:#1877F2" aria-label="Facebook">' +
            '<svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 17 22 12z"/></svg>' +
          '</a>' +
          '<a href="#" class="footer-social__btn" style="background:#000" aria-label="X (Twitter)">' +
            '<svg viewBox="0 0 24 24"><path d="M18.24 2h3.16l-6.9 7.88L22.5 22h-6.36l-4.98-6.51L5.48 22H2.32l7.38-8.43L2 2h6.52l4.5 5.88L18.24 2zm-1.1 18h1.75L6.96 3.76H5.09L17.14 20z"/></svg>' +
          '</a>' +
          '<a href="#" class="footer-social__btn" style="background:#FF0000" aria-label="YouTube">' +
            '<svg viewBox="0 0 24 24"><path d="M21.8 8s-.2-1.4-.8-2c-.77-.8-1.63-.8-2.02-.85C16.18 5 12 5 12 5s-4.18 0-6.98.15c-.4.05-1.25.05-2.02.85-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.77.8 1.78.77 2.23.85C6.8 18.95 12 19 12 19s4.18 0 6.98-.2c.4-.06 1.25-.06 2.02-.86.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.75 14.85V9.14l5.44 2.87-5.44 2.84z"/></svg>' +
          '</a>' +
          '<a href="#" class="footer-social__btn" style="background:#833AB4" aria-label="Instagram">' +
            '<svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32A6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>' +
          '</a>' +
        '</div>' +
      '</div>' +

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

  /* Protect every page that loads components.js (auth.js must be loaded first) */
  if (typeof okuma_checkAuth === 'function') { okuma_checkAuth(); }

  var sb = document.getElementById('okuma-sidebar');
  var hasSidebar = !!sb;
  var sbActive = sb ? (sb.getAttribute('data-active') || '') : '';

  replace('okuma-header', appHeaderHTML());
  if (sb) replace('okuma-sidebar', sidebarHTML(sbActive));
  replace('okuma-auth-header', authHeaderHTML());
  replace('okuma-auth-footer', authFooterHTML());

  /* Ensure the main content region is a labelled skip-link target */
  var main = document.querySelector('main');
  if (main && !main.id) main.id = 'main';
  if (main && !main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');

  /* ---------- behaviors: avatar dropdown (keyboard + ARIA) ---------- */
  var menu = document.getElementById('userMenu');
  var menuBtn = document.getElementById('userMenuBtn');
  if (menu && menuBtn) {
    var openMenu = function () { menu.classList.add('open'); menuBtn.setAttribute('aria-expanded', 'true'); };
    var closeMenu = function () { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); };
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) closeMenu();
      else { openMenu(); var first = menu.querySelector('[role="menuitem"]'); if (first) first.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== menuBtn) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuBtn.focus(); }
    });
  }

  /* ---------- behaviors: header search + auto-suggest ---------- */
  var navSearchInput = document.getElementById('navSearchInput');
  var navSearch      = document.getElementById('navSearch');

  var NAV_CATALOGUE = [
    { id:'MJ-4192-L', desc:'Spindle Bearing Assembly',          machines:['LU300-M', 'LB2000 EX III', 'GENOS L300', 'LB3000 EX II', 'LU15'] },
    { id:'MJ-4193-R', desc:'Spindle Bearing Assembly (Right)',  machines:['LU300-M', 'LB2000 EX III', 'GENOS L300'] },
    { id:'BT-0021-X', desc:'Ball Screw Unit — X Axis',         machines:['MULTUS U3000', 'LU300-M', 'MULTUS B300', 'MULTUS U4000', 'GENOS M460'] },
    { id:'BT-0022-Z', desc:'Ball Screw Unit — Z Axis',         machines:['MULTUS U3000', 'LU300-M', 'MULTUS B300', 'MULTUS U4000'] },
    { id:'CB-1140',   desc:'Control Board PCB Assembly',        machines:['LU300-M', 'MULTUS U3000', 'LB2000 EX III', 'GENOS L300', 'LB3000 EX II', 'GENOS M460', 'MB-46V AII'] },
    { id:'CB-1141',   desc:'Control Board PCB — Servo Drive',   machines:['MULTUS U3000', 'MULTUS B300', 'MULTUS U4000', 'GENOS M460'] },
    { id:'TC-8810',   desc:'Turret Drive Coupling',             machines:['LU300-M', 'LB2000 EX III', 'GENOS L300', 'LB3000 EX II'] },
    { id:'TC-8811',   desc:'Turret Index Gear',                 machines:['LU300-M', 'LB2000 EX III'] },
    { id:'PMP-330',   desc:'Coolant Pump — 330W',               machines:['LB2000 EX III', 'LU300-M', 'GENOS L300', 'LU15'] },
    { id:'PMP-550',   desc:'Coolant Pump — 550W High Flow',     machines:['MULTUS U3000', 'MULTUS B300', 'MULTUS U4000', 'MB-46V AII', 'GENOS M460'] },
    { id:'FLT-201',   desc:'Hydraulic Filter Element',          machines:['LU300-M', 'MULTUS U3000', 'LB2000 EX III', 'GENOS L300', 'MULTUS B300', 'LB3000 EX II'] },
    { id:'FLT-202',   desc:'Air/Oil Separator Filter',          machines:['MULTUS U3000', 'LB2000 EX III', 'MULTUS B300'] },
    { id:'DR-5510',   desc:'Z-Axis Linear Guideway Rail',       machines:['LU300-M', 'MULTUS U3000', 'GENOS M460', 'MB-46V AII'] },
    { id:'DR-5512',   desc:'X-Axis Linear Guideway Rail',       machines:['LU300-M', 'MULTUS U3000', 'GENOS M460', 'MB-46V AII'] },
    { id:'SL-7700',   desc:'Chuck Jaw Set (3-Jaw Soft)',        machines:['LB2000 EX III', 'LU300-M', 'GENOS L300', 'LB3000 EX II', 'LU15'] },
    { id:'SL-7702',   desc:'Chuck Jaw Set (Hard — 8")',         machines:['LB2000 EX III', 'LB3000 EX II', 'GENOS L300'] },
    { id:'SP-0011',   desc:'Spindle Motor — Main',              machines:['LU300-M', 'MULTUS U3000', 'LB2000 EX III', 'GENOS L300', 'MULTUS B300', 'LB3000 EX II', 'LU15'] },
    { id:'SP-0012',   desc:'Spindle Motor — Sub',               machines:['MULTUS U3000', 'MULTUS B300', 'MULTUS U4000'] },
    { id:'ENC-440',   desc:'Rotary Encoder — Spindle Position', machines:['LU300-M', 'LB2000 EX III', 'GENOS L300', 'LB3000 EX II'] },
    { id:'ENC-441',   desc:'Linear Encoder — X Axis Scale',     machines:['MULTUS U3000', 'LU300-M', 'MULTUS B300', 'GENOS M460'] },
    { id:'LB-0090',   desc:'Lubrication Pump Assembly',         machines:['LU300-M', 'MULTUS U3000', 'LB2000 EX III', 'GENOS L300', 'MULTUS B300', 'LB3000 EX II', 'GENOS M460'] },
    { id:'LB-0091',   desc:'Lube Line Distribution Manifold',   machines:['LU300-M', 'LB2000 EX III', 'GENOS L300', 'LB3000 EX II'] },
    { id:'HTR-220',   desc:'Spindle Heat Exchanger Unit',       machines:['MULTUS U3000', 'MULTUS B300', 'MULTUS U4000'] },
    { id:'CLP-110',   desc:'Hydraulic Clamp Cylinder',          machines:['LU300-M', 'LB2000 EX III', 'GENOS L300', 'LB3000 EX II', 'LU15'] },
    { id:'CLP-112',   desc:'Pneumatic Clamp Actuator',          machines:['MULTUS U3000', 'LB2000 EX III', 'MULTUS B300', 'GENOS M460'] },
    { id:'ZX-9981-Q', desc:'Servo Amplifier Module',            machines:['LU300-M', 'MULTUS U3000', 'LB2000 EX III', 'GENOS L300', 'MULTUS B300', 'GENOS M460', 'MB-46V AII'] },
  ];

  function goSearch(q) {
    q = (q || '').trim();
    if (q) window.location = 'search-results.html?q=' + encodeURIComponent(q);
  }

  /* Build and inject the suggestion dropdown once */
  var navSuggest = document.createElement('div');
  navSuggest.id = 'navSuggest';
  navSuggest.style.cssText = [
    'display:none',
    'position:absolute',
    'top:calc(100% + 6px)',
    'left:0',
    'right:0',
    'background:#fff',
    'border:1px solid #D1D5DB',
    'border-radius:6px',
    'box-shadow:0 6px 20px rgba(0,0,0,0.12)',
    'z-index:9999',
    'overflow:hidden',
    'max-height:320px',
    'overflow-y:auto',
  ].join(';');

  /* navSearch needs position:relative so the dropdown anchors to it */
  if (navSearch) {
    navSearch.style.position = 'relative';
    navSearch.appendChild(navSuggest);
  }

  var activeIdx = -1;

  function closeSuggest() {
    navSuggest.style.display = 'none';
    navSuggest.innerHTML = '';
    activeIdx = -1;
  }

  function highlightItem(idx) {
    var items = navSuggest.querySelectorAll('.nav-suggest-item');
    items.forEach(function (el, i) {
      el.style.background = i === idx ? '#F0F5FB' : '';
    });
    activeIdx = idx;
  }

  function renderSuggest(term) {
    if (!term || term.length < 3) { closeSuggest(); return; }
    var lo = term.toLowerCase();
    var hits = NAV_CATALOGUE.filter(function (p) {
      return p.id.toLowerCase().indexOf(lo) !== -1 || p.desc.toLowerCase().indexOf(lo) !== -1;
    }).slice(0, 8);

    if (!hits.length) {
      navSuggest.innerHTML = '<div style="padding:10px 14px;font-size:13px;color:#9E9E9E;">No results for "' + term + '"</div>';
      navSuggest.style.display = 'block';
      activeIdx = -1;
      return;
    }

    navSuggest.innerHTML = hits.map(function (p, i) {
      function hl(str) {
        var idx2 = str.toLowerCase().indexOf(lo);
        if (idx2 === -1) return str;
        return str.slice(0, idx2) + '<strong>' + str.slice(idx2, idx2 + lo.length) + '</strong>' + str.slice(idx2 + lo.length);
      }
      return '<div class="nav-suggest-item" data-q="' + p.id + '" style="' +
        'padding:10px 14px;cursor:pointer;display:flex;flex-direction:column;gap:3px;' +
        (i < hits.length - 1 ? 'border-bottom:1px solid #F5F5F5;' : '') + '">' +
        '<span style="font-size:13px;font-weight:600;color:#2C2A29;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + hl(p.desc) + '</span>' +
        '<span style="display:flex;align-items:center;gap:6px;font-size:11px;color:#757575;">' +
          '<span style="font-family:\'Courier New\',monospace;font-weight:700;color:#005EB8;">' + hl(p.id) + '</span>' +
        '</span>' +
      '</div>';
    }).join('');

    navSuggest.querySelectorAll('.nav-suggest-item').forEach(function (el) {
      el.addEventListener('mousedown', function (e) {
        e.preventDefault(); /* prevent blur firing before click */
        goSearch(el.getAttribute('data-q'));
      });
      el.addEventListener('mouseover', function () {
        var items = navSuggest.querySelectorAll('.nav-suggest-item');
        highlightItem(Array.prototype.indexOf.call(items, el));
      });
    });

    navSuggest.style.display = 'block';
    activeIdx = -1;
  }

  if (navSearchInput) {
    navSearchInput.addEventListener('input', function () {
      renderSuggest(navSearchInput.value.trim());
    });

    navSearchInput.addEventListener('keydown', function (e) {
      var items = navSuggest.querySelectorAll('.nav-suggest-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightItem(Math.min(activeIdx + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightItem(Math.max(activeIdx - 1, 0));
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && items[activeIdx]) {
          goSearch(items[activeIdx].getAttribute('data-q'));
        } else {
          goSearch(navSearchInput.value);
        }
      } else if (e.key === 'Escape') {
        closeSearchPanel();
        if (navSearchBtn) navSearchBtn.focus();
      }
    });

    navSearchInput.addEventListener('blur', function () {
      /* Delay so mousedown on a suggestion fires first */
      setTimeout(closeSuggest, 150);
    });
  }

  /* ---------- behaviors: mobile search panel toggle ---------- */
  var navSearchBtn = document.getElementById('navSearchBtn');
  var navSearchClose = document.getElementById('navSearchClose');

  function openSearchPanel() {
    /* Clear the JS-set inline position so the CSS .open rule's position:absolute takes effect */
    navSearch.style.position = '';
    navSearch.classList.add('open');
    if (navSearchBtn) navSearchBtn.setAttribute('aria-expanded', 'true');
    if (navSearchInput) { navSearchInput.value = ''; navSearchInput.focus(); }
  }

  function closeSearchPanel() {
    navSearch.classList.remove('open');
    /* Restore position:relative so the autocomplete suggestion dropdown anchors correctly */
    navSearch.style.position = 'relative';
    if (navSearchBtn) navSearchBtn.setAttribute('aria-expanded', 'false');
    closeSuggest();
  }

  if (navSearchBtn && navSearch) {
    navSearchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navSearch.classList.contains('open')) closeSearchPanel();
      else openSearchPanel();
    });
  }

  if (navSearchClose && navSearch) {
    navSearchClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeSearchPanel();
      if (navSearchBtn) navSearchBtn.focus();
    });
  }

  /* Close the mobile search panel when clicking outside of it */
  document.addEventListener('click', function (e) {
    if (navSearch && navSearch.classList.contains('open') &&
        !navSearch.contains(e.target) &&
        navSearchBtn && !navSearchBtn.contains(e.target)) {
      closeSearchPanel();
    }
  });

  /* ---------- behaviors: mobile sidebar drawer ---------- */
  var hamburger = document.getElementById('navHamburger');
  var sidebar = document.getElementById('okumaSidebar');
  if (hamburger && sidebar && hasSidebar) {
    hamburger.hidden = false; /* CSS controls actual visibility per breakpoint */
    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    var openDrawer = function () {
      sidebar.classList.add('sidebar--open');
      overlay.classList.add('show');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var firstLink = sidebar.querySelector('a');
      if (firstLink) firstLink.focus();
    };
    var closeDrawer = function () {
      sidebar.classList.remove('sidebar--open');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    hamburger.addEventListener('click', function () {
      if (sidebar.classList.contains('sidebar--open')) closeDrawer();
      else openDrawer();
    });
    overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('sidebar--open')) { closeDrawer(); hamburger.focus(); }
    });
    /* Close the drawer after following a link */
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeDrawer();
    });
  }

  /* ---------- shared customer data (dealer mode, consumed via window.OKUMA_CUSTOMERS) ---------- */
  window.OKUMA_CUSTOMERS = [
    { name: 'ABC Industries',      contact: 'Robert Chen',  city: 'Cincinnati, OH', totalMachines: 4, openOrders: 12, openQuotes: 3 },
    { name: 'Smith Manufacturing', contact: 'Linda Park',   city: 'Detroit, MI',    totalMachines: 2, openOrders: 5,  openQuotes: 1 },
    { name: 'Pacific Precision',   contact: 'David Kim',    city: 'San Jose, CA',   totalMachines: 6, openOrders: 18, openQuotes: 5 },
    { name: 'Delta Components',    contact: 'Maria Garcia', city: 'Dallas, TX',     totalMachines: 3, openOrders: 7,  openQuotes: 2 },
    { name: 'Apex Machining',      contact: 'Tom Wilson',   city: 'Chicago, IL',    totalMachines: 5, openOrders: 9,  openQuotes: 4 },
  ];

  /* ---------- shared machine data (consumed by page scripts via window.OKUMA_MACHINES) ---------- */
  window.OKUMA_MACHINES = _MACHINE_LIST.map(function (m) {
    return { name: m.name, model: m.model, serial: m.serial, installDate: m.installDate, condition: 'Active' };
  });

  /* ---------- behaviors: machine picker (sub-header) ---------- */
  var pickerBtn   = document.getElementById('machinePickerBtn');
  var pickerMenu  = document.getElementById('machinePickerMenu');
  var pickerLabel = document.getElementById('machinePickerLabel');

  if (pickerBtn && pickerMenu && pickerLabel) {
    var savedMachine    = localStorage.getItem('okmDefaultMachine') || 'LU300-M';
    var isMachDealer    = (_okuma_user && _okuma_user.role === 'dealer');
    var machPickerList  = document.getElementById('machPickerList');
    var machSearchInput = document.getElementById('machSearchInput');
    var _allowedMachines = null; /* null = all machines visible */
    var MAX_RECENT_MACH  = 3;

    var CUSTOMER_MACHINES = {
      'ABC Industries':      ['LU300-M', 'MULTUS U3000', 'LB2000 EX III'],
      'Smith Manufacturing': ['GENOS L200E', 'SPACE TURN LB3000'],
      'Pacific Precision':   ['MB-56V AII', 'LU300-M', 'MULTUS U3000'],
      'Delta Components':    ['LB2000 EX III', 'GENOS L200E'],
      'Apex Machining':      ['MB-56V AII', 'MULTUS U3000', 'SPACE TURN LB3000'],
    };

    /* ── recent machines helpers ── */
    function getRecentMachines() {
      try { return JSON.parse(localStorage.getItem('okmRecentMachines') || '[]'); } catch(e) { return []; }
    }
    function addRecentMachine(name) {
      if (!name) return;
      var r = getRecentMachines().filter(function(n) { return n !== name; });
      r.unshift(name);
      localStorage.setItem('okmRecentMachines', JSON.stringify(r.slice(0, MAX_RECENT_MACH)));
    }

    /* ── inject machine picker styles + shared switch-modal styles ── */
    var machStyleEl = document.createElement('style');
    machStyleEl.textContent =
      '.mach-section-label{padding:6px 14px 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#9E9E9E;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;}' +
      '.mach-divider{height:1px;background:#F0F0F0;margin:4px 0;}' +
      '.mach-empty{padding:14px;font-size:13px;color:#9E9E9E;text-align:center;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;}';
    document.head.appendChild(machStyleEl);
    /* inject csw modal styles here so they are available on every page (not just dealer) */
    if (!document.getElementById('okm-csw-styles')) {
      var cswSharedStyle = document.createElement('style');
      cswSharedStyle.id = 'okm-csw-styles';
      cswSharedStyle.textContent =
        '.csw-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;align-items:center;justify-content:center;}' +
        '.csw-overlay.open{display:flex;}' +
        '.csw-modal{background:#fff;border-radius:8px;padding:32px 28px 24px;max-width:420px;width:90%;text-align:center;box-shadow:0 8px 40px rgba(0,0,0,.22);}' +
        '.csw-icon{width:48px;height:48px;border-radius:50%;background:#FFF3E0;color:#E65100;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;line-height:1;}' +
        '.csw-title{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:#1A1A1A;margin:0 0 10px;}' +
        '.csw-body{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;color:#4B4B4B;line-height:1.6;margin:0 0 24px;}' +
        '.csw-actions{display:flex;gap:12px;justify-content:center;}' +
        '.csw-btn{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;padding:10px 22px;border-radius:4px;cursor:pointer;transition:background .15s,color .15s;}' +
        '.csw-btn--cancel{background:transparent;border:1.5px solid #005EB8;color:#005EB8;}' +
        '.csw-btn--cancel:hover{background:#F0F6FC;}' +
        '.csw-btn--confirm{background:#005EB8;border:1.5px solid #005EB8;color:#fff;}' +
        '.csw-btn--confirm:hover{background:#0B308E;}';
      document.head.appendChild(cswSharedStyle);
    }

    /* ── machine switch modal ── */
    var pendingMach  = null;
    var machSwitchEl = document.createElement('div');
    machSwitchEl.className = 'csw-overlay';
    machSwitchEl.id        = 'machSwitchOverlay';
    machSwitchEl.innerHTML =
      '<div class="csw-modal" role="dialog" aria-modal="true" aria-labelledby="machSwitchTitle">' +
        '<div class="csw-icon">!</div>' +
        '<h2 class="csw-title" id="machSwitchTitle">Switch Machine?</h2>' +
        '<p class="csw-body" id="machSwitchBody"></p>' +
        '<div class="csw-actions">' +
          '<button class="csw-btn csw-btn--cancel" id="machSwitchCancel">Cancel</button>' +
          '<button class="csw-btn csw-btn--confirm" id="machSwitchConfirm">Switch Machine</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(machSwitchEl);
    var machSwitchBody    = document.getElementById('machSwitchBody');
    var machSwitchCancel  = document.getElementById('machSwitchCancel');
    var machSwitchConfirm = document.getElementById('machSwitchConfirm');
    function showMachSwitchModal(name) {
      machSwitchBody.innerHTML = 'Switching to <strong>' + name + '</strong> will update your active machine context across the portal and will clear your cart. Are you sure you want to switch?';
      machSwitchEl.classList.add('open');
    }
    function hideMachSwitchModal() { machSwitchEl.classList.remove('open'); pendingMach = null; }
    machSwitchCancel.addEventListener('click', hideMachSwitchModal);
    machSwitchConfirm.addEventListener('click', function () {
      if (pendingMach) {
        addRecentMachine(pendingMach);
        setActiveMachine(pendingMach);
        window.dispatchEvent(new CustomEvent('okuma:machineChanged', { detail: { name: pendingMach } }));
      }
      hideMachSwitchModal();
    });
    machSwitchEl.addEventListener('click', function (e) { if (e.target === machSwitchEl) hideMachSwitchModal(); });

    /* ── render machine list ── */
    function renderMachList(filter) {
      if (!machPickerList) return;
      var q       = (filter || '').trim().toLowerCase();
      var current = localStorage.getItem('okmDefaultMachine') || '';
      var recents = getRecentMachines();
      var allVisible = _MACHINE_LIST.filter(function(m) {
        return !_allowedMachines || _allowedMachines.indexOf(m.name) !== -1;
      });
      function itemHTML(m) {
        return '<div class="machine-picker__item' + (m.name === current ? ' active' : '') +
          '" role="option" data-machine="' + m.name + '" data-serial="' + m.serial + '" data-model="' + m.model + '">' +
          '<span class="machine-picker__item-meta">' + m.model + ' &nbsp;·&nbsp; ' + m.serial + '</span>' +
          '</div>';
      }
      var html = '';
      if (!q) {
        var recentVisible = recents.filter(function(name) {
          return allVisible.some(function(m) { return m.name === name; });
        });
        if (recentVisible.length) {
          html += '<div class="mach-section-label">Recent</div>';
          recentVisible.forEach(function(name) {
            var m = _MACHINE_LIST.filter(function(x) { return x.name === name; })[0];
            if (m) html += itemHTML(m);
          });
          html += '<div class="mach-divider"></div>';
        }
        var rest = allVisible.filter(function(m) { return recentVisible.indexOf(m.name) === -1; });
        if (rest.length) {
          if (recentVisible.length) html += '<div class="mach-section-label">All Machines</div>';
          rest.forEach(function(m) { html += itemHTML(m); });
        }
      } else {
        var matches = allVisible.filter(function(m) {
          return m.name.toLowerCase().indexOf(q) !== -1 ||
                 m.serial.toLowerCase().indexOf(q) !== -1 ||
                 m.model.toLowerCase().indexOf(q) !== -1;
        });
        if (matches.length) {
          matches.forEach(function(m) { html += itemHTML(m); });
        } else {
          html += '<div class="mach-empty">No machines found</div>';
        }
      }
      machPickerList.innerHTML = html;
    }

    function machPickerNeedsCustomer() {
      return isMachDealer && !localStorage.getItem('okmSelectedCustomer');
    }

    function setActiveMachine(name) {
      localStorage.setItem('okmDefaultMachine', name);
      var machData = _MACHINE_LIST.filter(function (m) { return m.name === name; })[0];
      pickerLabel.innerHTML = machData
        ? 'Selected Machine : ' + machData.model + ' ' + machData.serial
        : 'Selected Machine : ' + name;
      renderMachList(machSearchInput ? machSearchInput.value : '');
    }

    function filterMachineItems(customerName) {
      _allowedMachines = customerName ? (CUSTOMER_MACHINES[customerName] || []) : null;
      if (_allowedMachines) {
        var current = localStorage.getItem('okmDefaultMachine') || '';
        if (_allowedMachines.indexOf(current) === -1) {
          setActiveMachine(_allowedMachines[0]);
          return;
        }
      }
      renderMachList(machSearchInput ? machSearchInput.value : '');
    }

    function syncMachinePickerLabel() {
      var picker = document.getElementById('machinePicker');
      if (machPickerNeedsCustomer()) {
        if (picker) picker.style.visibility = 'hidden';
      } else {
        if (picker) picker.style.visibility = '';
        var _curName = localStorage.getItem('okmDefaultMachine') || _MACHINE_LIST[0].name;
        var _curData = _MACHINE_LIST.filter(function (m) { return m.name === _curName; })[0];
        pickerLabel.innerHTML = _curData ? 'Selected Machine : ' + _curData.model + ' ' + _curData.serial : 'Selected Machine : ' + _curName;
        pickerBtn.style.opacity = '';
        pickerBtn.style.cursor  = '';
      }
    }

    function openPicker() {
      if (machSearchInput) machSearchInput.value = '';
      renderMachList('');
      pickerMenu.classList.add('open');
      pickerBtn.setAttribute('aria-expanded', 'true');
      if (machSearchInput) setTimeout(function() { machSearchInput.focus(); }, 60);
    }
    function closePicker() { pickerMenu.classList.remove('open'); pickerBtn.setAttribute('aria-expanded', 'false'); }

    /* ── initialize ── */
    setActiveMachine(savedMachine);
    filterMachineItems(localStorage.getItem('okmSelectedCustomer') || '');
    syncMachinePickerLabel();

    window.addEventListener('okuma:customerChanged', function (e) {
      var cust = e.detail && e.detail.name ? e.detail.name : '';
      filterMachineItems(cust);
      syncMachinePickerLabel();
    });

    pickerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (machPickerNeedsCustomer()) return;
      if (pickerMenu.classList.contains('open')) closePicker(); else openPicker();
    });

    /* Delegated click — show switch-machine modal before committing */
    if (machPickerList) {
      machPickerList.addEventListener('click', function (e) {
        e.stopPropagation();
        var item = e.target.closest('.machine-picker__item');
        if (!item) return;
        var name    = item.getAttribute('data-machine');
        var current = localStorage.getItem('okmDefaultMachine') || '';
        if (name === current) { closePicker(); return; }
        closePicker();
        pendingMach = name;
        showMachSwitchModal(name);
      });
    }

    document.addEventListener('click', function () { closePicker(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (machSwitchEl.classList.contains('open')) { hideMachSwitchModal(); return; }
        if (pickerMenu.classList.contains('open')) { closePicker(); pickerBtn.focus(); }
      }
    });

    /* ── machine search ── */
    if (machSearchInput) {
      machSearchInput.addEventListener('input', function () {
        renderMachList(machSearchInput.value);
      });
      machSearchInput.addEventListener('click', function (e) { e.stopPropagation(); });
      machSearchInput.addEventListener('mousedown', function (e) { e.stopPropagation(); });
    }
  }

  /* ---------- behaviors: customer picker (dealer sub-header) ---------- */
  var custPickerBtn   = document.getElementById('customerPickerBtn');
  var custPickerMenu  = document.getElementById('customerPickerMenu');
  var custPickerLabel = document.getElementById('customerPickerLabel');

  if (custPickerBtn && custPickerMenu && custPickerLabel) {
    var savedCust   = localStorage.getItem('okmSelectedCustomer') || '';
    var pendingCust = null;

    /* ── full customer list ── */
    var ALL_CUSTOMERS = [
      'ABC Industries', 'Apex Machining', 'Borland Systems',
      'Century Fabrication', 'Delta Components', 'East Coast Tooling',
      'Franklin Engineering', 'Global Parts Supply', 'Harmon Industries',
      'Industrial Solutions', 'Johnson Metal Works', 'Keystone Precision',
      'Lakeland Manufacturing', 'Meridian Toolworks', 'Pacific Precision',
      'Smith Manufacturing', 'Summit Precision', 'Tri-State Machining',
      'United Fabricators', 'Westfield Components'
    ].sort();

    var MAX_RECENTS = 3;

    function getRecents() {
      try { return JSON.parse(localStorage.getItem('okmRecentCustomers') || '[]'); } catch(e) { return []; }
    }

    function addRecent(name) {
      if (!name) return;
      var r = getRecents().filter(function(n) { return n !== name; });
      r.unshift(name);
      localStorage.setItem('okmRecentCustomers', JSON.stringify(r.slice(0, MAX_RECENTS)));
    }

    /* ── inject styles ── */
    /* csw modal styles are already injected by the machine picker section; skip if present */
    var cswStyleEl = document.createElement('style');
    cswStyleEl.textContent =
      /* searchable picker */
      '.customer-picker__menu{min-width:260px!important;padding:0!important;}' +
      '.cust-stock-item{padding:9px 14px;font-size:13px;font-weight:600;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#1A1A1A;cursor:pointer;border-bottom:1px solid #F0F0F0;}' +
      '.cust-stock-item:hover,.cust-stock-item.active{background:#F0F6FF;color:#005EB8;}' +
      '.cust-stock-item.active{font-weight:700;}' +
      '.cust-search-wrap{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid #F0F0F0;background:#FAFAFA;}' +
      '.cust-search-input{flex:1;border:none;outline:none;background:transparent;font-size:13px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#1A1A1A;}' +
      '.cust-search-input::placeholder{color:#9E9E9E;}' +
      '.cust-picker-list{max-height:220px;overflow-y:auto;}' +
      '.cust-section-label{padding:6px 14px 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#9E9E9E;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;}' +
      '.cust-divider{height:1px;background:#F0F0F0;margin:4px 0;}' +
      '.cust-item{padding:9px 14px;font-size:13px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#1A1A1A;cursor:pointer;white-space:nowrap;}' +
      '.cust-item:hover{background:#F5F5F5;}' +
      '.cust-item.active{color:#005EB8;font-weight:700;background:#F0F6FF;}' +
      '.cust-empty{padding:14px;font-size:13px;color:#9E9E9E;text-align:center;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;}';
    document.head.appendChild(cswStyleEl);

    /* ── switch-warning modal ── */
    var cswEl = document.createElement('div');
    cswEl.className = 'csw-overlay';
    cswEl.id = 'custSwitchOverlay';
    cswEl.innerHTML =
      '<div class="csw-modal" role="dialog" aria-modal="true" aria-labelledby="custSwitchTitle">' +
        '<div class="csw-icon">!</div>' +
        '<h2 class="csw-title" id="custSwitchTitle">Switch Customer?</h2>' +
        '<p class="csw-body" id="custSwitchBody"></p>' +
        '<div class="csw-actions">' +
          '<button class="csw-btn csw-btn--cancel" id="custSwitchCancel">Cancel</button>' +
          '<button class="csw-btn csw-btn--confirm" id="custSwitchConfirm">Switch & Clear Cart</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(cswEl);

    var cswBody    = document.getElementById('custSwitchBody');
    var cswCancel  = document.getElementById('custSwitchCancel');
    var cswConfirm = document.getElementById('custSwitchConfirm');

    function showSwitchModal(toName) {
      var label = toName ? ('<strong>' + toName + '</strong>') : '<strong>Stock Order</strong>';
      cswBody.innerHTML = 'Switching to ' + label + ' will clear your current cart. Any unsaved items will be lost.';
      cswEl.classList.add('open');
    }
    function hideSwitchModal() { cswEl.classList.remove('open'); pendingCust = null; }
    function commitSwitch(name) {
      addRecent(name);
      setActiveCustomer(name);
      window.dispatchEvent(new CustomEvent('okuma:customerChanged', { detail: { name: name } }));
    }
    cswCancel.addEventListener('click', hideSwitchModal);
    cswConfirm.addEventListener('click', function () { commitSwitch(pendingCust); hideSwitchModal(); window.location = 'dealer-dashboard.html'; });
    cswEl.addEventListener('click', function (e) { if (e.target === cswEl) hideSwitchModal(); });

    /* ── render picker list ── */
    var custPickerList = document.getElementById('custPickerList');
    var custStockItem  = document.getElementById('custStockItem');
    var custSearchInput = document.getElementById('custSearchInput');

    function renderCustList(filter) {
      var q       = (filter || '').trim().toLowerCase();
      var current = localStorage.getItem('okmSelectedCustomer') || '';
      var recents = getRecents();
      var html    = '';

      if (!q) {
        /* Recent section */
        if (recents.length) {
          html += '<div class="cust-section-label">Recent</div>';
          recents.forEach(function(name) {
            html += '<div class="cust-item' + (name === current ? ' active' : '') + '" data-customer="' + name + '" role="option">' + name + '</div>';
          });
          html += '<div class="cust-divider"></div>';
        }
        /* All customers alphabetically (excluding recents) */
        var rest = ALL_CUSTOMERS.filter(function(n) { return recents.indexOf(n) === -1; });
        if (rest.length) {
          html += '<div class="cust-section-label">All Customers</div>';
          rest.forEach(function(name) {
            html += '<div class="cust-item' + (name === current ? ' active' : '') + '" data-customer="' + name + '" role="option">' + name + '</div>';
          });
        }
      } else {
        /* Search results — no section headers, just matches */
        var matches = ALL_CUSTOMERS.filter(function(n) { return n.toLowerCase().indexOf(q) !== -1; });
        if (matches.length) {
          matches.forEach(function(name) {
            html += '<div class="cust-item' + (name === current ? ' active' : '') + '" data-customer="' + name + '" role="option">' + name + '</div>';
          });
        } else {
          html += '<div class="cust-empty">No customers found</div>';
        }
      }
      custPickerList.innerHTML = html;
    }

    /* ── picker open / close ── */
    function openCustPicker() {
      custPickerMenu.classList.add('open');
      custPickerBtn.setAttribute('aria-expanded', 'true');
      custSearchInput.value = '';
      renderCustList('');
      setTimeout(function() { custSearchInput.focus(); }, 60);
    }
    function closeCustPicker() {
      custPickerMenu.classList.remove('open');
      custPickerBtn.setAttribute('aria-expanded', 'false');
    }

    /* ── active customer ── */
    function setActiveCustomer(name) {
      localStorage.setItem('okmSelectedCustomer', name);
      custPickerLabel.textContent = name ? 'Order for: ' + name : 'Order for: Stock Order';
      custStockItem.classList.toggle('active', name === '');
      renderCustList(custSearchInput ? custSearchInput.value : '');
    }

    setActiveCustomer(savedCust);

    /* ── events ── */
    custPickerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (custPickerMenu.classList.contains('open')) closeCustPicker(); else openCustPicker();
    });

    custSearchInput.addEventListener('input', function () { renderCustList(this.value); });
    custSearchInput.addEventListener('click', function (e) { e.stopPropagation(); });

    /* Stock Order item */
    custStockItem.addEventListener('click', function (e) {
      e.stopPropagation();
      var current = localStorage.getItem('okmSelectedCustomer') || '';
      if (current === '') { closeCustPicker(); return; }
      closeCustPicker();
      pendingCust = '';
      showSwitchModal('');
    });

    /* Delegated click on customer list */
    custPickerList.addEventListener('click', function (e) {
      e.stopPropagation();
      var item = e.target.closest('.cust-item');
      if (!item) return;
      var name    = item.getAttribute('data-customer');
      var current = localStorage.getItem('okmSelectedCustomer') || '';
      if (name === current) { closeCustPicker(); return; }
      closeCustPicker();
      pendingCust = name;
      showSwitchModal(name);
    });

    document.addEventListener('click', function () { closeCustPicker(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (cswEl.classList.contains('open')) { hideSwitchModal(); return; }
        if (custPickerMenu.classList.contains('open')) { closeCustPicker(); custPickerBtn.focus(); }
      }
    });
  }
})();
