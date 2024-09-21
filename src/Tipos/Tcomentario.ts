import TUsuario from "./TUsuario"

type TComentario = {
    id: number
    texto: string
    dataCriacao: Date
    autor: TUsuario
}

export default TComentario