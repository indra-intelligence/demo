let instance = null;

var products = [];

class DataService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    addProduct = data => {
        products = data;
    };

    getNextProduct = () => {
        let nextProduct = products.pop();
        console.log(nextProduct)
        if (nextProduct == null) {
            return null;
        } else {
            return [nextProduct];
        }
        
    }

    isLastProduct = () => {
        if (products.length < 1){
            return true;
        } else {
            return false;
        }
    }

    downVote = () => {
        // do logic
        return this.getNextProduct();
    };

    upVote = () => {
        return this.getNextProduct();
    }


}

export default DataService;
