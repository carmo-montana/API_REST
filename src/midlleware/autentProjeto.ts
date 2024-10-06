import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

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
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro ao verificar permissões de liderança'
            })
        }

        next()
    }

}