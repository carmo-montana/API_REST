import { Request, Response } from "express";
import prisma from "../prisma";

export default class controladorComentarios {
    async create(req: Request, res: Response) {
        const { texto, autorId, tarefaId } = req.body

        try {
            const comentarios = await prisma.comentario.create({
                data: {
                    texto,
                    autor: { connect: { id: Number(autorId) } },
                    tarefa: { connect: { id: Number(tarefaId) } }
                }
            })

            return res.status(200).json(comentarios)
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro ao adicionar comentário'
            })
        }
    }

    async listarComentarios(req: Request, res: Response) {
        const { id } = req.params

        try {
            const comentariosListado = await prisma.comentario.findMany({
                where: { id: Number(id) },
                include: {
                    autor: true
                }
            })

            return res.status(200).json(comentariosListado)
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro ao listar os comentários da tarefa'
            })
        }
    }

    async editarComentarios(req: Request, res: Response) {
        const { id } = req.params
        const { texto } = req.body

        try {
            const comentariosEditado = await prisma.comentario.update({
                where: { id: Number(id) },
                data: {
                    texto
                }
            })

            return res.status(201).json(comentariosEditado)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao editar o comentário'
            })
        }
    }

    async deletar(req: Request, res: Response) {
        const { id } = req.params

        try {
            const deletar = await prisma.comentario.delete({
                where: { id: Number(id) }
            })

            if (deletar) {
                return res.status(404).json({
                    mensagem: 'Comentário excluído com sucesso'
                })
            }
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro ao excluir o comentário'
            })
        }
    }
}