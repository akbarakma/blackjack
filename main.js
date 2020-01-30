var dealerHand = [];
var yourHand = [];
var cards = [];
var money = 100000;

// AS AS
// masih ada undefined
function convertToRupiah(angka){
	var rupiah = '';		
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}

function addMoney(){
    var uang = convertToRupiah(money);
    document.getElementById('your-money').innerHTML = uang;
}

addMoney();
var tempMoney = 0;
function placeBet(num){
    if((money - num) < 0){
        document.getElementById('bet-overload').innerHTML = 'Not enough money';
    }
    else{
        document.getElementById('bet-overload').innerHTML = '';
        tempMoney += num;
        money -= num
        document.getElementById('your-bet').innerHTML = tempMoney;
        var uang = convertToRupiah(money);
        document.getElementById('your-money').innerHTML = uang;
    }
}

function resetBet(){
    money += tempMoney;
    tempMoney = 0;
    document.getElementById('your-bet').innerHTML = tempMoney;
    var uang = convertToRupiah(money);
    document.getElementById('your-money').innerHTML = uang;
    document.getElementById('bet-overload').innerHTML = '';
}

function addCard(){
    cards.push(11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10);
}

function startGame(){
    if(tempMoney === 0){
        document.getElementById('bet-overload').innerHTML = 'You have to place your bet';
    }
    else{
        document.getElementById('hand').style.display = "block";
        document.getElementById('bet').style.display = "none";
        document.getElementById('hit-me').style.display = "block";
        document.getElementById('stay').style.display = "block";
        document.getElementById('start').style.display = "none";
        addCard();
        var dealer = Math.random()*cards.length;
        var indexDealer = Math.round(dealer);
        dealerHand.push(cards[indexDealer]);
        cards.splice(indexDealer , 1);
        var your1 = Math.random()*cards.length;
        var indexYour1 = Math.round(your1);
        yourHand.push(cards[indexYour1]);
        cards.splice(indexYour1 , 1);
        var your2 = Math.random()*cards.length;
        var indexYour2 = Math.round(your2);
        yourHand.push(cards[indexYour2]);
        cards.splice(indexYour2 , 1);
        countHand();
    }
}



var dealerScore = 0;
var yourScore = 0;
function countHand(){
    dealerScore = 0;
    for(var i = 0 ; i < dealerHand.length ; i++){
        dealerScore += dealerHand[i];
    }
    document.getElementById('dealer-hand').innerHTML = dealerScore;

    var dealerCardInHand = '';
    for(var i = 0 ; i < dealerHand.length ; i++){
        dealerCardInHand += dealerHand[i];
        if(i!== dealerHand.length-1){
            dealerCardInHand += ' , '
        }
    }
    document.getElementById('dealer-hand-card').innerHTML = dealerCardInHand;

    var cardInHand = '';
    yourScore = 0;
    for(var i = 0 ; i < yourHand.length ; i++){
        yourScore += yourHand[i];
    }
    document.getElementById('your-hand').innerHTML = yourScore;
    for(var i = 0 ; i < yourHand.length ; i++){
        cardInHand += yourHand[i];
        if(i!== yourHand.length-1){
            cardInHand += ' , '
        }
    }
    document.getElementById('your-hand-card').innerHTML = cardInHand;
    if(yourScore > 21 && yourHand.length === 2){
        yourScore = 2;
        document.getElementById('your-hand').innerHTML = yourScore;
    }
    else if(yourHand[yourHand.length-1] === 11){
        yourScore -= yourHand[yourHand.length-1];
        yourScore += 1;
        document.getElementById('your-hand').innerHTML = yourScore;
    }
    if(dealerScore >20 || yourScore > 20){
        endGame(dealerScore,yourScore);
    }
}

function stay(){
    while(dealerScore < 18){
        var dealer = Math.random()*cards.length;
        var indexDealer = Math.round(dealer);
        dealerHand.push(cards[indexDealer]);
        cards.splice(indexDealer , 1);
        if(dealerHand[dealerHand.length-1] === 11 && dealerScore < 21){
            if(dealerScore + 11 === 21){
                dealerScore = 21;
            }
            else{
                dealerScore += 1;
                dealerHand.pop();
                dealerHand.push(1);
            }
        }
        else{
            dealerScore += dealerHand[dealerHand.length-1];
        }
    }
    dealerScore = 0;
    for(var i = 0 ; i < dealerHand.length ; i++){
        dealerScore += dealerHand[i];
    }
    document.getElementById('dealer-hand').innerHTML = dealerScore;
    endGame(dealerScore , yourScore);
    
}

function hit(){
    var your = Math.random()*cards.length;
    var indexYour = Math.round(your);
    yourHand.push(cards[indexYour]);
    cards.splice(indexYour , 1);
    countHand();
}

function endGame(dealer,your){
    var win = false;
    if(your === 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU WIN';
        win = true;
    }
    else if(dealer === 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU LOSE';
    }
    else if(your > 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU LOSE';
    }
    else if(dealer > 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU WIN';
        win = true;
    }
    else if(your === dealer){
        document.getElementById('lose-or-win').innerHTML = 'DRAW';
        money += tempMoney;
        tempMoney = 0;
        var uang = convertToRupiah(money);
        document.getElementById('your-money').innerHTML = uang;
    }
    else if(your > dealer){
        document.getElementById('lose-or-win').innerHTML = 'YOU WIN';
        win = true;
    }
    else{
        document.getElementById('lose-or-win').innerHTML = 'YOU LOSE';
    }
    if(win){
        if(yourHand.length === 2 && yourScore === 21){
            var untung = tempMoney * 2;
            untung *= 1.5;
            money += untung;
            var uang = convertToRupiah(money);
            document.getElementById('your-money').innerHTML = uang;
        }
        else{
            var untung = tempMoney * 2;
            money += untung;
            var uang = convertToRupiah(money);
            document.getElementById('your-money').innerHTML = uang;
        }
    }
    document.getElementById('your-bet').innerHTML = '';
    var dealerCardInHand = '';
    for(var i = 0 ; i < dealerHand.length ; i++){
        dealerCardInHand += dealerHand[i];
        if(i!== dealerHand.length-1){
            dealerCardInHand += ' , '
        }
    }
    document.getElementById('dealer-hand-card').innerHTML = dealerCardInHand;
    checkMoney(money);
}

function checkMoney(money){
    if(money < 25000){
        document.getElementById('buy-in').style.display = "block";
        document.getElementById('hit-me').style.display = "none";
        document.getElementById('stay').style.display = "none";
        document.getElementById('broke').innerHTML = 'You\'re broke, Game Over';
    }
    else{
        document.getElementById('restart').style.display = "block";
        document.getElementById('hit-me').style.display = "none";
        document.getElementById('stay').style.display = "none";
    }
}

function gameOver(){
    money = 100000;
    document.getElementById('your-money').innerHTML = money;
    restart()
}

function restart(){
    cards = [];
    dealerScore = 0;
    tempMoney = 0;
    yourScore = 0;
    dealerHand = [];
    yourHand = [];
    document.getElementById('lose-or-win').innerHTML = '';
    document.getElementById('dealer-hand-card').innerHTML = '';
    document.getElementById('your-hand-card').innerHTML = '';
    document.getElementById('dealer-hand').innerHTML = '';
    document.getElementById('your-hand').innerHTML = '';
    document.getElementById('broke').innerHTML = '';
    document.getElementById('your-bet').innerHTML = '';
    document.getElementById('buy-in').style.display = "none";
    document.getElementById('restart').style.display = "none";
    document.getElementById('start').style.display = "block";
    document.getElementById('bet').style.display = 'block';
    document.getElementById('hand').style.display = "none";
}