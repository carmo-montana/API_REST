import { Request, Response } from "express";
import prisma from "../prisma";

export default class controladorTarefas {
    async create(req: Request, res: Response) {
        const { projetoId, titulo, descricao, prioridade, dataEntrega, responsavelId } = req.body

        try {
            const tarefas = await prisma.tarefa.create({
                data: {
                    titulo,
                    descricao,
                    prioridade,
                    dataEntrega,
                    projeto: { connect: { id: projetoId } },
                    responsavel: responsavelId ? { connect: { id: responsavelId } } : undefined
                }
            })

            if (tarefas) {
                return res.status(201).json({
                    mensagem: 'Tarefa criada com sucesso'
                })
            }

            return res.status(200).json(tarefas)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao criar tarefas'
            })
        }
    }

    async atualizarStatusTarefa(req: Request, res: Response) {
        const { tarefaId } = req.params
        const { novoStatus } = req.body

        try {
            const atualizarStatus = await prisma.tarefa.update({
                where: { id: Number(tarefaId) },
                data: {
                    status: novoStatus
                }
            })

            if (atualizarStatus) {
                return res.status(201).json({
                    mensagem: 'Status da tarefa atualizado com sucesso'
                })
            }
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao atualizar o status da tarefa'
            })
        }
    }

    async atribuirResponsavelTarefa(req: Request, res: Response) {
        const { tarefaId, responsavelId } = req.body

        try {
            const responsavel = await prisma.tarefa.update({
                where: { id: tarefaId },
                data: {
                    responsavelId: responsavelId
                }
            })

            if (responsavel) {
                return res.status(201).json({
                    mensagem: 'Responsável atribuído com sucesso'
                })
            }

            return res.status(200).json(responsavel)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao atribuir responsável à tarefa'
            })
        }
    }

    async editarTarefa(req: Request, res: Response) {
        const { tarefaId, dadosAtualizados } = req.body

        try {
            const tarefaEditada = await prisma.tarefa.update({
                where: { id: tarefaId },
                data: dadosAtualizados
            })

            if (tarefaEditada) {
                return res.status(201).json({
                    mensagem: 'Tarefa editada com sucesso'
                })
            }

            return res.status(200).json(tarefaEditada)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao editar tarefa'
            })
        }
    }

    async deletar(req: Request, res: Response) {
        const { tarefaId } = req.params

        try {
            const deletar = await prisma.tarefa.delete({
                where: { id: Number(tarefaId) }
            })

            if (deletar) {
                return res.status(201).json({
                    mensagem: 'Tarefa excluída com sucesso'
                })
            }

            return res.status(200).json(deletar)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao excluir tarefa'
            })
        }
    }

    async filtrarTarefas(req: Request, res: Response) {
        const { status, responsavelId, prioridade } = req.body

        try {
            const filtros: any = {}

            if (status) {
                filtros.status = status
            }

            if (responsavelId) {
                filtros.responsavelId = responsavelId
            }

            if (prioridade) {
                filtros.prioridade = prioridade
            }

            const tarefasFiltradas = await prisma.tarefa.findMany({
                where: filtros
            })

            if (tarefasFiltradas) {
                return res.status(201).json({
                    mensagem: 'Tarefas filtradas'
                })
            }

            return res.status(200).json(tarefasFiltradas)
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro ao filtrar tarefas'
            })
        }
    }
}



