import { Request, Response } from "express"
import prisma from "../prisma"
import Jwt from "jsonwebtoken"
import * as bcrypt from 'bcrypt'
import crypto from 'crypto'
import transportar from "../E-mail"


export default class autenticacaoLogin {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios'
            })
        }

        try {
            const loginDoUsuario = await prisma.usuario.findUnique({
                where: {
                    email
                }
            })

            if (!loginDoUsuario) {
                return res.status(404).json({
                    mensagem: 'E-mail ou senha invalido'
                })
            }

            const validarSenha = await bcrypt.compare(senha, loginDoUsuario.senha)
            if (!validarSenha) {
                return res.status(400).json({
                    mensagem: 'E-amil ou senha invalido'
                })
            }

            const token = Jwt.sign(
                { id: loginDoUsuario.id },
                process.env.JWT_SECRET || '',
                { expiresIn: '1h' }
            )



            return res.status(200).json(token)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }

    async solicitarRecuperacaoSenha(req: Request, res: Response) {
        const { email } = req.body

        try {
            const usuario = await prisma.usuario.findUnique({ where: { email } })
            if (!usuario) { return res.status(400).json({ erro: 'Usuario não encontrado' }) }

            // gerar o token do reset
            const resetToken = crypto.randomBytes(32).toString('hex')
            const resetExpires = new Date(Date.now() + 3600000)

            await prisma.usuario.update({
                where: { email },
                data: {
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: resetExpires
                }
            })

            const resetUrl = `${process.env.CLIENT_URL}/reset-senha/${resetToken}`
            await transportar.sendMail({
                from: 'Gestão de tarefas colaborativas <gestaotarefas@gmail.com>',
                to: email,
                subject: 'Recuperação de senha',
                html: `<p>Você solicitou uma recuperação de senha. Clique <a href="${resetUrl}">aqui</a> para redefinir sua senha. Esse link expira em 1 hora.</p>`,
                amp: `<!doctype html>
                <html ⚡4email>
                <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                </head>
                <body>
                    <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                    <p>GIF (requires "amp-anim" script in header):<br/>
                    <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
                </body>
                </html>`
            })

            res.status(200).json({
                mensagem: 'Email de recuperação foi enviado'
            })
        } catch (error) {
            return res.status(500).json({ erro: 'Erro na solicitação de recuperação de senha' })
        }
    }

    async redefinirSenha(req: Request, res: Response) {
        const { token, novaSenha } = req.body

        try {
            const usuario = await prisma.usuario.findFirst({
                where: {
                    resetPasswordToken: token,
                    resetPasswordExpires: { gte: new Date() }
                }
            })

            if (!usuario) {
                return res.status(400).json({
                    erro: 'Token informado inválido ou expirado'
                })
            }

            const hashSenha = bcrypt.hash(novaSenha, 10)

            await prisma.usuario.update({
                where: { id: usuario.id },
                data: {
                    // senha: hashSenha,
                    resetPasswordToken: null,
                    resetPasswordExpires: null
                }
            })

            res.status(200).json({ mensagem: 'Senha alterada com sucesso' })
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao redefinir senha' })
        }
    }
}