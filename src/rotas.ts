import { Router } from "express"
import controlador from "./controlador/usuarios"

const rotas = Router()

rotas.post('/usuario', new controlador().create)

export default rotas