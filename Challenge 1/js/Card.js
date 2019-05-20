class Card {

    /**
     * basic constructor
     * @param suit the suit of the card as an int, 1=Clubs, 2=Diamonds, 3=Hearts, 4=Spades
     * @param face the value of the card as an int
     */
    constructor(suit, face) {
        this._suit = suit;
        this._face = face;
    }

    get suit() {
        return this._suit;
    }
    get face() {
        return this._face;
    }

    /**
     * Compares this Card with another (suit is not considered)
     * @param first the first card to compare
     * @param second the second car to compare
     * @return int, -1 if first card is less than second, 0 if they are equal,
     *  1 if first card is greater
     */
    static compare(first, second) {
        if (first._face > second._face) {
            return 1;
        }
        else if (first._face < second._face) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     * Takes the int value of a card and returns its proper term, e.g. 11 = Jack
     */
    static translate(face) {
        switch (face) {
            case 11:
                return "Jack";
            case 12:
                return "Queen";
            case 13:
                return "King";
            case 14:
                return "Ace";
            default:
                return face;
        }
    }

    /**
     * @returns string in the format [suit][face]
     */
    toString() {
        let result = "";

        switch (this._face) {
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
                result += this._face + " of ";
                break;
        }

        switch (this._suit) {
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
        }


        return result;
    }

}