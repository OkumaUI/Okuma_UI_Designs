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
  console.log("Hello world")
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
          '<span id="customerPickerLabel">Order for: Stock Order (Self)</span>' +
          '<svg class="customer-picker__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 3.5L5 6L7.5 3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        '<div class="customer-picker__menu" id="customerPickerMenu" aria-label="Select customer">' +
          '<div class="cust-stock-item" id="custStockItem" data-customer="" role="option" tabindex="0">Stock Order (Self)</div>' +
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
          <input type="text" id="navSearchInput" placeholder="Search by part number or part name" autocomplete="off" aria-label="Search by part number or part name">
          <button class="nav__search-submit" id="navSearchSubmit" type="button" aria-label="Search">
            <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="2"/><path d="M12 12L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <button class="nav__search-close" id="navSearchClose" aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M14 4L4 14M4 4l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="nav__actions">
          <button class="nav__search-btn" id="navSearchBtn" aria-label="Search" aria-expanded="false" aria-controls="navSearch">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="2"/><path d="M14 14l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <div class="nav__basket">
            <a class="nav__icon-btn" href="quote-basket.html" aria-label="Quote basket, 2 items">
              <svg width="20" height="20" viewBox="0 0 147 136" fill="none" aria-hidden="true"><path d="M103.811 47.1243C101.887 44.8161 100.117 41.9528 98.4298 39.4652L89.114 25.7158L80.016 12.3416C78.9201 10.7037 75.6578 6.52208 75.8443 4.69984C76.1406 1.80505 79.1369 -0.830552 82.2345 0.341003L82.3731 0.394473C84.5273 1.20511 92.5039 14.0902 94.3914 16.789C99.54 24.15 104.545 31.8259 109.628 39.2547C111.314 41.7177 113.228 44.3281 114.514 47C119.828 47.0804 125.143 46.9343 130.471 47.0045C134.221 47.0541 139.379 46.4829 142.721 48.3729C144.352 49.4049 146.018 51.8801 146.121 53.8193C146.519 61.2682 147.298 66.7496 138.208 68.2366C137.5 74.0479 136.514 79.8218 135.254 85.5389C133.863 92.1428 133.113 99.3624 131.945 106.048C131.3 109.739 130.618 113.343 129.848 117.021C128.958 121.048 128.869 125.721 127.178 129.495C126.109 131.88 122.479 134.504 119.87 134.734C115.393 135.129 110.838 135 106.347 135L81.0355 134.993L45.4443 134.991C39.5705 134.989 33.5466 135.079 27.683 134.927C25.9631 134.883 23.3554 134.221 22.0497 133.155C21.1374 132.327 18.3704 129.248 18.1062 128.102C16.7253 122.112 16.0721 115.629 15.017 109.586L10.1529 81.2748C9.3466 76.6683 8.34224 73.1328 7.77153 68.3421C0.320346 66.8704 0.169456 64.0644 0.00791678 57.3385C-0.276646 45.5035 7.1503 46.9988 15.7914 47.009C20.9233 47.0052 26.0554 47.0312 31.187 47.087C39.3931 33.618 49.7685 20.4887 58.1801 7.04589C59.6815 4.64614 61.9918 1.04561 64.6548 0.00206462C66.5303 -0.0289744 67.0756 0.286402 68.6697 1.18971C69.8397 3.03755 70.7382 5.21368 69.443 7.29625C67.9667 9.66994 66.3155 11.9784 64.7491 14.2979L54.517 29.3557L46.9113 40.6329C45.6884 42.4529 43.7302 45.8511 42.2473 47.1572C45.7042 46.9075 49.6922 47.0201 53.2105 47.0219L70.318 47.0154L91.1173 47.0113C95.163 47.0124 99.8017 46.9166 103.811 47.1243ZM26.5909 53.2218C20.0027 53.2782 13.1651 53.1137 6.6249 53.302C6.14278 54.4092 5.97648 60.8484 6.67656 61.7621C9.28202 62.2999 17.2042 62.0865 20.4004 62.0795L43.9674 62.0831L109.675 62.0786C118.394 62.0673 127.118 62.1071 135.837 62.0922C136.829 62.0904 138.381 62.0183 139.316 61.7533C139.903 60.5006 139.725 55.0176 139.592 53.4328C137.298 53.1525 134.576 53.2352 132.236 53.2418L119.313 53.22C119.635 54.3093 119.962 55.2117 119.872 56.3581C119.596 59.8685 116.85 62.8464 113.371 60.4902C111.036 58.9081 109.214 55.7165 107.991 53.2452L37.9952 53.2236C36.6046 55.9775 34.5546 60.079 31.4154 61.0953C28.8346 61.9311 26.8501 59.9294 26.25 57.5714C25.7959 55.7883 26.1564 54.9328 26.5909 53.2218ZM105.647 83.3709C108.2 83.1145 128.519 83.573 129.224 83.0832C130.138 78.4439 131.111 72.7157 132.189 68.179C126.716 68.1319 121.243 68.1224 115.77 68.1509C114.21 68.1552 108.96 68.2696 107.574 68.0542C107.077 68.7087 105.924 81.5537 105.647 83.3709ZM16.6381 83.3327C19.4094 83.1852 22.5529 83.1566 25.331 83.2506C30.0329 83.4099 34.9885 83.0712 39.6598 83.3104L40.027 83.1016C40.3308 81.1139 39.0711 71.0491 39.0718 68.1496L22.3708 68.1387C19.9903 68.1444 16.2105 68.2764 13.9302 68.1419C15.2742 72.9937 15.902 78.3222 16.6381 83.3327ZM46.2761 83.3682C52.8409 82.914 59.7971 83.4711 66.4059 83.2713C67.4687 83.2391 68.6915 83.2409 69.7554 83.2817C70.335 81.3792 69.7522 71.3174 70.0375 68.1747C64.4067 68.1312 58.7757 68.1197 53.1448 68.1405C51.294 68.1419 46.6759 68.2755 45.0454 68.053C45.5119 71.2972 46.264 80.139 46.2761 83.3682ZM75.9827 83.2577C83.7681 83.2592 91.92 83.1374 99.6719 83.3351C99.8382 78.6376 100.32 72.8829 100.863 68.1999C95.3128 68.099 89.7616 68.0782 84.211 68.1371C82.2689 68.1437 77.6799 68.2762 75.8982 68.0759C76.1406 70.1127 76.2088 81.3468 75.9827 83.2577ZM76.1096 129.05C82.154 128.666 89.868 129.37 95.439 128.95C95.5976 128.586 95.6248 128.647 95.5969 128.284C95.9859 122.689 97.0995 116.608 97.3806 111.245C90.9386 111.251 82.2376 111.523 75.9777 111.184C76.1674 117.042 76.0915 123.167 76.1096 129.05ZM125.886 104.616C126.556 100.043 127.387 94.1404 128.289 89.6592C121.463 89.6637 111.89 89.9582 105.287 89.5622C104.56 93.9387 104.551 100.528 104.076 105.112L119.305 105.124C121.346 105.131 123.415 105.19 125.451 105.048C125.596 104.904 125.741 104.76 125.886 104.616ZM76.2491 89.572C75.6345 90.7761 76.3375 102.545 75.9535 105.141C78.3231 105.093 96.8958 105.36 97.8408 105.069C98.2665 100.043 98.6109 94.7047 99.1331 89.7183C92.1099 89.5942 82.9975 89.9635 76.2491 89.572ZM48.3532 105.093C54.9779 105.093 63.5585 104.85 69.9942 105.154C69.6779 101.939 69.8105 93.0379 69.9969 89.6902C62.8976 89.6411 54.0664 89.9492 47.2358 89.5917C46.323 90.9973 48.0913 102.68 48.3532 105.093ZM41.8764 105.088C41.4784 100.393 40.9652 94.3529 40.8213 89.704C33.5795 89.6001 24.6751 89.9413 17.6476 89.5942C18.354 93.4876 20.2825 101.678 20.4887 105.136C27.6028 104.965 34.7545 105.164 41.8764 105.088ZM69.9799 128.951C69.5998 124.548 69.8687 115.842 69.9525 111.239C63.2678 111.248 55.6086 111.433 49.0018 111.171C49.4697 116.846 50.0893 123.449 50.3311 129.088C55.1691 128.819 65.0341 128.763 69.9799 128.951ZM21.5282 111.222C24.6939 133.658 23.2673 128.369 44.3045 128.963C43.8471 124.339 42.6608 115.473 42.6168 111.279C36.0461 111.212 27.9288 111.49 21.5282 111.222ZM103.451 111.192C103.209 116.44 102.741 123.76 102.196 128.984C107.353 128.891 114.136 129.359 119.147 128.593C119.926 128.474 120.785 127.651 121.334 127.09C122.959 124.048 123.583 115.358 124.494 111.288C117.818 111.208 109.964 111.479 103.451 111.192Z" fill="currentColor"/></svg>
            </a>
            <span class="nav__basket-badge" aria-hidden="true">2</span>
          </div>
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
              <a href="${_okuma_user && _okuma_user.role === 'dealer' ? 'dealer-profile.html' : 'profile.html'}" class="user-menu__item" role="menuitem">
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
    { key: 'account', label: 'My Account', href: (_okuma_user && _okuma_user.role === 'dealer') ? 'dealer-profile.html' : 'profile.html',
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

  if (navSearchInput) {
    navSearchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        goSearch(navSearchInput.value);
      } else if (e.key === 'Escape') {
        closeSearchPanel();
        if (navSearchBtn) navSearchBtn.focus();
      }
    });
  }

  var navSearchSubmit = document.getElementById('navSearchSubmit');
  if (navSearchSubmit) {
    navSearchSubmit.addEventListener('click', function () {
      goSearch(navSearchInput ? navSearchInput.value : '');
    });
  }

  function closeSuggest() { /* no-op — autocomplete removed */ }

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
    if (navSearchBtn) navSearchBtn.setAttribute('aria-expanded', 'false');
    if (navSearchInput) navSearchInput.value = '';
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
      'ABC Industries':        ['LU300-M', 'MULTUS U3000', 'LB2000 EX III'],
      'Smith Manufacturing':   ['GENOS L200E', 'SPACE TURN LB3000'],
      'Pacific Precision':     ['MB-56V AII', 'LU300-M', 'MULTUS U3000'],
      'Delta Components':      ['LB2000 EX III', 'GENOS L200E'],
      'Apex Machining':        ['MB-56V AII', 'MULTUS U3000', 'SPACE TURN LB3000'],
      'Borland Systems':       ['LU300-M', 'GENOS L200E'],
      'Century Fabrication':   ['MULTUS U3000'],
      'East Coast Tooling':    ['LB2000 EX III', 'MB-56V AII'],
      'Franklin Engineering':  ['LU300-M'],
      'Global Parts Supply':   ['SPACE TURN LB3000', 'MULTUS U3000'],
      'Harmon Industries':     ['LB2000 EX III'],
      'Industrial Solutions':  ['GENOS L200E', 'LU300-M'],
      'Johnson Metal Works':   ['MB-56V AII'],
      'Keystone Precision':    ['MULTUS U3000', 'SPACE TURN LB3000'],
      'Lakeland Manufacturing':['LU300-M'],
      'Meridian Toolworks':    ['LB2000 EX III', 'GENOS L200E'],
      'Summit Precision':      ['SPACE TURN LB3000'],
      'Tri-State Machining':   ['LU300-M', 'MB-56V AII'],
      'United Fabricators':    ['MULTUS U3000'],
      'Westfield Components':  ['LB2000 EX III', 'SPACE TURN LB3000'],
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
        '.csw-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;padding:16px;}' +
        '.csw-overlay.open{display:flex;}' +
        '.csw-modal{width:100%;max-width:480px;background:#fff;border-radius:2px;box-shadow:0 12px 24px rgba(0,0,0,.25);display:flex;flex-direction:column;margin:auto;}' +
        '.csw-modal__hdr{height:60px;background:#005EB8;border-radius:2px 2px 0 0;display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0;}' +
        '.csw-modal__ttl{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:#fff;margin:0;}' +
        '.csw-modal__cls{background:none;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;}' +
        '.csw-modal__cls:hover{opacity:.8;}' +
        '.csw-modal__bdy{padding:28px 32px 24px;display:flex;flex-direction:column;gap:20px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;color:#4B4B4B;line-height:1.6;}' +
        '.csw-modal__div{height:1px;background:#E0E0E0;}' +
        '.csw-modal__act{display:flex;gap:12px;}' +
        '.csw-btn{flex:1;height:40px;border-radius:2px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s,color .15s;}' +
        '.csw-btn--cancel{background:transparent;border:1px solid #005EB8;color:#005EB8;}' +
        '.csw-btn--cancel:hover{background:#F0F6FF;}' +
        '.csw-btn--confirm{background:#005EB8;border:1px solid #005EB8;color:#fff;}' +
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
        '<div class="csw-modal__hdr">' +
          '<h2 class="csw-modal__ttl" id="machSwitchTitle">Switch Machine?</h2>' +
          '<button class="csw-modal__cls" id="machSwitchClose" aria-label="Close">' +
            '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="csw-modal__bdy">' +
          '<p id="machSwitchBody"></p>' +
          '<div class="csw-modal__div"></div>' +
          '<div class="csw-modal__act">' +
            '<button class="csw-btn csw-btn--cancel" id="machSwitchCancel">Cancel</button>' +
            '<button class="csw-btn csw-btn--confirm" id="machSwitchConfirm">Switch Machine</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(machSwitchEl);
    var machSwitchBody    = machSwitchEl.querySelector('#machSwitchBody');
    var machSwitchCancel  = machSwitchEl.querySelector('#machSwitchCancel');
    var machSwitchConfirm = machSwitchEl.querySelector('#machSwitchConfirm');
    var machSwitchClose   = machSwitchEl.querySelector('#machSwitchClose');
    function showMachSwitchModal(name) {
      machSwitchBody.innerHTML = 'Switching to <strong>' + name + '</strong> will update your active machine context across the portal and will clear your cart. Are you sure you want to switch?';
      machSwitchEl.classList.add('open');
    }
    function hideMachSwitchModal() { machSwitchEl.classList.remove('open'); pendingMach = null; }
    machSwitchClose.addEventListener('click', hideMachSwitchModal);
    machSwitchCancel.addEventListener('click', hideMachSwitchModal);
    machSwitchConfirm.addEventListener('click', function () {
      if (pendingMach) {
        addRecentMachine(pendingMach);
        setActiveMachine(pendingMach);
        window.dispatchEvent(new CustomEvent('okuma:machineChanged', { detail: { name: pendingMach } }));
      }
      hideMachSwitchModal();
      window.location = isMachDealer ? 'dealer-dashboard.html' : 'dashboard.html';
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
      var cm = document.getElementById('machinePickerMenu'); // same as pickerMenu — harmless
      var cpMenu = document.getElementById('custPickerMenu');
      var cpBtn  = document.getElementById('customerPickerBtn');
      var uMenu  = document.getElementById('userMenu');
      var uBtn   = document.getElementById('userMenuBtn');
      if (cpMenu) cpMenu.classList.remove('open');
      if (cpBtn)  cpBtn.setAttribute('aria-expanded', 'false');
      if (uMenu)  uMenu.classList.remove('open');
      if (uBtn)   uBtn.setAttribute('aria-expanded', 'false');
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
      var navCartLinkEl = document.getElementById('navCartLink');
      if (navCartLinkEl && isDealer) {
        navCartLinkEl.href = cust ? 'dealer-cart.html?customer=' + encodeURIComponent(cust) : 'dealer-cart.html';
      }
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
        /* If this page already has its own machine-switch modal, skip ours —
           fire the event directly and let the page handle confirmation. */
        var pageOwnModal = document.getElementById('machSwitchOverlay');
        if (pageOwnModal && pageOwnModal !== machSwitchEl) {
          addRecentMachine(pendingMach);
          setActiveMachine(pendingMach);
          window.dispatchEvent(new CustomEvent('okuma:machineChanged', { detail: { name: pendingMach } }));
          pendingMach = null;
        } else {
          showMachSwitchModal(name);
        }
      });
    }

    document.addEventListener('click', function () { closePicker(); });
    window.addEventListener('scroll', function () { closePicker(); }, { passive: true });
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
        '<div class="csw-modal__hdr">' +
          '<h2 class="csw-modal__ttl" id="custSwitchTitle">Switch Customer?</h2>' +
          '<button class="csw-modal__cls" id="custSwitchClose" aria-label="Close">' +
            '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="csw-modal__bdy">' +
          '<p id="custSwitchBody"></p>' +
          '<div class="csw-modal__div"></div>' +
          '<div class="csw-modal__act">' +
            '<button class="csw-btn csw-btn--cancel" id="custSwitchCancel">Cancel</button>' +
            '<button class="csw-btn csw-btn--confirm" id="custSwitchConfirm">Switch &amp; Clear Cart</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(cswEl);

    var cswBody    = cswEl.querySelector('#custSwitchBody');
    var cswCancel  = cswEl.querySelector('#custSwitchCancel');
    var cswConfirm = cswEl.querySelector('#custSwitchConfirm');
    var cswClose   = cswEl.querySelector('#custSwitchClose');

    function showSwitchModal(toName) {
      var label = toName ? ('<strong>' + toName + '</strong>') : '<strong>Stock Order (Self)</strong>';
      cswBody.innerHTML = 'Switching to ' + label + ' will clear your current cart. Any unsaved items will be lost.';
      cswEl.classList.add('open');
    }
    function hideSwitchModal() { cswEl.classList.remove('open'); pendingCust = null; }
    function commitSwitch(name) {
      addRecent(name);
      setActiveCustomer(name);
      window.dispatchEvent(new CustomEvent('okuma:customerChanged', { detail: { name: name } }));
    }
    cswClose.addEventListener('click', hideSwitchModal);
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
      var mpMenu = document.getElementById('machinePickerMenu');
      var mpBtn  = document.getElementById('machinePickerBtn');
      var uMenu  = document.getElementById('userMenu');
      var uBtn   = document.getElementById('userMenuBtn');
      if (mpMenu) mpMenu.classList.remove('open');
      if (mpBtn)  mpBtn.setAttribute('aria-expanded', 'false');
      if (uMenu)  uMenu.classList.remove('open');
      if (uBtn)   uBtn.setAttribute('aria-expanded', 'false');
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
      custPickerLabel.textContent = name ? 'Order for: ' + name : 'Order for: Stock Order (Self)';
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
    window.addEventListener('scroll', function () { closeCustPicker(); }, { passive: true });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (cswEl.classList.contains('open')) { hideSwitchModal(); return; }
        if (custPickerMenu.classList.contains('open')) { closeCustPicker(); custPickerBtn.focus(); }
      }
    });
  }
})();