

let creditLimit = 5000;



const loanOut = function(amount) {
  return new Promise((resolve, reject) => {
    if (creditLimit < amount || creditLimit <= 0) {
      reject(`Insufficient funds!`);
    }  else {
      creditLimit -= amount;
      resolve(amount);
    }
  });

  
};

console.log(`Asking for $150, which should be ok ....`);
loanOut(1500)
  .then((amountReceived) => {
    console.log(`\t-> I got $${amountReceived} loan from the bank! Remaining Credit Limit: $${creditLimit - amountReceived}`);
  })
  .catch((err) => {
    console.log(`\t-> Error: ${err}`);
  });