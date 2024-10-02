import nodemailer from 'nodemailer'

console.log(process.env.EMIL_HOST)
const transportar = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "dcd9fc634f1f99",
        pass: "42f2dec9aedd03"
    }
})

export default transportar