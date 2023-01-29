class ReactionLessThenHourException extends Error{
    constructor() {
        super();
        this.status = 429;
        this.description = 'One hour break is required';
    }
}

module.exports = {
    ReactionLessThenHourException
};