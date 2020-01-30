var dealerHand = [];
var yourHand = [];
var cards = [];
var money = 100000

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

function addCard(){
    cards.push(11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10);
}

function startGame(){
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
        dealerScore += dealerHand[dealerHand.length-1];
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
    countHand();
    
}

function endGame(dealer,your){
    if(your === 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU WIN';
    }
    else if(dealer === 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU LOSE';
    }
    else if(your > 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU LOSE';
    }
    else if(dealer > 21){
        document.getElementById('lose-or-win').innerHTML = 'YOU WIN';
    }
    else if(your === dealer){
        document.getElementById('lose-or-win').innerHTML = 'DRAW';
    }
    else if(your > dealer){
        document.getElementById('lose-or-win').innerHTML = 'YOU WIN';
    }
    else{
        document.getElementById('lose-or-win').innerHTML = 'YOU LOSE';
    }
    var dealerCardInHand = '';
    for(var i = 0 ; i < dealerHand.length ; i++){
        dealerCardInHand += dealerHand[i];
        if(i!== dealerHand.length-1){
            dealerCardInHand += ' , '
        }
    }
    document.getElementById('dealer-hand-card').innerHTML = dealerCardInHand;
    document.getElementById('restart').style.display = "block";
    document.getElementById('hit-me').style.display = "none";
    document.getElementById('stay').style.display = "none";

}

function restart(){
    cards = [];
    dealerScore = 0;
    yourScore = 0;
    dealerHand = [];
    yourHand = [];
    document.getElementById('lose-or-win').innerHTML = '';
    document.getElementById('dealer-hand-card').innerHTML = '';
    document.getElementById('your-hand-card').innerHTML = '';
    document.getElementById('dealer-hand').innerHTML = '';
    document.getElementById('your-hand').innerHTML = '';
    document.getElementById('restart').style.display = "none";
    document.getElementById('start').style.display = "block";
}