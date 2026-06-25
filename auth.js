/* ════════════════════════════════════════════════════════════════
   Okuma Parts Portal — Auth guard
   Usage (every protected page, before any other scripts):
     <script src="auth.js"></script>
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SESSION_KEY = 'okuma_user';

  /* Hardcoded credentials — login page only uses these via OkumaAuth.validate() */
  var CREDENTIALS = [
    { email: 'customer@okuma.com', password: 'customer123', role: 'customer' },
    { email: 'dealer@okuma.com',   password: 'dealer123',   role: 'dealer'   }
  ];

  function checkAuth() {
    var raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) { window.location.replace('login.html'); return null; }
    try {
      var user = JSON.parse(raw);
      if (!user || !user.email || !user.role) throw new Error('invalid');
      return user;
    } catch (e) {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.replace('login.html');
      return null;
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.replace('login.html');
  }

  /* Returns matching user object on success, null on failure */
  function validate(email, password) {
    var e = (email || '').trim().toLowerCase();
    var p = password || '';
    for (var i = 0; i < CREDENTIALS.length; i++) {
      if (CREDENTIALS[i].email === e && CREDENTIALS[i].password === p) {
        return { email: CREDENTIALS[i].email, role: CREDENTIALS[i].role };
      }
    }
    return null;
  }

  /* Persist a validated user and redirect to dashboard */
  function login(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    window.location.replace('dashboard.html');
  }

  window.OkumaAuth = { checkAuth: checkAuth, logout: logout, validate: validate, login: login };
})();
