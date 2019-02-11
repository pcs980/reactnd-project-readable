# Visão geral do projeto

Para o projeto Leitura, construiremos um aplicativo web de conteúdo e comentários. Seu aplicativo permitirá que os usuários postem conteúdo em categorias pré-definidas, façam comentários em suas próprias postagens e nas de outros usuários e votem nas postagens e comentários. Os usuários poderão editar e excluir postagens e comentários.

## Por que este projeto?

Esta estrutura de conteúdo e comentários é comum em um grande número de sites, desde sites de notícias até blogs, passando por agregadores, como o Hacker News e o Reddit. Construindo este projeto, você compreenderá como o Redux pode funcionar em um tipo muito comum de aplicativo.

## Especificação

Você terá acesso a um servidor de desenvolvimento local. O servidor é construído em Node, mas é muito simples. Você não precisa editar o código do servidor; em vez disso, o seu código irá conversar com o servidor usando endpoints da API documentada. Você pode usar os endpoints do servidor para gerenciar o armazenamento, leitura, atualização e exclusão de dados de seu aplicativo.

Usando este servidor, você deverá criar um aplicativo front-end de React/Redux. As especificações fornecidas abaixo são o mínimo exigido para este projeto. Porém, fique à vontade de adicionar novos recursos e tecnologia ao projeto.

## Dados

Há três tipos de objetos armazenados no servidor:

* Categories
* Posts
* Comments

### Categories

O servidor suporta um número pequeno e fixo de categorias que os usuários podem postar baseando-se. As categories são objetos simples contendo um nome um um caminho de URL (normalmente a mesma string). O servidor não possui métodos para criar/modificar/deletar essas categorias. Se você deseja adicionar categorias para o seu app, simplesmente adicione o objeto desejado à Array em categories.js no servidor fornecido.

### Posts

As postagem são os blocos de construção de seu aplicativo. Elas incluem:

| Atributo  | Tipo    | Descrição           |
|-----------|---------|---------------------|
| id        | String  | Identificador único |
| timestamp | Integer | Data de criação - dados default rastreiam isto em Unix time. Você pode usar Date.now() para obter este número     |
| title     | String  | Título do post      |
| body      | String  | Corpo do post       |
| author    | String  | Autor do post       |
| category  | String  | Deve ser uma das categorias fornecidas pelo servidor |
| voteScore | Integer | Votos líquidos que a postagem recebeu (default: 1) |
| deleted   | Boolean | Marcado se o post foi 'deletado' (sem acesso no front end), (default: false) |

### Comments

Os comentários são anexados às postagens mães. Eles incluem:

| Atributo  | Tipo     | Descrição           |
|-----------|----------|---------------------|
| id        | String   | Identificador único |
| parentId  | String   | id do post pai      |
| timestamp | Integer  | Data de criação - dados default rastreiam isto em Unix time. Você pode usar Date.now() para obter este número |
| body      | String   | Corpo do comentário |
| author    | String   | Autor do comentário |
| voteScore | Integer  | Votos líquidos que a postagem recebeu (default: 1) |
| deleted   | Boolean  | Marcado se o post foi 'deletado' (sem acesso no front end), (default: false) |
| parentDeleted | Boolean | Marcado quando o post pai foi deletado, mas o comentário em si não foi. |

> Este aplicativo é anônimo, sem autenticação ou autorização. Não há nenhum objeto user, e comentários e postagens aceitam qualquer nome de usuário/nome para criação e edição.
> O servidor é muito leve. Ele executa zero validações de dados para impor os tipos de dados acima. Certifique-se de que você está usando os tipos corretos quando enviar requisições ao servidor.

## Views

Seu aplicativo deve ter, no mínimo, quatro views:

* Padrão (Root)
  * deve listar todas as categorias disponíveis, que devem se conectar a uma view de categoria para esta categoria
  * deve listar todas as postagens ordenadas pelo `voteScore` (começando pela pontuação mais alta)
  * deve ter um controle para modificar o método de ordenação da lista, incluindo, no mínimo, ordenar por `voteScore` ou ordenar por data de criação
  * deve ter um controle para adicionar novas postagens
* View de Categoria
  * idêntica à view padrão, mas filtrada para incluir somente postagens com a categoria selecionada
* View de Detalhe da Postagem
  * deve mostrar os detalhes da postagem, incluindo: título, corpo, autor, data de criação em formato legível pelo usuário e pontuação dos votos
  * deve listar todos os comentários daquela postagem, ordenados por `voteScore` (começando pelo mais alto)
  * deve ter controles para editar ou remover a postagem
  * deve ter um controle para adicionar um novo comentário
  * implemente o formulário de comentários da forma que quiser (em linha, modal, etc.)
  * os comentários também devem ter controles para edição ou exclusão
* Criar/Editar a View
  * deve ter um formulário para criar novas postagens ou editar as existentes
  * ao editar, os dados existentes devem ser povoados no formulário

> UI de Comentários/Postagens
> Postagens e comentários, em todas as views onde são exibidos, devem exibir a pontuação atual e ter controles para incrementar ou diminuir o `voteScore` do objeto. As postagens devem exibir o número de comentários associados a elas.

## Requisitos específicos

**Use React para construir a UI de seu aplicativo**. Lembre que a composição é chave. Dificilmente é um erro dividir um componente em pedaços menores. Busques oportunidades para reutilizar seus componentes. Recomendamos usar o `create-react-app` para melhorar seu projeto, mas isso não e uma exigência.

Mesmo que o foco (e especificações) desse projeto esteja baseado em funcionalidades, ao invés de estilo/design, por favor, garanta que o seu app é apresentável e fácil de se navegar.

**Use Redux para gerenciar o estado de seu aplicativo**. Isso inclui todas as ações do usuário e respostas do servidor da API. Você pode usar um estado de componente para lidar com campos de entrada de formulários e componentes controlados. Caso contrário, o resto do estado da sua aplicação deve ser controlados com os seus reducers.
