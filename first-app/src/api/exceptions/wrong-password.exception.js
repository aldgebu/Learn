class WrongPasswordException extends Error{
    constructor() {
        super();
        this.status = 403;
        this.description = 'Wrong password';
    }
}

module.exports = { WrongPasswordException };