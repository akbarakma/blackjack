var dealerHand = [];
var yourHand = [];
var cards = [];
var money = 100000;

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
    var temp = [11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10];
    var newCard = shuffleCard(temp);
    for(var i = 0 ; i < newCard.length ; i ++){
        cards.push(newCard[i]);
    }
}

function shuffleCard(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
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
        if(cards.length < 20){
            addCard();
        }
        dealerHand.push(cards[0]);
        cards.shift();
        yourHand.push(cards[0]);
        cards.shift();
        yourHand.push(cards[0]);
        cards.shift();
        countHand();
    }
}



var dealerScore = 0;
var yourScore = 0;
function countHand(){
    dealerScore = 0;
    for(var i = 0 ; i < dealerHand.length ; i++){
        if(dealerHand[i] === 11){
            if((dealerScore + 11) > 21){
                dealerScore += 1;
            }
            else{
                dealerScore += dealerHand[i];
            }
        }
        else{
            dealerScore += dealerHand[i];
        }
    }
    document.getElementById('dealer-hand').innerHTML = dealerScore;

    var dealerCardInHand = '';
    for(var i = 0 ; i < dealerHand.length ; i++){
        if(dealerHand[i] === 11){
            dealerCardInHand += 'A';    
        }
        else{
            dealerCardInHand += dealerHand[i];
        }
        if(i!== dealerHand.length-1){
            dealerCardInHand += ' , '
        }
    }
    document.getElementById('dealer-hand-card').innerHTML = dealerCardInHand;
    
    ////
    var checkA = false;
    var cardInHand = '';
    for(var i = 0 ; i < yourHand.length ; i++){
        if(yourHand[i] === 11){
            cardInHand += 'A';
            checkA = true;
        }
        else{ 
            cardInHand += yourHand[i];
        }
        if(i!== yourHand.length-1){
            cardInHand += ' , '
        }
    }
    document.getElementById('your-hand-card').innerHTML = cardInHand;

    yourScore = 0;
    for(var i = 0 ; i < yourHand.length ; i++){
        yourScore += yourHand[i];
    }
    if(checkA){
        if(yourScore > 21){
            yourScore = 0;
            for(var i = 0 ; i < yourHand.length ; i ++){
                if(yourHand[i] === 11){
                    yourScore += 1;
                }
                else{
                    yourScore += yourHand[i];
                }
            }
        }
    }
    document.getElementById('your-hand').innerHTML = yourScore;

    if(yourScore === 21 && yourHand.length === 2){
        endGame(dealerScore,yourScore);
    }
    else if(yourScore > 21){
        endGame(dealerScore,yourScore);
    }
}

function stay(){
    var stop = false;
    while(stop === false){
        dealerHand.push(cards[0]);
        cards.shift();
        var checkA = false;
        dealerScore = 0;
        for(var i = 0 ; i < dealerHand.length ; i++){
            dealerScore += dealerHand[i];
            if(dealerHand[i] === 11){
                checkA = true;
            }
        }
        if(checkA){
            if(dealerScore > 21){
                dealerScore = 0;
                for(var i = 0 ; i < dealerHand.length ; i ++){
                    if(dealerHand[i] === 11){
                        dealerScore += 1;
                    }
                    else{
                        dealerScore += dealerHand[i];
                    }
                }
            }
        }
        if(dealerScore > 18){
            stop = true;
        }
    }
    document.getElementById('dealer-hand').innerHTML = dealerScore;
    endGame(dealerScore , yourScore);
    
}

function hit(){
    yourHand.push(cards[0]);
    cards.shift();
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
        if(dealerHand[i] === 11){
            dealerCardInHand += 'A';    
        }
        else{
            dealerCardInHand += dealerHand[i];
        }
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
    var uang = convertToRupiah(money);
    document.getElementById('your-money').innerHTML = uang;
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