/**
 * Takes in a Hand object and returns a string with that hand's poker rank
 * @param hand Hand to evaluate
 */
function evaluate(hand) {

    // Get all the card calues in one array, suits in another
    let values = [];
    hand.cards().forEach(card => values.push(card.value()));

    let suits = [];
    hand.cards().forEach(card => suits.push(card.suit()));

    // If every element of suits is the same it's a flush
    let isFlush = suits.every(suit => suit === suits[0]);

    // Group cards in pairs using a hashmap
    let pairs = new Map();
    values.forEach(value => {
        if (pairs.has(value)) {
            pairs.set(value, pairs.get(value) + 1);
        }
        else {
            pairs.set(value, 1);
        }
    });

    // No pairs of cards, check for straight
    let isStraight = false;
    if (pairs.size === 5) {
        if ((values[values.length - 1] - values[0]) === 4) {
            isStraight = true
        }
        // Ace can be low in a straight
        else if (values.includes(14) && (values[0] === 2)) {
            isStraight = true;
        }
    }



}