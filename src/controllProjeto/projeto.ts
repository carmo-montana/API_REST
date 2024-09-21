import { Request, Response } from "express"
import prisma from "../prisma"

export default class controladorProjeto {
    async create(req: Request, res: Response) {
        const { nome, descricao, liderId } = req.body

        try {
            const novoProjeto = await prisma.projeto.create({
                data: {
                    nome,
                    descricao,
                    liderId
                }
            })

            return res.status(200).json(novoProjeto)
        } catch (error) {
            const erro = error as Error
            return res.status(500).json({
                mensagem: 'Erro no controladorProjeto'
            })
        }
    }

    async detalhar(req: Request, res: Response) {
        try {
            const litarUsuarios = await prisma.projeto.findMany()

            if (!litarUsuarios) {
                return res.status(404).json({
                    mensagem: 'Usuários não encontrado'
                })
            }

            return res.status(200).json(litarUsuarios)

        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }


    }
}