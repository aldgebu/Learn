class UserNotFoundException extends Error{
    constructor() {
        super();
        this.status = 400;
        this.description = 'Such user not found';
    }
}

module.exports = { UserNotFoundException };