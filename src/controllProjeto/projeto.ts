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
                mensagem: 'Erro ao criar o novo projeto'
            })
        }
    }

    async detalhar(req: Request, res: Response) {
        const { id } = req.params
        try {
            const litarUsuarios = await prisma.projeto.findUnique({
                where: {
                    id: Number(id)
                }
            })

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

    async lider(req: Request, res: Response) {
        const { projetoId, liderId } = req.body

        try {
            const projeto = await prisma.projeto.findUnique({
                where: { id: projetoId }
            })

            const lider = await prisma.usuario.findUnique({
                where: { id: liderId }
            })

            if (!projeto) {
                return res.status(403).json({
                    erro: 'Projeto não encontrado'
                })
            }

            if (!lider) {
                return res.status(403).json({
                    erro: 'Usuário (lider) não encontrado'
                })
            }

            const ProjetoAtualizado = await prisma.projeto.update({
                where: { id: projetoId },
                data: {
                    id: liderId
                }
            })

            return res.status(200).json(ProjetoAtualizado)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                erro: 'Erro ao atribuir o lider para o projeto'
            })
        }
    }

    async AtualizacaoProjeto(req: Request, res: Response) {
        const { nome, descricao, liderId } = req.body

        try {
            const novoProjeto = await prisma.projeto.update({
                where: { id: Number() },
                data: {
                    nome,
                    descricao,
                    liderId
                }
            })
            if (!novoProjeto) {
                return res.status(400).json({
                    erro: 'Erro ao atualizar o projeto'
                })
            }

            return res.status(200).json(novoProjeto)
        } catch (error) {
            const erro = error as Error
            return res.status(500).json({
                mensagem: 'Erro ao criar o novo projeto'
            })
        }
    }

    async deletar(req: Request, res: Response) {
        const { id } = req.params

        try {
            const deletar = await prisma.projeto.delete({
                where: { id: Number() }
            })
            if (!deletar) {
                return res.status(400).json({
                    erro: 'Erro ao deletar o projeto'
                })
            }

            res.status(200).json(deletar)
        } catch (error) {

        }
    }
}