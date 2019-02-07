// used variables
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. generate a random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. display the result 
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';  //change the picture of the dice

        // 3. update the roundScore if the rolled number is not a 1
        if(dice > 1){
            //add score to roundScore
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            nextPlayer();
        }
    }
});

//event listener for the hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        
        //add the current score to the global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if(scores[activePlayer] >= 30){
            document.querySelector('#name-' + activePlayer).textContent = 'Winnner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            //the other's player turn now
            nextPlayer();
        }
    }
});

// event listener for the new game button:
document.querySelector('.btn-new').addEventListener('click', init);

//function init which initializes the game by setting everything back to default and remove class winner
function init(){
    scores = [0,0];  
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    // change players name back to default
    document.querySelector('#name-0').textContent = 'player 1';
    document.querySelector('#name-1').textContent = 'player 2';

    //remove the class winner and active from both players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');



} ;


// next player turn function
function nextPlayer(){
    //next player's turn using ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('.active');
    // document.querySelector('.player-0-panel').classList.remove('.active');

    document.querySelector('.dice').style.display = 'none';
}