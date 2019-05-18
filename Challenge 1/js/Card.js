class Card {

    /**
     * basic constructor
     * @param suit the suit of the card as an int, 1=Clubs, 2=Diamonds, 3=Hearts, 4=Spades
     * @param val the value of the card as an int
     */
    constructor(suit, val) {

        switch (suit) {
            case 1:
                this._suit = "C";
                break;
            case 2:
                this._suit = "D";
                break;
            case 3:
                this._suit = "H";
                break;
            case 4:
                this._suit = "S";
                break;
            default:
                // TODO: throw an error
                break;
        }

        switch (val) {
            case 1:
                this._val = "A";
                break;
            case val < 11:
                this._val = val;
                break;
            case 11:
                this._val = "J";
                break;
            case 12:
                this._val = "Q";
                break;
            case 13:
                this._val = "K";
                break;
            default:
                // TODO: throw an error
                break;
        }
    }

    get suit() {
        return this._suit;
    }
    get val() {
        return this._val;
    }

    toString() {
        return this.suit + this.val;
    }

}