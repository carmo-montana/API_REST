import { Request, Response } from "express"
import prisma from "../prisma"
import Jwt from "jsonwebtoken"
import * as bcrypt from 'bcrypt'


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
}