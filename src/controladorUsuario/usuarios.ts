import { Request, Response } from "express"
import prisma from "../prisma"
import * as bcrypt from 'bcrypt'



export default class controlador {
    async create(req: Request, res: Response) {

        const { nome, email, senha, cargo } = req.body
        if (!nome || !email || !senha || !cargo) {
            return res.status(404).json({
                mensagem: 'Todos os campos são obrigatórios'
            })
        }



        const senhaForte = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        const validarSenhaForte = senhaForte.test(senha)

        if (!validarSenhaForte) {
            return res.status(400).json({
                mensagem: 'Sua senha tem que ter no mínimo 8 caracteres contendo uma letra maiúscula e menúscula e pelo menos um número'
            })
        }

        try {
            const emailExiste = await prisma.usuario.findUnique({
                where: {
                    email
                }
            })

            if (emailExiste) {
                return res.status(400).json({
                    mensagem: 'E-mail informado já existe'
                })
            }


            const senhaCriptografada = await bcrypt.hash(senha, 10)
            const cadrasto = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: senhaCriptografada,
                    cargo
                }
            })

            const { senha: _, ...usuario } = cadrasto

            if (!cadrasto) {
                return res.status(404).json({
                    mensagem: 'Algo deu erro no cadrasto do usuarios'
                })
            }

            return res.status(200).json(usuario)
        }
        catch (error) {
            const erro = error as Error
            return res.status(500).json({
                mensagem: 'Erro dentro do servidor do usuarios'
            })

        }

    }

}
