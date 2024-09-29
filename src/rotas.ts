import { Router } from "express"
import controlador from "./controladorUsuario/usuarios"
import controladorProjeto from "./controllProjeto/projeto"
import autenticacaoLogin from "./controladorUsuario/login"
import { validarToken } from "./midlleware/autenticacao"




const rotas = Router()

rotas.post('/usuario', new controlador().create)
rotas.post('/login', new autenticacaoLogin().login)

rotas.use(validarToken)

rotas.post('/solicitacaoSenha', new autenticacaoLogin().solicitarRecuperacaoSenha)
rotas.post('/redefinirSenha', new autenticacaoLogin().redefinirSenha)



rotas.post('/projetos', new controladorProjeto().create)
rotas.get('/projetos', new controladorProjeto().detalhar)
rotas.post('/projetos/: id', new controladorProjeto().lider)
rotas.delete('/deletar/:id', new controladorProjeto().deletar)



export default rotas