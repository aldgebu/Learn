const { UserFieldValidationException } = require('../exceptions/user-field-validation.exception');
const validator=require('validator')
class UserValidator{
    isValid(req, res, next){
        const {firstname, lastname, email, password} = req.body;
        try {
            this.validateFirstname(firstname);
            this.validateLastname(lastname);
            this.validateEmail(email);
            this.validatePassword(password);
            next();
        }catch (error){
            res.status(error.status).send({
                description: error.description
            })
        }
    }
    validForLogin(req, res, next){
        try{
            const { email, password } = req.body;
            this.validateEmail(email);
            this.validatePassword(password);
            next();
        }catch (error){
            res.status(error.status).send({
                description: error.description
            })
        }
    }
    validatePassword(password){
        if (password.length === 0){
            throw new UserFieldValidationException('Empty password is not possible');
        }
    }
    validateFirstname(firstname){
        if (firstname.length === 0){
            throw new UserFieldValidationException('Empty firstname is not possible');
        }
    }
    validateLastname(lastname){
        if (lastname.length === 0){
            throw new UserFieldValidationException('Empty lastname is not possible');
        }
    }
    validateEmail(email){
        if (!validator.isEmail(email)){
            throw new UserFieldValidationException('This email is not valid, try another');
        }
    }
}

module.exports = UserValidator;