class RouletteBetting {
    constructor() {
        this.bets = [];
        this.houseProfit = 0;
        this.redNumbers = [1, 3, 5, 7, 9, 12];
        this.blackNumbers = [2, 4, 6, 8, 10, 11];
    }

    placeBet(name, input, betAmount) {
        let numbers;

        if (isNaN(input)) {
            // Input is a color
            if (input.toLowerCase() === 'red') {
                numbers = this.redNumbers;
            } else if (input.toLowerCase() === 'black') {
                numbers = this.blackNumbers;
            } else {
                console.log("Invalid input. Please enter a valid color ('red' or 'black') or a number.");
                return;
            }
        } else {
            // Input is a number
            const num = parseInt(input, 10);
            numbers = [num];
        }

        const bet = { name, numbers, betAmount };
        this.bets.push(bet);
        this.updateCurrentBetsDisplay();
    }

    calculateWinnings(winningNumber) {
    winningNumber = parseInt(winningNumber, 10);

    // Adjust for the method that returns 37 instead of 0
    if (winningNumber === 37) {
        winningNumber = 0;
    }

    let totalPayout = 0;
    const winners = [];

    this.bets.forEach(bet => {
        const { name, numbers, betAmount } = bet;
        if (numbers.includes(winningNumber)) {
            const payoutRatio = this.getPayoutRatio(numbers.length);
            const winnings = betAmount * payoutRatio; // Exclude original bet
            winners.push({ name, winnings });
            totalPayout += winnings;
        }
    });

    this.houseProfit += totalPayout;
    this.bets = []; // Clear current bets
    this.updateWinningBetsDisplay(winners);
    this.updateHouseProfitDisplay();
    this.updateCurrentBetsDisplay(); // Clear display of current bets
}

    }

    getPayoutRatio(numNumbers) {
        switch(numNumbers) {
            case 1: return 35;
            case 2: return 17;
            case 3: return 11;
            case 4: return 8;
            default: return 0;
        }
    }

    totalBetAmount() {
        return this.bets.reduce((acc, bet) => acc + bet.betAmount, 0);
    }

    updateCurrentBetsDisplay() {
        const display = document.getElementById('currentBets');
        display.innerHTML = this.bets.map(bet => `${bet.name}: ${bet.numbers.join(', ')} - $${bet.betAmount}`).join('<br>');
    }

    updateWinningBetsDisplay(winners) {
        const display = document.getElementById('winningBets');
        display.innerHTML = winners.map(winner => `${winner.name} wins $${winner.winnings}`).join('<br>');
    }

    updateHouseProfitDisplay() {
        const display = document.getElementById('houseProfit');
        display.textContent = this.houseProfit;
    }
}

const roulette = new RouletteBetting();

function placeBet() {
    const betInputValue = document.getElementById('betInput').value;
    const [name, input, betAmount] = betInputValue.split(' ');
    roulette.placeBet(name, input, betAmount);
    document.getElementById('betInput').value = ''; // Clear input field
}

function calculateWinnings() {
    const winningNumber = document.getElementById('winInput').value;
    roulette.calculateWinnings(winningNumber);
    document.getElementById('winInput').value = ''; // Clear input field
}

function clearBets() {
    roulette.bets = [];
    roulette.updateCurrentBetsDisplay();
}
