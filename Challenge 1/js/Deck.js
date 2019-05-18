class Deck {

    /**
     * Constructor simply initializes 52 cards in sorted order
     */
    constructor() {
        let cards = [];

        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 13; j++) {
                cards.push(new Card(i, j));
            }
        }

        this._cards = cards;
    }

    /**
     * Randomizes the order of the cards in the deck
     */
    shuffle() {
        //TODO
    }

    /**
     * Deals a single hand of 5 cards
     */
    deal() {
        let hand = [];

        for (let i = 0; i < 5; i++) {
            hand.push(this.cards[i]);
        }

        return hand;
    }

    get cards() {
        return this._cards;
    }
}