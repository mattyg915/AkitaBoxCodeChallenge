class Hand {

    constructor() {
        this._cards = [];
    }

    /**
     * @param card an instance of Card to add to the hand
     */
    add(card) {
        this._cards.push(card);
    }

    /**
     * Sorts the hand in ascending order by card value
     */
    sort() {
        this._cards.sort(Card.compare);
    }

    get cards() {
        return this._cards;
    }

    toString() {
        let result = "";
        this._cards.forEach(card => result += card.toString() + " | ");
        result = result.slice(0, -3);
        return result;
    }

    /**
     * Evaluates the Hand object for a 5 card hand dealt from a single, legal deck of 52 cards (no jokers).
     *  Score is determined in the following manner:
     *  Straight Flush: 800 points + value of highest card
     *  4 of a kind: 700 points plus value of the card
     *  Full House: 600 points plus the combined values of the paired cards
     *  Flush: 500 points plus the value of the highest card
     *  Straight: 400 points plus the value of the highest card
     *  3 of a kind: 300 points plus the value of the paired card
     *  2 pair: 200 points plus the combined values of the paired cards
     *  Pair: 100 points plus the value of the paired card
     *  High card: the value of the highest card
     *
     * @return array with the rank at index 0 and overall score at index 1
     */
    evaluate() {

        this.sort(); // Make sure cards are in sorted order

        let score = 0;
        let result = {};

        // Get all the card face values in one array, suits in another
        let faces = [];
        this._cards.forEach(card => faces.push(card._face));

        let suits = [];
        this._cards.forEach(card => suits.push(card._suit));

        // If every element of suits is the same it's a flush
        let isFlush = suits.every(suit => suit === suits[0]);

        // Group cards in pairs using a map
        let pairs = new Map();
        faces.forEach(face => {
            if (pairs.has(face)) {
                pairs.set(face, pairs.get(face) + 1);
            }
            else {
                pairs.set(face, 1);
            }
        });

        // No pairs of cards, check for straight
        let isStraight = false;
        if (pairs.size === 5) {
            if ((faces[faces.length - 1] - faces[0]) === 4) {
                isStraight = true
            }
            // Ace can be low in a straight
            else if (faces.includes(14) && (faces[3] === 5)) {
                isStraight = true;
            }
            else if (!isFlush) { // No straight, no flush, no pairs, so high card
                let rank = "High Card: " + this._cards[this.cards.length - 1].toString();
                score = faces[faces.length - 1];
                return [rank, score];
            }
        }
        else if (pairs.size === 4) { // Single pair
            pairs.forEach((count, face) => {
                if (count === 2) {
                    result = ["Pair of " + Card.translate(face) + "s", 100 + face];
                }
            });
            return result;
        }
        else if (pairs.size === 3) { // 3 of a kind or two pair
            let paired = [];
            pairs.forEach( (count, face) => {
                if (count === 3) { // Three of a kind
                    result = ["Three of a kind: " + Card.translate(face) + "s", 300 + face];
                }
                else if (count === 2) { // Need to grab both cards and assemble result later
                    paired.push(face);
                }
                score += face; // two players could have the same two pair so total all cards for score
            });

            if (paired.length > 0) {
                result = ["Two pair: " + Card.translate(paired[0]) + "s and " +
                    Card.translate(paired[1]) + "s",200 + score];
            }

            return result;
        }
        else if (pairs.size === 2) { // Full house or 4 of a kind, same algorithm as above
            let paired = [];
            pairs.forEach( (count, face) => {
                if (count === 4) {
                    result = ["Four of a kind: " + Card.translate(face) + "s", 700 + face];
                }
                else if (count === 3 || (count === 2)) {
                    paired.push(face);
                }
            });

            if (paired.length > 0) {
                result = ["Full house: " + Card.translate(paired[0]) + "s and " +
                    Card.translate(paired[1]) + "s",600 + paired[0] + paired[1]];
            }

            return result;
        }
        /**
         * 5 of a kind, not supported as only possible with wild cards larger deck than 52
         */
        else if (pairs.size === 1) {
            return ["Five of a kind!? You got anything else up your sleeve?", 0];
        }

        // Handle straights and flushes
        if (isStraight && isFlush) {
            if (faces.includes(14) && faces.includes(13)) {
                score = 800 + faces[faces.length - 1];
                return ["Royal Flush!", score];
            }
            else {
                score = 800 + faces[faces.length - 1];
                return ["Straight Flush!", score];
            }
        }
        else if (isFlush) {
            score = 500 + faces[faces.length - 1];
            return ["Flush!", score];
        }
        else if (isStraight) {
            score = 400 + faces[faces.length - 1];
            return ["Straight!", score];
        }
    }

}