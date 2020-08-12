//import { object, string } from "yup";
const { object, string } = require("yup");

const registrationSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required().email(),
    password: string().required()
})

module.exports = { registrationSchema };






