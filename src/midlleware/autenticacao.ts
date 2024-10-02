import { NextFunction, Request, Response } from "express"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import prisma from "../prisma"


export async function validarToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            mensagem: 'Falha na autenticação'
        })
    }

    let cleanedToken = authorization.replace("Bearer ", "")
    try {
        jwt.verify(cleanedToken, process.env.JWT_SECRET as string) as { id: number }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: Number()
            }
        })
        if (usuario) {
            return res.status(401).json({
                mensagem: 'Falha na autenticação'
            })
        }

        next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(403).json({
                mensagem: 'Falha na autenticação'
            })
        }
        const erro = error as Error
        return res.status(400).json({
            message: erro.message
        })
    }
}