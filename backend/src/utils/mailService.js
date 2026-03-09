import nodemailer from "nodemailer";

export const createTransporter = async () => {

    const testAccount = await nodemailer.createTestAccount()

    return nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })
}

export const sendMail = async ({ to, subject, html }) => {
    const transporter = await createTransporter()

    const body = await transporter.sendMail({
        from: '"Ecom App" <no-reply@ecom.com>',
        to,
        subject,
        html,
    });

    console.log("Preview URL:", nodemailer.getTestMessageUrl(body))
}