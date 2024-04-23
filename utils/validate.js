const Joi = require('joi');
// const validateRequest = (schema) => {
//     return (req, res, next) => {
//         const { error } = schema.validate(req.body);
//         if (error) {
//             const errorMessage = error.details.map((detail) => detail.message).join(', ');
//             return res.status(400).json({ error: errorMessage });
//         }
//         next()
//     };
// };


const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
});

const loginSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().required().min(3),
});

const forgotSchema =Joi.object({
     email: Joi.string().email().required(),
})

const resetSchema =Joi.object({
     newpassword:Joi.string().email().required()
})
module.exports = {
    // validateRequest,
    registerSchema,
    loginSchema,
    forgotSchema,
    resetSchema
};