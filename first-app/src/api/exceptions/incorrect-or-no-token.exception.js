class IncorrectOrNoTokenException extends Error{
    constructor() {
        super();
        this.status = 498;
        this.description = 'Correct token is required!';
    }
}

module.exports = {
    IncorrectOrNoTokenException
};