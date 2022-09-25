const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(3)
// .is().max(100)
// .is().digits(2)

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)){
        next()
    }else{
        res.status(400).json({message:'mdp a echoue pour x raison:'+passwordSchema.validate(req.body.password,{list:true})})
    }
}