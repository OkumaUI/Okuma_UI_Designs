/* ════════════════════════════════════════════════════════════════
   Okuma Parts Portal — Auth
   Include via <script src="auth.js"> on every page before components.js
   ════════════════════════════════════════════════════════════════ */
var OKUMA_USERS = [
  { email: 'customer@okuma.com', password: 'customer123', role: 'customer', firstName: 'Jonathan', lastName: 'Hayes' },
  { email: 'dealer@okuma.com',   password: 'dealer123',   role: 'dealer',   firstName: 'Jonathan', lastName: 'Hayes'    }
];

function okunmaLogin(email, password) {
  var e = (email || '').trim().toLowerCase();
  for (var i = 0; i < OKUMA_USERS.length; i++) {
    if (OKUMA_USERS[i].email === e && OKUMA_USERS[i].password === password) {
      var u = OKUMA_USERS[i];
      sessionStorage.setItem('okuma_session', JSON.stringify({
        email: u.email, password: u.password, role: u.role, firstName: u.firstName, lastName: u.lastName
      }));
      return { email: u.email, role: u.role, firstName: u.firstName, lastName: u.lastName };
    }
  }
  return null;
}

function okuma_checkAuth() {
  try {
    var raw = sessionStorage.getItem('okuma_session');
    if (!raw) { window.location.replace('login.html'); return null; }
    var s = JSON.parse(raw);
    for (var i = 0; i < OKUMA_USERS.length; i++) {
      if (OKUMA_USERS[i].email === s.email && OKUMA_USERS[i].password === s.password) {
        return { email: OKUMA_USERS[i].email, role: OKUMA_USERS[i].role, firstName: OKUMA_USERS[i].firstName, lastName: OKUMA_USERS[i].lastName };
      }
    }
    sessionStorage.removeItem('okuma_session');
    window.location.replace('login.html');
    return null;
  } catch (e) {
    sessionStorage.removeItem('okuma_session');
    window.location.replace('login.html');
    return null;
  }
}

function okuma_getUser() {
  try {
    var raw = sessionStorage.getItem('okuma_session');
    if (!raw) return null;
    var s = JSON.parse(raw);
    for (var i = 0; i < OKUMA_USERS.length; i++) {
      if (OKUMA_USERS[i].email === s.email && OKUMA_USERS[i].password === s.password) {
        return { email: OKUMA_USERS[i].email, role: OKUMA_USERS[i].role, firstName: OKUMA_USERS[i].firstName, lastName: OKUMA_USERS[i].lastName };
      }
    }
    return null;
  } catch (e) { return null; }
}

function okuma_logout() {
  sessionStorage.removeItem('okuma_session');
  window.location.replace('login.html');
}
