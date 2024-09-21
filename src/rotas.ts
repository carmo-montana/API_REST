import { Router } from "express"
import controlador from "./controladorUsuario/usuarios"
import controladorProjeto from "./controllProjeto/projeto"

const rotas = Router()

rotas.post('/usuario', new controlador().create)


rotas.post('/projeto', new controladorProjeto().create)
rotas.get('/projeto', new controladorProjeto().detalhar)

export default rotas