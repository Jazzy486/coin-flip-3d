let predictedOutcome = null;
let betAmount = 10;

// DOM Elements
const betSlider = document.getElementById('bet-slider');
const betAmountDisplay = document.getElementById('bet-amount');
const headsButton = document.getElementById('heads');
const tailsButton = document.getElementById('tails');
const flipButton = document.getElementById('flip-coin');
const claimButton = document.getElementById('claim-reward');
const messageDiv = document.getElementById('message');
const coin = document.getElementById('coin');

// Initial State
claimButton.disabled = true; // Disable "Claim Reward" initially

// Update Bet Amount Slider
betSlider.addEventListener('input', () => {
  betAmount = parseInt(betSlider.value, 10);
  betAmountDisplay.textContent = betAmount;
});

// Predicted Outcome Selection
headsButton.addEventListener('click', () => {
  predictedOutcome = 'Heads';
  messageDiv.textContent = 'You selected Heads.';
  headsButton.disabled = true;
  tailsButton.disabled = false;
});

tailsButton.addEventListener('click', () => {
  predictedOutcome = 'Tails';
  messageDiv.textContent = 'You selected Tails.';
  tailsButton.disabled = true;
  headsButton.disabled = false;
});

// Coin Flip Logic
flipButton.addEventListener('click', () => {
  if (!predictedOutcome) {
    messageDiv.textContent = 'Please select Heads or Tails before flipping.';
    return;
  }

  // Disable flip button to prevent multiple clicks
  flipButton.disabled = true;

  // Start coin animation
  coin.style.animation = 'flip 2s';

  // Resolve the coin flip after 2 seconds
  setTimeout(() => {
    const isHeads = Math.random() > 0.5;
    const outcome = isHeads ? 'Heads' : 'Tails';
    coin.textContent = isHeads ? 'H' : 'T';
    coin.style.animation = 'none';

    if (predictedOutcome === outcome) {
      messageDiv.textContent = `You win! Outcome: ${outcome}`;
      claimButton.disabled = false; // Enable claim button
    } else {
      messageDiv.textContent = `You lose! Outcome: ${outcome}`;
    }

    // Reset for next round
    predictedOutcome = null;
    headsButton.disabled = false;
    tailsButton.disabled = false;
    flipButton.disabled = false; // Re-enable flip button
  }, 2000);
});

// Claim Reward Placeholder
claimButton.addEventListener('click', () => {
  messageDiv.textContent = 'This is a demo. Rewards cannot be claimed.';
  claimButton.disabled = true; // Disable claim button after claiming
});
