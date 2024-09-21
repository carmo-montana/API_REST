import TUsuario from "./TUsuario"


type TTarefa = {
    id: number
    titulo: string
    descricao: string
    status: "pendente" | "em processo" | "concluída"
    prioridade: "baixa" | "média" | "alta"
    dataEntrega: Date
    responsavel: TUsuario
}

export default TTarefa