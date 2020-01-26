/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Setting a value in HTML = Setter | Reading a value = Getter
// gamePlaying is a STATE VARIABLE which tells the state of our game
let scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        // 1. Random Number | Random fun output is between 0 to 1 | For 1 to 6 we x 6 + 1
        let dice = Math.floor(Math.random() * 6) + 1; 

        // 2. Display the result
        const diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        // 3. Update the round score IF the olled number was not 1
        if (dice !== 1 ) {
            // Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click' , function() {

    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            // NOTE : It is always better to add | remove class instead of using the style property for changing CSS
            // document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            // Call Next Player
            nextPlayer();
        }
    }
    
});

// DRY Principle : DO NOT REPEAT YOURSELF
function nextPlayer() {
    // Condition ? if : else
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

// init = just telling to use this |vs| init() = calling as soon as the line is executed
document.querySelector('.btn-new').addEventListener('click', init);

// To initialize variables
function init() {

    gamePlaying = true;
     // 0 index for 1st player | 1 index for 2nd player
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    // getElementById is FASTER than querySelector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Initializing Player name 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove Winner and active classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Add active class to player 0
    document.querySelector('.player-0-panel').classList.add('active');

}

