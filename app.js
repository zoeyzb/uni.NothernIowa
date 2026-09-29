const state = {
  loggedIn: sessionStorage.getItem('studentLoggedIn') === '1'
};

const profile = {
  name: 'Syeda',
  country: 'Pakistan',
  city: 'Multan',
  province: 'Punjab'
};

const courses = [
  ['ACCT 2120-60','Financial Accounting','Online Semester Based'],
  ['ARTHIST 1004-60','History of Art','Online Semester Based'],
  ['EARTHSCI 1200-60','Elements of Weather','Online Semester Based'],
  ['ECON 1041-60','Principles of Economics','Online Semester Based'],
  ['ENGLISH 1005-60','Composition I','Online Semester Based'],
  ['STAT 1772-60','Elementary Statistics','Online Semester Based']
];

const finances = {
  courses: 5800,
  additional: 10800,
  total: 16600,
  dueDate: 'September 22'
};

const extraRows = [
  ['Insurance', 3500],
  ['Books', 1000],
  ['Clubs', 600],
  ['Food', 600],
  ['Emergency Fund', 2100],
  ['Flight', 1500],
  ['Other / Miscellaneous', 1500]
];

const money = n => '$' + n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

function loginPage(){
  return `
    <section class="login-wrap">
      <div class="login-panel">
        <div class="login-logo">Student Center</div>
        <form id="loginForm">
          <label for="username">User ID</label>
          <input id="username" autocomplete="off" placeholder="Enter user ID" />
          <label for="password">Password</label>
          <input id="password" type="password" autocomplete="off" placeholder="Enter password" />
          <div class="hero-actions"><button class="btn btn-primary" type="submit">Login</button></div>
        </form>
      </div>
      <div class="login-info">
        <h1 class="page-title" style="font-size:28px">Welcome to Student Center</h1>
        <p>Access your academic courses, account information, payment overview, and student details.</p>
        <div class="card" style="margin-top:20px">
          <div class="card-title">Student Access</div>
          <div class="card-body">
            <p>Use the navigation after signing in to view your courses, account balance, and personal information.</p>
          </div>
        </div>
      </div>
    </section>`;
}

function studentCenter(){
  const rows = courses.map(c=>`<tr><td><strong>${c[0]}</strong></td><td>${c[1]}</td><td>${c[2]}</td><td><span class="pill">Enrolled</span></td></tr>`).join('');
  return `
    <h1 class="page-title">${profile.name}'s Student Center</h1>
    <div class="grid">
      <div>
        <div class="card">
          <div class="card-title">Academics</div>
          <div class="card-body">
            <table class="table">
              <thead><tr><th>Class</th><th>Class Title</th><th>Instruction Mode</th><th>Status</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
            <div class="quick-links">
              <a href="#/courses">Course List</a>
              <a href="#/payment">Payment Overview</a>
              <a href="#/account">Account Details</a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="alert">
          <div class="alert-main"><div class="alert-icon">!</div><div><strong>Payment Overdue</strong><br><span class="small">Overdue by ${finances.dueDate}.</span></div></div>
          <a href="#/payment" class="btn btn-danger">Pay Now</a>
        </div>
        <div class="card">
          <div class="card-title">Account Summary</div>
          <div class="card-body">
            <div class="summary-row"><span>Courses</span><strong>${money(finances.courses)}</strong></div>
            <div class="summary-row"><span>Additional expenses</span><strong>${money(finances.additional)}</strong></div>
            <div class="summary-row total"><span>Total Amount Due</span><strong>${money(finances.total)}</strong></div>
            <div class="overdue"><span>Overdue by ${finances.dueDate}</span><span>${money(finances.total)}</span></div>
            <div class="hero-actions"><a class="btn btn-primary" href="#/account">View Account Details</a></div>
          </div>
        </div>
      </div>
    </div>`;
}

function coursesPage(){
  const rows = courses.map(c=>`<tr><td><strong>${c[0]}</strong></td><td>${c[1]}</td><td>${c[2]}</td><td><span class="pill">Enrolled</span></td></tr>`).join('');
  return `
    <h1 class="page-title">${profile.name}'s Course List</h1>
    <div class="card">
      <div class="card-title">Current Academic Courses</div>
      <div class="card-body">
        <table class="table">
          <thead><tr><th>Class</th><th>Class Title</th><th>Instruction Mode</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function paymentPage(){
  const rows = extraRows.map(r=>`<tr><td>${r[0]}</td><td><strong>${money(r[1])}</strong></td></tr>`).join('');
  return `
    <h1 class="page-title">Payment Overview</h1>
    <div class="alert">
      <div class="alert-main"><div class="alert-icon">!</div><div><strong>Payment overdue</strong><br><span>Overdue by ${finances.dueDate}.</span></div></div>
      <button class="btn btn-danger" id="payBtn">Pay Now</button>
    </div>
    <div class="grid">
      <div>
        <div class="card">
          <div class="card-title">Account Summary</div>
          <div class="card-body">
            <div class="summary-row"><span>Courses</span><strong>${money(finances.courses)}</strong></div>
            <div class="summary-row"><span>Additional expenses</span><strong>${money(finances.additional)}</strong></div>
            <div class="summary-row total"><span>Total Amount Due</span><strong>${money(finances.total)}</strong></div>
            <div class="overdue"><span>Amount Due (Overdue by ${finances.dueDate})</span><span>${money(finances.total)}</span></div>
          </div>
        </div>
        <div class="card" style="margin-top:16px">
          <div class="card-title">Additional Expenses Breakdown</div>
          <div class="card-body">
            <table class="table"><thead><tr><th>Expense Category</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>
          </div>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="card-title">Important Information</div>
          <div class="card-body">
            <p><strong style="color:var(--danger)">Payment status: overdue</strong></p>
            <div class="summary-row"><span>Due Date</span><strong>${finances.dueDate}</strong></div>
            <div class="summary-row"><span>Total Amount Due</span><strong>${money(finances.total)}</strong></div>
          </div>
        </div>
      </div>
    </div>`;
}

function accountPage(){
  return `
    <h1 class="page-title">${profile.name}'s Account Details</h1>
    <div class="grid">
      <div>
        <div class="card">
          <div class="card-title">Personal Information</div>
          <div class="card-body">
            <div class="info-grid">
              <div class="info-item"><span>Name</span><strong>${profile.name}</strong></div>
              <div class="info-item"><span>Program</span><strong>Undergraduate</strong></div>
              <div class="info-item"><span>Country</span><strong>${profile.country}</strong></div>
              <div class="info-item"><span>City</span><strong>${profile.city}</strong></div>
              <div class="info-item"><span>Province</span><strong>${profile.province}</strong></div>
              <div class="info-item"><span>Academic Standing</span><strong>Good Standing</strong></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="alert">
          <div class="alert-main"><div class="alert-icon">!</div><div><strong>Payment Overdue</strong><br><span class="small">Overdue by ${finances.dueDate}.</span></div></div>
          <a href="#/payment" class="btn btn-danger">Make a Payment</a>
        </div>
        <div class="card">
          <div class="card-title">Account Balance & Status</div>
          <div class="card-body">
            <div class="summary-row"><span>Courses</span><strong>${money(finances.courses)}</strong></div>
            <div class="summary-row"><span>Additional Expenses</span><strong>${money(finances.additional)}</strong></div>
            <div class="summary-row total"><span>Total Amount Due</span><strong>${money(finances.total)}</strong></div>
            <div class="overdue"><span>Overdue by ${finances.dueDate}</span><span>${money(finances.total)}</span></div>
            <div class="progress-wrap">
              <strong>Percent Remaining</strong>
              <div class="progress"><div></div></div>
              <div class="small muted" style="margin-top:6px">100% unpaid — balance remaining: ${money(finances.total)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function render(){
  const app = document.getElementById('app');
  const hash = location.hash || '#/login';
  if(!state.loggedIn && hash !== '#/login'){
    location.hash = '#/login';
    return;
  }
  if(hash === '#/login') app.innerHTML = loginPage();
  else if(hash === '#/student-center') app.innerHTML = studentCenter();
  else if(hash === '#/courses') app.innerHTML = coursesPage();
  else if(hash === '#/payment') app.innerHTML = paymentPage();
  else if(hash === '#/account') app.innerHTML = accountPage();
  else app.innerHTML = studentCenter();

  const form = document.getElementById('loginForm');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const u = document.getElementById('username').value.trim();
      const p = document.getElementById('password').value.trim();
      if(!u || !p){ alert('Enter your user ID and password.'); return; }
      state.loggedIn = true;
      sessionStorage.setItem('studentLoggedIn','1');
      location.hash = '#/student-center';
    });
  }

  const pay = document.getElementById('payBtn');
  if(pay) pay.addEventListener('click', ()=>alert('Payment processing is not available on this site.'));
}

window.addEventListener('hashchange', render);
document.getElementById('signOutBtn').addEventListener('click', ()=>{
  sessionStorage.removeItem('studentLoggedIn');
  state.loggedIn = false;
  location.hash = '#/login';
});
render();