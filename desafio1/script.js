
function ageInYear() {
var birthYear=prompt('what year were you born... Good friend');
var ageInDays=(2022-birthYear)*365;
var h1=document.createElement('h1');
var textAnswer=document.createTextNode('You are '+ageInDays+' days old');
h1.setAttribute('id','ageInYear');
h1.appendChild(textAnswer);
document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInYear').remove();
}

///cat generator
function generatorcat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat');
    image.src="https://media0.giphy.com/media/W9qg34Gjp8qd2/giphy.gif"
    div.appendChild(image);

}

/// Rock, Paper Scissors.................................................................................................
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(ramdo());
    console.log('computer choice:',botChoice);
    results=decideWinner(humanChoice,botChoice);
    console.log(results);
    message=finalMessage(results) //{massage:'you  won',color:'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice,message);
}
function ramdo(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
    var rpsDatabasse={
        'rock':{'scissors': 1, 'rock': 0.5,'paper': 0},
        'paper':{'rock': 1, 'paper': 0.5,'scissors': 0},
        'scissors':{'paper': 1, 'scissors': 0.5,'rock': 0}
    }

    var yourScore=rpsDatabasse[yourChoice][computerChoice];
    var computerScore=rpsDatabasse[computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if(yourScore===0){
        return {'message':'You lost!', 'color': 'red'};
    }else if(yourScore===0.5){
        return {'message':'You tied!', 'color': 'yellow'};
    }else {
        return {'message':'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imageDatabase= {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+ imageDatabase[humanImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    
    botDiv.innerHTML="<img src='"+ imageDatabase[botImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
   messageDiv.innerHTML="<h1 style='color:" +finalMessage['color']+"; font-size: 60px;padding: 30px; '>"+finalMessage['message']+"</h1>"
   document.getElementById('flex-box-rps-div').appendChild(messageDiv);
 
}
//Botton colors............................................................................................................

var all_buttons=document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

 console.log(copyAllButtons.length);

function buttonColorChange(buttonThingy){
    if(buttonThingy.value==='red'){
        buttonsRed();
    }else if (buttonThingy.value==='green'){
        buttonsGreen();
    }else if(buttonThingy.value==='reset'){
        buttonsColorReset();
    }else if(buttonThingy.value==='random') {
        randomColors();
    }

}

function buttonsRed(){
    for(let i=3;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=3;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorReset(){
    for(let i=3;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices=['btn-primary','btn-danger','btn-success','btn-warning'];
    
  
    for(let i=3;i<all_buttons.length;i++){
        var ramdonNumber=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[ramdonNumber]);
    }
}



//.....BLACKJACK...................................................................

let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score': 0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score': 0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false,
};


const YOU= blackjackGame['you']
const DEALER= blackjackGame['dealer']
const hitSound=new Audio('sounds/swish.m4a');
const winSound= new Audio('sounds/cash.mp3');
const lossSound= new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
//showCard(YOU);
    if (blackjackGame['isStand']===false){
    let card=randomCard()
    showCard(card,YOU);
    updateScore(card,YOU)
    showScore(YOU);
    } 

}

function randomCard(){
    let ramdonIndex=Math.floor(Math.random()*13)
    return blackjackGame['cards'][ramdonIndex];
}
   
function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    cardImage=document.createElement('img');
    cardImage.src=`images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();

    }
    
}

function blackjackDeal(){
    //computeWinner();
   // showResult(computeWinner());
   if(blackjackGame['turnOver']===true){
        blackjackGame['isStand']=false;
        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(let i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        
        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;
        document.querySelector('#your-blackjack-result').style.color='white';
        document.querySelector('#dealer-blackjack-result').style.color='white';
        document.querySelector('#blackjack-result').textContent= "Let's play";
        document.querySelector('#blackjack-result').style.color='black';

        blackjackGame['turnOver']=true;
    }
}

function updateScore(card,activePlayer){
    //if adding 11 keeps me below 21, add 11, Otherwise, add 1
    if(card==='A'){
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score']+blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score']+=blackjackGame['cardsMap'][card];
    } 
    
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color= 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
   
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}


 async function dealerLogic(){
    blackjackGame['isStand']=true;
    while(DEALER['score']<16 && blackjackGame['isStand']===true){
        let card=randomCard()
        showCard(card,DEALER);
        updateScore(card,DEALER)
        showScore(DEALER);
        await sleep(1000);
    }
        blackjackGame['turnOver']=true;
        let winner=computeWinner();
        showResult(winner);
        console.log(blackjackGame['turnOver']);
    

}

//computer winner and return who just won

function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score']||(DEALER['score']>21)){
            console.log('You won!');
            winner=YOU;
        }else if(YOU['score']<DEALER['score']){
            console.log('You LOST!');
            winner=DEALER;
        }else if(YOU['score']===DEALER['score']){
            console.log('You drew!');
        } 
        //condition : when user buts but dealer doesn't 
    } else if(YOU['score']>21 && DEALER['score']<=21){
            console.log('You lost');
            winner=DEALER;
    }else if(YOU['score']>21 && DEALER['score']>21){
            console.log('You drew');
    }
    console.log('Winner is',winner);
    return winner;
}

function showResult(winner){
    
    let message,messageColor;
    let w=0;
    if(blackjackGame['turnOver']===true){
        if(winner===YOU){
            message='You won';
            messageColor='green';
            winSound.play();
            blackjackGame['wins']++;
            document.querySelector('#wins').textContent=blackjackGame['wins'];
        }else if(winner===DEALER){
            message='You Lost';
            messageColor='red';
            lossSound.play();
            blackjackGame['losses']++;
            document.querySelector('#losses').textContent=blackjackGame['losses'];
        }else {
            message= 'You drew';
            messageColor='black';
            blackjackGame['draws']++;
            document.querySelector('#draws').textContent=blackjackGame['draws'];
        }

        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    }
    
    
}


//////challeger 6: AJAX & API's JS


