class Card {

    /**
     * Class properties suit and value
     */
    #suit;
    #face;

    /**
     * basic constructor
     * @param suit the suit of the card as an int, 1=Clubs, 2=Diamonds, 3=Hearts, 4=Spades
     * @param face the value of the card as an int
     */
    constructor(suit, face) {
        this.#suit = suit;
        this.#face = face;
    }

    get suit() {
        return this.#suit;
    }
    get face() {
        return this.#face;
    }

    /**
     * Compares this Card with another (suit is not considered)
     * @param first the first card to compare
     * @param second the second car to compare
     * @return int, -1 if first card is less than second, 0 if they are equal,
     *  1 if first card is greater
     */
    static compare(first, second) {
        if (first.face() > second.face()) {
            return 1;
        }
        else if (first.face() < second.face()) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     * @returns string in the format [suit][face]
     */
    toString() {
        let result = "";

        switch (this.face()) {
            case this.face() < 11:
                result += this.face() + " of ";
                break;
            case 11:
                result += "Jack of ";
                break;
            case 12:
                result += "Queen of ";
                break;
            case 13:
                result += "King of ";
                break;
            case 14:
                result += "Ace of ";
                break;
            default:
                result += "Error, card value is undefined.";
                break;
        }

        switch (this.suit()) {
            case 1:
                result += "Clubs";
                break;
            case 2:
                result += "Diamonds";
                break;
            case 3:
                result += "Hearts";
                break;
            case 4:
                result += "Spades";
                break;
            default:
                result += "Error, suit undefined. ";
                break;
        }


        return result;
    }

}