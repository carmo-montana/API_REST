import { Request, Response } from "express"
import prisma from "../prisma"

export default class autenticacaoLogin {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios'
            })
        }

        try {
            const loginDoUsuario = await prisma.usuario.findMany()

            if (loginDoUsuario) {
                return res.status(404).json({
                    mensagem: 'E-mail ou senha invalido'
                })
            }

            return res.status(200).json(loginDoUsuario)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }
}