# Ionic - Exercício 3 - listas

## Configuração e avaliação

Dependências:

Este repositório foi testado com o Node.js 7.2.1 e o Ionic 4.3.1 (use o comando `npm install -g ionic@4.3.1` para instalar)

Configuração:

- Clone o repositório do projeto
- Abra o terminal no diretório do projeto
- Rode o comando `npm install` para instalar as dependências

Avaliação:

- Rode o comando `ionic serve` para rodar a aplicação
- Rode o comando `npm run e2e` para rodar os testes
- O resultado dos testes aparece no terminal

## Especificação

O exercício consiste no desenvolvimento de um aplicativo para gerenciar uma lista de tarefas. Cada tarefa possui uma **descrição** e uma **prioridade** entre 1 e 10 (número inteiro), de forma que, quanto menor o número, mais prioritária é a tarefa. Não pode haver duas tarefas com a mesma descrição. A lista de tarefas é ordenada por prioridade, da mais prioritária para a menos prioritária; no caso de tarefas com prioridade igual, usa-se a ordem de inserção (tarefas adicionadas mais recentemente aparecem no final).

A interface gráfica está ilustrada na imagem `screenshot.png` nesta pasta. O botão `Adicionar` insere uma tarefa na lista, com os dados digitados pelo usuário (se os dados forem válidos). Se (e somente se) a inserção for bem sucedida, os campos de texto devem ser zerados (i.e., seu conteúdo deve ficar vazio). O botão `Remover 1º` remove o primeiro item da lista. Sempre que a lista estiver vazia, o botão deve estar desativado. Clicar em um item também resulta na sua remoção.

Mensagens: (use a classe `ToastController`)

- Ao tentar inserir uma tarefa com a mesma descrição de uma tarefa da lista, o aplicativo deve exibir um `Toast` com o texto "Tarefa já cadastrada."
- Ao tentar inserir uma tarefa com prioridade inválida, o aplicativo deve exibir uma notificação com o texto "A prioridade deve estar entre 1 e 10.".

Os elementos da página devem ter os seguintes identificadores:

- `listView` - lista de itens
- `editDescricao` - campo de texto para digitar a descrição
- `editPrioridade` - campo de text para digitar a prioridade
- `buttonAdicionar` - botão para adicionar a tarefa à lista
- `buttonRemover` - botão para remover o 1º elemento da lista
