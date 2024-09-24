import { Router } from "express"
import controlador from "./controladorUsuario/usuarios"
import controladorProjeto from "./controllProjeto/projeto"
import autenticacaoLogin from "./controladorUsuario/login"

const rotas = Router()

rotas.post('/usuario', new controlador().create)


rotas.post('/projeto', new controladorProjeto().create)
rotas.get('/projeto', new controladorProjeto().detalhar)

rotas.post('/login', new autenticacaoLogin().login)

export default rotas