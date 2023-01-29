class DuplicateEmailException extends Error {
  constructor() {
    super();
    this.status = 409
    this.description = "Email Already Exist"
  }
}

module.exports = {
  DuplicateEmailException
}