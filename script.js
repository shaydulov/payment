const user = document.querySelector('h1');
const form = document.querySelector('.login')
const logOut = document.querySelector(".log_out");
const loginInput = document.querySelector(".login_input");
const passwordInput = document.querySelector(".password_input");
const enterBtn = document.querySelector(".enter");
const cardBalance = document.querySelector(".balance");
const cardOwner = document.querySelector(".user");
const cardNumber = document.querySelector(".card_numbers");
const incomePlace = document.querySelector('.in');
const outputsPlace = document.querySelector(".out");
const historyDiv = document.querySelector(".history");
const cardNumbersInput = document.querySelector('.card_numbers_input');
const amountClass = document.getElementById("amount");
const sendBtn = document.querySelector(".send");

//////// Data - Dasturda kerak bo'ladigan ma'lumotlar
// Brinchi account ma'lumoti
const account1 = {
  password: "1111",
  cardNumber: 8600140234565678,
  owner: {
    firstname: "Farrux",
    lastname: "Ermamatov",
  },
  transfers: [
    {
      amount: 200,
      date: "2019-11-18T21:31:17.178Z",
    },
    {
      amount: 455.23,
      date: "2019-12-23T07:42:02.383Z",
    },
    {
      amount: -306.5,
      date: "2020-01-28T09:15:04.904Z",
    },
    {
      amount: 25000,
      date: "2020-04-01T10:17:24.185Z",
    },
    {
      amount: -642.21,
      date: "2020-05-08T14:11:59.604Z",
    },
    {
      amount: -133.9,
      date: "2020-05-27T17:01:17.194Z",
    },
    {
      amount: -79.97,
      date: "2020-07-11T23:36:17.929Z",
    },
    {
      amount: -1300,
      date: "2020-07-12T10:51:36.790Z",
    },
  ],
  currency: "UZS",
  locale: "ru-RU",
};
// Ikkinchi account ma'lumoti
const account2 = {
  password: "2222",
  cardNumber: 8411347213244488,
  owner: {
    firstname: "Sardor",
    lastname: "Abdug'aniyev",
  },
  transfers: [
    {
      amount: 5000,
      date: "2019-11-18T21:31:17.178Z",
    },
    {
      amount: 3400,
      date: "2019-12-23T07:42:02.383Z",
    },
    {
      amount: -150,
      date: "2020-01-28T09:15:04.904Z",
    },
    {
      amount: -790,
      date: "2020-04-01T10:17:24.185Z",
    },
    {
      amount: -642.21,
      date: "2020-05-08T14:11:59.604Z",
    },
    {
      amount: -310,
      date: "2020-05-27T17:01:17.194Z",
    },
    {
      amount: -1000,
      date: "2020-07-11T23:36:17.929Z",
    },
    {
      amount: 8500,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      amount: -30,
      date: "2020-07-12T10:51:36.790Z",
    },
  ],
  currency: "USD",
  locale: "en-EN",
}
// Akkountlarni accounts arrayiga yig'ib oldik
const accounts = [account1, account2];


// functions

const createLogin = function () {
  accounts.forEach((acc) => {
    // Gali kelgan akkountga username qo'shamiz
    acc.username =
      acc.owner.firstname[0].toLowerCase() +
      acc.owner.lastname[0].toLowerCase();
  });
};
createLogin();

function currencyFormatter(amount, locale, currency) {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: currency
  });
};

const calcBalance = (transfers)=>{
  return +transfers.reduce((bal, tr)=> bal+tr.amount, 0).toFixed(2);
};

const maskCreditCard =(cardNumber)=>{
  const str = cardNumber + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

const setCardInfo =(acc)=>{
  cardOwner.textContent = Object.values(acc.owner).join(' ');
  cardNumber.textContent = maskCreditCard(acc.cardNumber);
  const bal = calcBalance(acc.transfers);
  cardBalance.textContent = currencyFormatter(bal, acc.locale, acc.currency)
}

const setSummary =(acc)=>{
  const inCome = acc.transfers.filter(tr=> tr.amount > 0).reduce((bal,tr)=>bal+tr.amount, 0);
  const expense = acc.transfers.filter(tr=> tr.amount < 0).reduce((bal, tr)=> bal+tr.amount, 0);

  incomePlace.textContent = currencyFormatter(inCome, acc.locale, acc.currency);
  outputsPlace.textContent = currencyFormatter(expense, acc.locale, acc.currency);
}

const setTransferHistory =(acc)=>{
  const dateFormat =(date)=> new Date(date).toLocaleString(acc.locale);
  acc.transfers.forEach((tr)=>{
    const hCard = `
      <div class="history_card">
        <div class="card_left">
            <h2 class="to_person">${acc.owner.firstname} ${acc.owner.lastname}</h2>
            <p class="date">${dateFormat(tr.date)}</p>
        </div>
        <h2 id='amount' class = "${tr.amount > 0 ? "in_amount" : "out_amount"}">${tr.amount}</h2>
      </div> 
    `;

    historyDiv.insertAdjacentHTML('afterbegin', hCard);
  });
}

const setAllInfo =(acc)=>{
  setCardInfo(acc);
  setSummary(acc);
  setTransferHistory(acc);
};

let currentUser;

enterBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  acc = accounts.find(acc=> loginInput.value === acc.username);
  if(!acc) return;
  if(acc.password !== passwordInput.value) return;

  currentUser = acc;

  user.textContent = `Xush kelibsiz ${currentUser.owner.firstname} ${currentUser.owner.lastname}`;

  loginInput.value = '';
  passwordInput.value = '';

  form.classList.add('hide');
  logOut.classList.remove('hide');

  setAllInfo(currentUser);
});

// let currentUser;

// enterBtn.addEventListener('click', (e)=>{
//   e.preventDefault();

//   let acc = accounts.find((acc) => loginInput.value == acc.username);

//   currentUser = acc;

//   if (loginInput.value !== currentUser.username) return;

//   if (passwordInput.value !== currentUser.password) return;

//   loginInput.value = "bo'qni ye";
//   passwordInput.value = "bo'qni ye";

//   form.classList.add("hide");

//   logOut.classList.remove("hide");

//   user.textContent = `Salom ${currentUser.owner.firstname} ${currentUser.owner.lastname}`;

//   let sum = 0;
//   let positiveBalance = [];
//   let negativeBalance = [];
//   let amounts = [];
//   let transferDate =[];
//   let amountList = [];

//   for (let i = 0; i < acc.transfers.length; i++) {
//     const amount = acc.transfers[i].amount;
//     const date = acc.transfers[i].date;
//     amountList.push(amount);

//     amounts.push(amount);
//     transferDate.push(date);

//     sum+=amount
//     if(amount<0){
//       negativeBalance.push(amount);
//     }
//     else{
//       positiveBalance.push(amount);
//     }
//   };


//   let positiveSum = positiveBalance.reduce((sum, num)=> sum+num, 0);
//   let negativeSum = negativeBalance.reduce((sum, num) => sum + num, 0);

  
  

//   function displayMovements(movements){
//     movements.forEach(move => {
//       let html = `
        // <div class="history_card">
        //   <div class="card_left">
        //       <h2 class="to_person">${currentUser.owner.firstname} ${currentUser.owner.lastname}</h2>
        //       <div class="data_div">
        //           <p class="data"></p>
        //           <p class="hour">18:50</p>
        //       </div>
        //   </div>
        //   <h2 id='amount'>${move}</h2>
        // </div> 
//       `;

//       historyDiv.insertAdjacentHTML('beforeend', html);
//     });
//   };

//   displayMovements(amounts);
//   // amountClass.classList.add("in_amount");


//   income.textContent = `+${positiveSum} $`
//   outputs.textContent = `${negativeSum} $`

//   cardBalance.textContent = `$ ${sum}`;

//   userName.textContent = `${currentUser.owner.firstname} ${currentUser.owner.lastname}`;

//   cardNumber.textContent = currentUser.cardNumber;

//   sendBtn.addEventListener('click', (e)=>{
//     if(cardNumbersInput.value == account1.cardNumber && account2.cardNumber){
//       console.log(true);
//     }
//     else{
//       console.log(false);
//     }
//   })
// })

// sendBtn.addEventListener("click", (e) => {
//   e.preventDefault();
// });