'use strict';

console.log("I'm capable of Greatness");

/////////////////////////////////////////////////
// BANKIST APP - Financial Transactions Manager
/////////////////////////////////////////////////

// **User Account Data** - Contains account details, movements, and settings

const account1 = {
  owner: 'Bonny Makaniankhondo',
  transactions: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300], // Deposit (+) & Withdrawals (-)
  interestRate: 1.2, // Annual interest rate in percentage
  pin: 1111, // Security PIN for authentication

  transactionDates: [
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000
    ).toISOString(),
  ],
  currency: 'USD', // Currency type
  locale: 'en-US', // User's locale for formatting
};

const account2 = {
  owner: 'Jessica Davis',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  transactionDates: [
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
    new Date(
      Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString(),
  ],
  currency: 'EUR',
  locale: 'pt-PT', // User's preferred locale
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// UI Elements - Selecting DOM Elements
/////////////////////////////////////////////////

// **Labels - Display Elements**
const labelWelcomeMessage = document.querySelector('.welcome'); // Displays welcome text
const labelCurrentDate = document.querySelector('.date'); // Shows current date
const labelAccountBalance = document.querySelector('.balance__value'); // Displays account balance
const labelTotalDeposits = document.querySelector('.summary__value--in'); // Total money deposited
const labelTotalWithdrawals = document.querySelector('.summary__value--out'); // Total money withdrawn
const labelTotalInterest = document.querySelector('.summary__value--interest'); // Total earned interest
const labelSessionTimer = document.querySelector('.timer'); // Countdown timer for session auto-logout

// **Containers - Sections of the App**
const containerAppMain = document.querySelector('.app'); // Main app container
const containerTransactionHistory = document.querySelector('.movements'); // Transaction list container

// **Buttons - User Actions**
const btnUserLogin = document.querySelector('.login__btn'); // Login button
const btnMoneyTransfer = document.querySelector('.form__btn--transfer'); // Transfer money button
const btnRequestLoan = document.querySelector('.form__btn--loan'); // Request loan button
const btnCloseAccount = document.querySelector('.form__btn--close'); // Close account button
const btnSortTransactions = document.querySelector('.btn--sort'); // Sort transactions button

// **Input Fields - User Input**
const inputUsername = document.querySelector('.login__input--user'); // Username input for login
const inputUserPin = document.querySelector('.login__input--pin'); // PIN input for login
const inputTransferRecipient = document.querySelector('.form__input--to'); // Transfer recipient username
const inputTransferAmount = document.querySelector('.form__input--amount'); // Transfer amount
const inputLoanRequest = document.querySelector('.form__input--loan-amount'); // Loan request amount
const inputCloseAccountUser = document.querySelector('.form__input--user'); // Username input for closing account
const inputCloseAccountPin = document.querySelector('.form__input--pin'); // PIN input for closing account

/////////////////////////////////////////////////
// 1️⃣ Formatting & UI Update Functions
/////////////////////////////////////////////////

// Format dates for transactions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// Format currency based on locale and currency type
const formattedCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Display transaction movements
const printMovements = function (acc, sort = false) {
  containerTransactionHistory.innerHTML = '';

  const movs = sort
    ? acc.transactions.slice().sort((a, b) => a - b)
    : acc.transactions;

  movs.forEach((value, i) => {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.transactionDates[i]);
    const printDate = formatMovementDate(date, acc.locale);
    const formattedMov = formattedCurr(value, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${printDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`;

    containerTransactionHistory.insertAdjacentHTML('afterbegin', html);
  });

  // Apply color coding for deposits & withdrawals
  document.querySelectorAll('.movements__row').forEach(mov => {
    const type = mov.querySelector('.movements__type').textContent;
    mov.style.backgroundColor = type.includes('deposit')
      ? 'lightgreen'
      : 'orange';
  });
};

// Display account balance
const calcPrintBalance = function (acc) {
  acc.balance = acc.transactions.reduce((acc, val) => acc + val, 0);
  labelAccountBalance.textContent = formattedCurr(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

// Display account summary (income, outflow, interest)
const calcPrintSummary = function (acc) {
  const income = acc.transactions
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelTotalDeposits.textContent = formattedCurr(
    income,
    acc.locale,
    acc.currency
  );

  const outgoing = acc.transactions
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelTotalWithdrawals.textContent = formattedCurr(
    outgoing,
    acc.locale,
    acc.currency
  );

  const interest = acc.transactions
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelTotalInterest.textContent = formattedCurr(
    interest,
    acc.locale,
    acc.currency
  );
};

// Update UI with new data
const updateUI = acc => {
  printMovements(acc);
  calcPrintBalance(acc);
  calcPrintSummary(acc);
};

/////////////////////////////////////////////////
// 2️⃣ Core Banking Functions
/////////////////////////////////////////////////

// Generate usernames based on account owner names
const createUsername = accounts => {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsername(accounts);

// Start logout timer
const startLogOutTimer = function () {
  let time = 300; // 5-minute logout timer

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    labelSessionTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerAppMain.style.opacity = 0;
    }
    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

/////////////////////////////////////////////////
// Event Handlers

//*** 1. User Login & UI Setup ***/
let currentAccount, timer;

btnUserLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputUsername.value);

  if (currentAccount?.pin === +inputUserPin.value) {
    // Display UI and welcome message
    labelWelcomeMessage.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerAppMain.style.opacity = 100;

    // Display current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long',
    };
    labelCurrentDate.textContent = new Intl.DateTimeFormat(
      navigator.language,
      options
    ).format(now);

    // Clear input fields
    inputUsername.value = inputUserPin.value = '';
    inputUserPin.blur();

    // Reset previous timer and start a new one
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI with account details
    updateUI(currentAccount);
  }
});

//*** 2. Money Transfer ***/
btnMoneyTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferRecipient.value
  );

  // Clear input fields
  inputTransferAmount.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Update movement data
    currentAccount.transactions.push(-amount);
    receiverAcc.transactions.push(amount);

    // Store transaction date
    currentAccount.transactionDates.push(new Date().toISOString());
    receiverAcc.transactionDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset logout timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//*** 3. Loan Request ***/
btnRequestLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanRequest.value);

  // Loan is granted if at least one deposit is >= 10% of requested amount
  if (
    amount > 0 &&
    currentAccount.transactions.some(mov => mov >= amount * 0.1)
  ) {
    setTimeout(() => {
      // Add movement and store date
      currentAccount.transactions.push(amount);
      currentAccount.transactionDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }

  // Clear input and reset timer
  inputLoanRequest.value = '';
  clearInterval(timer);
  timer = startLogOutTimer();
});

//*** 4. Close Account ***/
btnCloseAccount.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseAccountUser.value === currentAccount.username &&
    +inputCloseAccountPin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Remove account from array
    accounts.splice(index, 1);

    // Hide UI and clear logout timer
    containerAppMain.style.opacity = 0;
    clearInterval(timer);
    labelWelcomeMessage.textContent = 'Log in to get started';
  }

  // Clear input fields
  inputCloseAccountUser.value = inputCloseAccountPin.value = '';
});

//*** 5. Sorting Transactions ***/
let sorted = false;
btnSortTransactions.addEventListener('click', e => {
  e.preventDefault();

  printMovements(currentAccount, !sorted);
  sorted = !sorted;
});
