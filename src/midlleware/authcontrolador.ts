import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { Request, Response } from 'express'



const prisma = new PrismaClient()

const transportar = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.JWT_SECRET,
        pass: process.env.JWT_SECRET
    }
})

export const solicitarRecuperacaoSenha = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } })
        if (!usuario) {
            return res.status(400).json({
                erro: 'Usuario não encontrado'
            })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetExpires = new Date(Date.now() + 3600000)

        await prisma.usuario.update({
            where: { email },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetExpires
            }
        })

        const resetUrl = `${process.env.JWT_SECRET}/reset-senha/${resetToken}`
        await transportar.sendMail({
            to: email,
            subject: 'Recuperação de senha',
            html: ``
        })

        res.status(200).json({ message: 'Email de recuperação enviado' })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro na solicitação de recuperação de senha'
        })
    }
}

export const redefinirSenha = async (req: Request, res: Response) => {
    const { token, novaSenha } = req.body

    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { gte: new Date() }
            }
        })

        if (!usuario) {
            return res.status(400).json({
                erro: 'Token informado inválido ou expirado'
            })
        }

        const hashSenha = bcrypt.hash(novaSenha, 10)

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                senha: hashSenha as Promise<string>,
                resetPasswordToken: null,
                resetPasswordExpires: null
            }
        })
        res.status(200).json({
            mensagem: 'Senha alterada com sucesso'
        })
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao redefinir senha' })
    }
}