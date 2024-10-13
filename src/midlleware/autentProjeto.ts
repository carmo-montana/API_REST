import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { CustomRequest } from "./autenticacao";

export default class autenticacaolider {

    async ProjetCargo(req: Request, res: Response, next: NextFunction) {
        const projetoId = Number(req.params.projetoId)
        const usuarioId = projetoId
        try {
            const lider = await prisma.projeto.findFirst({
                where: {
                    id: projetoId,
                    liderId: usuarioId
                }
            })

            if (!lider) {
                return res.status(404).json({
                    erro: 'Acesso negado. Apenas o líder do projeto pode realizar esta ação'
                })
            }
            next()
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro ao verificar permissões de liderança'
            })
        }

    }

    async verificarLideranca(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const usuarioId = req.user!.id
            const { projetoId } = req.params

            if (!usuarioId || !projetoId) {
                return res.status(404).json({
                    mensagem: 'Informações insuficientes para verificar permissão'
                })
            }

            const projeto = await prisma.projeto.findUnique({
                where: { id: +projetoId },
                select: { liderId: true }
            })

            if (!projeto) {
                return res.status(404).json({
                    mensagem: 'Projeto não encontrado'
                })
            }

            if (projeto.liderId !== usuarioId) {
                return res.status(400).json({
                    mensagem: 'Permissão negada: Você não é o lider desse projeto'
                })
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                mensagem: 'Erro ao verificar permissão de liderança'
            })
        }
    }

    async authorizeProjetMembor(req: CustomRequest, res: Response, next: NextFunction) {
        const usuarioId = req.user!.id
        const projetoId = Number(req.params.projetoId)

        try {

            const membro = await prisma.projeto.findFirst({
                where: {
                    id: projetoId,
                    membro: {
                        some: { id: usuarioId }
                    }
                }
            })

            if (!membro) {
                return res.status(403).json({ message: 'Acesso negado. Você não faz parte deste projeto.' })
            }
            next()
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao verificar permissões de acesso.' })
        }
    }
}