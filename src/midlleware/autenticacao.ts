import { NextFunction, Request, Response } from "express"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import prisma from "../prisma"
import { extend } from "joi"
export interface CustomRequest extends Request {
    user?: {
        id: number
        email: string
    }
}

export async function validarToken(req: CustomRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            mensagem: 'Falha na autenticação'
        })
    }

    let cleanedToken = authorization.replace("Bearer ", "")
    try {
        const { id } = jwt.verify(cleanedToken, process.env.JWT_SECRET as string) as { id: number }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id
            }
        })
        if (!usuario) {
            return res.status(401).json({
                mensagem: 'Falha na autenticação'
            })
        }

        req.user = {
            id: usuario.id,
            email: usuario.email
        }

        next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(403).json({
                mensagem: 'Falha na autenticação'
            })
        }
        const erro = error as Error
        res.status(400).json({
            message: erro.message
        })
    }

}

