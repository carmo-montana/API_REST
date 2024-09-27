import { Router } from "express"
import controlador from "./controladorUsuario/usuarios"
import controladorProjeto from "./controllProjeto/projeto"
import autenticacaoLogin from "./controladorUsuario/login"
import { validarToken } from "./midlleware/autenticacao"
import { sortAndDeduplicateDiagnostics } from "typescript"
import { redefinirSenha } from "./midlleware/authcontrolador"


const rotas = Router()

rotas.post('/usuario', new controlador().create)
rotas.post('/login', new autenticacaoLogin().login)


rotas.use(validarToken)

rotas.post('/solicitar-recuperacao-senha', sortAndDeduplicateDiagnostics)
rotas.post('/redefinir-senha', redefinirSenha)


rotas.post('/projeto', new controladorProjeto().create)
rotas.get('/projeto', new controladorProjeto().detalhar)



export default rotas