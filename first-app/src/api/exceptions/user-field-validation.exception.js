class UserFieldValidationException extends Error{
    constructor(description) {
        super();
        this.status = 501;
        this.description = description;
    }
}

module.exports = { UserFieldValidationException };