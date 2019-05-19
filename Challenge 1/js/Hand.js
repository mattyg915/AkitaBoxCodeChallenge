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

}