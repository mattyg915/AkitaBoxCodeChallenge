class Card {

    /**
     * Class properties suit and value
     */
    #suit;
    #val;

    /**
     * basic constructor
     * @param suit the suit of the card as an int, 1=Clubs, 2=Diamonds, 3=Hearts, 4=Spades
     * @param val the value of the card as an int
     */
    constructor(suit, val) {
        this.#suit = suit;
        this.#val = val;
    }

    get suit() {
        return this.#suit;
    }
    get val() {
        return this.#val;
    }

    /**
     * Compares this Card with another (suit is not considered)
     * @param first the first card to compare
     * @param second the second car to compare
     * @return int, -1 if first card is less than second, 0 if they are equal,
     *  1 if first card is greater
     */
    static compare(first, second) {
        if (first.val() > second.val()) {
            return 1;
        }
        else if (first.val() < second.val()) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     * @returns string in the format [suit][value]
     */
    toString() {
        let result = "";
        switch (this.suit()) {
            case 1:
                result += "C";
                break;
            case 2:
                result += "D";
                break;
            case 3:
                result += "H";
                break;
            case 4:
                result += "S";
                break;
            default:
                result += "Error, suit undefined. ";
                break;
        }

        switch (this.val()) {
            case this.val() < 11:
                result += this.val();
                break;
            case 11:
                result += "J";
                break;
            case 12:
                result += "Q";
                break;
            case 13:
                result += "K";
                break;
            case 14:
                result += "A";
                break;
            default:
                result += "Error, card value is undefined.";
                break;
        }
        return result;
    }

}