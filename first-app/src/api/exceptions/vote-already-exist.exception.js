class VoteAlreadyExistException extends Error{
    constructor() {
        super();
        this.status = 422;
        this.description = 'Vote already made!'
    }
}

module.exports = { VoteAlreadyExistException };