class IncorrectEmailException extends Error{
    constructor() {
        super();
        this.status = 501
        this.description = "Email is not valid"
    }
}

module.exports = {IncorrectEmailException};