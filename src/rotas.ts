import { Router } from "express"
import controlador from "./controladorUsuario/usuarios"
import controladorProjeto from "./controllProjeto/projeto"
import autenticacaoLogin from "./controladorUsuario/login"
import { validarToken } from "./midlleware/autenticacao"
import Multer from "./multer"




const rotas = Router()

rotas.post('/usuario', Multer.single('fotoPerfil'), new controlador().create)
rotas.post('/login', new autenticacaoLogin().login)
rotas.get('/recuperar', new autenticacaoLogin().solicitarRecuperacaoSenha)
rotas.patch('/reset-senha/:resetToken', new autenticacaoLogin().redefinirSenha)

rotas.use(validarToken)


rotas.post('/projetos', new controladorProjeto().create)
rotas.get('/projetos', new controladorProjeto().detalhar)
rotas.post('/projetos/: id', new controladorProjeto().lider)
rotas.delete('/deletar/:id', new controladorProjeto().deletar)



export default rotas