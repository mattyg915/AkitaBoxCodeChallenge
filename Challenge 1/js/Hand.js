class Hand {

    /**
     * Class property cards is an array of Card objects
     */
    #cards = [];

    /**
     * @param card an instance of Card to add to the hand
     */
    add(card) {
        this.#cards.push(card);
    }

    /**
     * Sorts the hand in ascending order by card value
     */
    sort() {
        this.#cards.sort(Card.compare);
    }

    get cards() {
        return this.#cards;
    }

    toString() {
        return this.cards();
    }

    /**
     * Evaluates the Hand object. Score is determined in the following manner:
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

        // Get all the card face values in one array, suits in another
        let faces = [];
        this.cards().forEach(card => faces.push(card.value()));

        let suits = [];
        this.cards().forEach(card => suits.push(card.suit()));

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
            else if (faces.includes(14) && (faces[0] === 2)) {
                isStraight = true;
            }
            else if (!isFlush) { // No straight, no flush, no pairs, so high card
                let rank = "High Card: " + this.#cards[this.#cards.length - 1].toString();
                score = faces[faces.length - 1];
                return [rank, score];
            }
        }
        else if (pairs.size === 4) { // Single pair
            pairs.forEach(face => {
                if (pairs.get(face) === 2) {
                    let card = this.#cards.find(card => card.face() === face);
                    let rank = "Pair of " + card.toString() + "s";
                    return [rank, 100 + face];
                }
            })
        }
        else if (pairs.size === 3) { // 3 of a kind or two pair
            let rank = "Two Pair: "; // Will be discarded if we hit 3 of a kind
            pairs.forEach( face => {
                if (pairs.get(face) === 3) { // Must be 3 of a kind, calculate and return
                    let card = this.#cards.find(card => card.face() === face);
                    let rank = "Three of a kind: " + card.toString() + "s";
                    return [rank, 300 + face];
                }
                else if (pairs.get(face) === 2) { // Keep looping to get the other card
                    score += 100 + face; // will run twice so score is halved
                    let card = this.#cards.find(card => card.face() === face);
                    rank += card.toString() + "s ";
                }
            });
            return [rank, score]; // For two pair
        }
        else if (pairs.size === 2) { // Full house or 4 of a kind, same algorithm as above
            let rank = "Full house: ";
            pairs.forEach( face => {
                if (pairs.get(face) === 4) {
                    let card = this.#cards.find(card => card.face() === face);
                    let rank = "Four of a kind: " + card.toString() + "s";
                    return [rank, 700 + face];
                }
                else if ((pairs.get(face) === 3) || (pairs.get(face) === 2)) {
                    score += 300 + face;
                    let card = this.#cards.find(card => card.face() === face);
                    rank += card.toString() + "s ";
                }
            });
            return [rank, score]; // For two pair
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
            return ["Flush!", score];
        }
    }

}