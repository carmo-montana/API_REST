import { Request, Response } from "express"
import prisma from "../prisma"



export default class controlador {
    async create(req: Request, res: Response) {
        const { nome, email, senha, cargo } = req.body

        if (!nome || !email || !senha || !cargo) {
            return res.status(404).json({
                mensagem: 'Todos os campos são obrigatórios'
            })
        }

        try {
            const cadrasto = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha,
                    cargo
                }
            })

            if (!cadrasto) {
                return res.status(404).json({
                    mensagem: 'Algo deu erro no cadrasto do usuarios'
                })
            }

            return res.status(200).json(cadrasto)
        }
        } catch(error) {
        const erro = error as Error
        return res.status(500).json({
            mensagem: 'Erro dentro do servidor do usuarios'
        })
    }

}


