class Deck {

    /**
     * Constructor simply initializes 52 cards in sorted order
     */
    constructor() {
        let cards = [];
        for (let i = 1; i <= 4; i++) {
            for (let j = 2; j <= 14; j++) {
                cards.push(new Card(i, j));
            }
        }

        this._cards = cards;
    }

    /**
     * Randomizes the order of the cards in the deck using Fisher-Yates algorithm
     */
    shuffle() {
        for (let i = this._cards.length - 1; i > 0; i--) {
            // Get a random index of the subarray 0 - i
            let j = Math.floor(Math.random() * (i + 1));

            [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
        }
    }

    /**
     * Deals a single hand
     * @param size is the number of cards to deal
     */
    deal(size) {
        let hand = new Hand();

        for (let i = 0; i < size; i++) {
            hand.add(this.cards[i]);
        }

        return hand;
    }

    get cards() {
        return this._cards;
    }
}