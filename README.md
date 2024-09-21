# API DE GESTÃO DE TAREFAS COLABORATIVAS

## Essa API gerencia um sistema de tarefas colaborativas onde equipes podem criar, atribuir, e acompanhar o progresso de tarefas em projetos. Ideal para gerenciamento de equipes em ambientes de trabalho remoto ou para projetos de software open-source.


## Entidades e Funcionalidade

1. Usuário:

 - Campos: id, nome, email, senha, cargo, foto de perfil
 - Funcionalidade:
   - Registro de novos usuários
   - Login com autemticação JWT
   - Recuperação de senha

2. Projeto:

 - Campos: id, nome, descrição, data_criação, líder_projeto(relacionamento com Usuário)
 - Funcionalidade:
   - Criação de novos projetos
   - listagem de todos os projetos de um usuário
   - Atribuição de um líder para o projeto
   - Edição e exclusão de projetos

3. Tarefa: 
 
 - Campos: id, título, descrição, status (A FAZER, EM PROGRESSO, CONCLUÍDO), prioridade, data_entrega, responsável (relacionamento com Usuário), projeto (relacionamento com projeto)
 - Funcionalidade:
   - Criação de tarefas dentro de um projeto
   - Atualização do status da tarefa 
   - Atribuição de um responsável para a tarefa
   - Edição e exclusão de tarefas
   - Filtragem de tarefas por status, responsável e prioridade

4. Comentários: id, texto, data_criação, autor (relacionamento com Usuário), tarefa (relacionamento com Tarefa)
 
 - Funcionalidade:
   - Adicionar comentários a uma tarefa
   - Listar comentários de uma tarefa
   - Editar e excluir comentários

5. Autenticação e Autorização:

 - Implementação de middleware para garantir que apenas  membros de um projeto possam gerenciar tarefas dentro  daquele projeto
 - Autorização baseada em cargo (por exemplo, apenas o  líder pode deletar projetos)
 6. Notificações:

- Notificar os responsáveis por novas tarefas ou quando uma tarefa for atualizada (exemplo: e-mail ou integração com serviços de mensagens)


#### ⚠️ Essa API demonstra habilidades em modelagem de dados, autenticação com JWT, gerenciamento de relacionamentos entre entidades, e controle de permissões e autorizações, além de uma potencial integração com serviços de notificação ou WebSockets para atualizações em tempo real.
