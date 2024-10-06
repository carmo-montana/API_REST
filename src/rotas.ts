import { Router } from "express"
import controlador from "./controllUsuario/usuarios"
import controladorProjeto from "./controllProjeto/projeto"
import autenticacaoLogin from "./controllUsuario/login"
import { validarToken } from "./midlleware/autenticacao"
import Multer from "./multer"
import controladorTarefas from "./controllTarefas/tarefas"
import controladorComentarios from "./controllComentarios/comentarios"
import autenticacaolider from "./midlleware/autentProjeto"




const rotas = Router()

rotas.post('/usuario', Multer.single('fotoPerfil'), new controlador().create)
rotas.post('/login', new autenticacaoLogin().login)
rotas.get('/recuperar', new autenticacaoLogin().solicitarRecuperacaoSenha)
rotas.patch('/reset-senha/:resetToken', new autenticacaoLogin().redefinirSenha)

rotas.use(validarToken)


rotas.post('/projetos', new controladorProjeto().create)
rotas.get('/projetos/:id', new controladorProjeto().detalhar)
rotas.post('/projetos/:projetoId/atribuir-lider', new controladorProjeto().lider)
rotas.delete('/deletar/:id', new controladorProjeto().deletar)


rotas.post('/tarefas', new controladorTarefas().create)
rotas.put('/tarefas',)
rotas.patch('/tarefas/:id/status', new controladorTarefas().atualizarStatusTarefa)
rotas.patch('/tarefas/:id/atribuir-responsavel', new controladorTarefas().atribuirResponsavelTarefa)
rotas.patch('/tarefas/:id', new controladorTarefas().editarTarefa)
rotas.delete('/tarefas/:id', new controladorTarefas().deletar)
rotas.get('/tarefas', new controladorTarefas().filtrarTarefas)


rotas.post('/comentarios', new controladorComentarios().create)
rotas.get('/tarefas/:id/comentarios', new controladorComentarios().listarComentarios)
rotas.patch('/comentarios/:id', new controladorComentarios().editarComentarios)
rotas.delete('/comentarios/:id', new controladorComentarios().deletar)


rotas.use(new autenticacaolider().ProjetCargo)

export default rotas