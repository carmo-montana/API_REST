import nodemailer from 'nodemailer'

export const sendEmailNotificacoa = async (to: string, subject: string, texto: string) => {
    const transportar = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "dcd9fc634f1f99",
            pass: "42f2dec9aedd03"
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        texto
    }

    try {
        await transportar.sendMail(mailOptions)
        if (transportar) {
            return 'E-mail enviado com sucesso'
        }
    } catch (error) {
        return 'Erro ao enviar e-mail'
    }
}