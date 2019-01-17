export default class User {
    constructor(name) {
        this._name = name
    }
    
    //TODO: Add unit test
    get() {
        return this._name
    }
}