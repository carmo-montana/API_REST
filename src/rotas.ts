import { Router } from "express"
import controlador from "./controlador/usuarios"

const rotas = Router()

rotas.get('/', new controlador().create)

export default rotas