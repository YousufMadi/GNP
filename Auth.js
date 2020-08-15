//import { object, string } from "yup";
const { object, string } = require("yup");

const registrationSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required().email(),
    password: string().required()
})

const updateSchema = object({
    first_name: string(),
    last_name: string(),
    email: string().email(),
    password: string(),
    confirm_password: string()
})

module.exports = { registrationSchema, updateSchema };






