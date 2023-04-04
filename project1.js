// slot machine
// 1. Deposit some amount
// 2. Determine number of lines(modes) to bet upon
// 3. Collect a amount
// 4. Spin the slot machine
// 5. Check if user won
// 6. Give/take the amount
// 7. Play again/can no longer play

// function abc (){
//     return xyz;
// }

const prompt = require("prompt-sync")();

const ROWS=3;
const COLS=3;

//symbols and their number

const SYMBOLS_COUNT={   //object allows to map keys with their count
  A:2,
  B:4,
  C:6,
  D:8
}

// SYMBOLS_COUNT["A"]=> 2

const SYMBOLS_VALUES ={
  A:5,
  B:4,
  C:3,
  D:2
}




const deposit = () => {
  //modern way of function definition

  while (true) {
    const depositMoney = prompt("Enter some amount: "); //by default is a string, convert into int
    const numberdepositMoney = parseFloat(depositMoney); //check if its a valid number, if not returns NAN

    if (isNaN(numberdepositMoney) || numberdepositMoney <= 0) {
      console.log("Invalid input , Try Again.");
    } else return numberdepositMoney;
  }
};

// 2.)
const getNumberOfLines =() =>{
    while (true) {
        const lines = prompt("Enter some lines(1-3): "); //by default is a string, convert into int
        const NumberOfLines = parseFloat(lines); //check if its a valid number, if not returns NAN
    
        if (isNaN(NumberOfLines) || (NumberOfLines <= 0 || NumberOfLines >3)) {
          console.log("Invalid input , Try Again.");
        } else return NumberOfLines;
      }
}


const getBet = (balance,lines) =>{
  while (true) {
    const bet = prompt("Enter some betting amount per line: "); //by default is a string, convert into int
    const NumberBet = parseFloat(bet); //check if its a valid number, if not returns NAN

    if (isNaN(NumberBet) || (NumberBet <= 0 || NumberBet > balance /lines )) {
      console.log("Invalid betting amount , Try Again.");
    } else return NumberBet;
  }

}

const spin =() =>{
  const symbols=[];  //can add stuff without actually changing the refernce , hence constant

  for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
    for(let i=0 ;i<count ;i++){
      symbols.push(symbol);    //symbols[A,A,B,B,B,B....]
    }
  }
  //console.log(symbols);

  const reels = [];   //[a,a,a] ====>  a
                                    // a
                                    // a  
  for(let i=0;i<COLS;i++){
    reels.push([]);
    const reelSymbols=[...symbols];  //since we need to chose from symbols array,also need to remove the chosen ones. But can't do that on the original array , so we make a copy that is renewed after every iteration
    for(let j=0;j<ROWS;j++){             
      const randomIndex= Math.floor(Math.random() * reelSymbols.length); //random() produces any loat number between 0-1
      const selectedSymbol= reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex,1);  //remove "1" element from reelsymbols array at randomindex

    }
  }
  return reels;
}

const transpose =(reels) =>{
  const rows=[];
  for(let i=0;i<ROWS;i++){
    rows.push([]);
    for(let j=0;j<COLS;j++){
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printSlot =(rows) =>{
      for(const row of rows){   //row == array , rows = 2d array
          let rowString="";
          for(const [i,symbols] of row.entries() ){
            rowString += symbols;
            if( i!= row.length -1){
              rowString += " | ";
            }
          }
          console.log(rowString);
      }

}

const getWinnings =(rows,bet,lines) => {
    let winnings=0;
    for(let row=0;row<lines;row++){
      const symbols= rows[row];
      let allSame=true;
      
      for(const symbol of symbols){
        if(symbol!= symbols[0]){
          allSame=false;
          break;
        }
      }
      if(allSame){
        winnings += bet* SYMBOLS_VALUES[symbols[0]];
      }
    }
    return winnings;
}

const game =() =>{
  
  let balance = deposit(); //allows me to further change the balance , initial balance=deposited money
  while(true){
      console.log("You Have a Balance of $"+balance);
      const NumberOflines= getNumberOfLines();
      const bet= getBet(balance,NumberOflines );
      
      balance -= bet*NumberOflines;
      
      const reels =spin();
      const rows = transpose(reels);
      printSlot(rows);
      const winnings= getWinnings(rows,bet,NumberOflines);
      
      balance += winnings;
      console.log("YOU WON,$" + winnings.toString());

      if(balance<=0){
        console.log("You ran out of money");
        break;
      }
      const PlayAgain = prompt("Do You Want To Play Again (y/n)?");
      if(PlayAgain != "y")  break;
  }
}

game();
