import { Tarefa } from "@prisma/client"
import TUsuario from "./TUsuario"
import TTarefa from "./Ttarefa"
import TComentario from "./Tcomentario"

type TProjeto = {
    id: number
    nome: string
    descricao: string
    dataCriacao: Date
    liderProjeto: TUsuario
    tarefa: TTarefa[]
    comentario: TComentario[]
}


export default TProjeto
