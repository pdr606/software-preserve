# Projeto de Otimização de Processos

Este projeto foi desenvolvido com a ideia de solucionar problemas e otimizar os processos da empresa onde trabalho. Ao identificar um desafio recorrente que afetava a eficiência e produtividade, decidi criar um software para solucioná-lo.

## Tecnologias Utilizadas
- React
- Node
- MongoDB
- Autenticação com JWT
- EJS
- Vite (gerenciador de pacotes npm)

## Capturas de Tela

### Tela de Login
![Tela de Login](https://dmanisio.sirv.com/Images/tela-de-login.png)

Após realizar o login, o usuário é direcionado para a página inicial, que apresenta um menu de fácil acesso para buscar tarefas e funcionalidades.

### Tela de Home
![Tela de Home](https://dmanisio.sirv.com/Images/menu-do-sistema.png)

Na opção de cronograma, semelhante a uma lista de tarefas, o administrador pode cadastrar avisos, lembretes e novos treinamentos diretamente no banco de dados. Além disso, os cartões são totalmente editáveis, permitindo correções e atualizações de informações.

### Tela de Cronograma
![Tela de Cronograma](https://dmanisio.sirv.com/Images/tela-de-cronograma.png)

Todo treinamento requer materiais, sejam eles teóricos ou práticos. Nessa tela, o usuário pode selecionar o treinamento vigente, preencher um formulário e enviar os dados para o banco de dados. Essa funcionalidade é extremamente útil para o controle dos materiais utilizados, além de servir como confirmação de recebimento.

### Tela de Checklist
![Tela de Checklist](https://dmanisio.sirv.com/Images/tela-do-checklist.png)
![Exemplo do Card](https://dmanisio.sirv.com/Images/card-do-checklist.png)

Um treinamento não está completo sem um orçamento para o cliente. Nessa tela, o usuário pode selecionar o treinamento e ajustar os valores conforme necessário, gerando um PDF.

### Tela de Orçamento
![Tela de Orçamento](https://dmanisio.sirv.com/Images/tela-or%C3%A7amento.png)

A grande inovação é a funcionalidade que permite gerar certificados. Anteriormente, a tarefa de criar certificados manualmente era demorada e trabalhosa. Agora, o usuário pode importar uma planilha do Excel com os dados dos alunos já preenchidos. Ao importar a planilha, é possível selecionar o curso e o instrutor. Caso o instrutor não esteja cadastrado, é possível adicioná-lo no próprio card ao lado. Após a configuração, basta clicar em "Gerar". O backend processa a solicitação e retorna os certificados prontos em formato PDF para download. Todos os certificados gerados possuem um ID único para validação, evitando falsificações.

### Tela de Certificado
![Tela de Certificado](https://dmanisio.sirv.com/Images/tela-certificado.png)
![Exemplo de Certificado](https://dmanisio.sirv.com/Images/certificado-pronto-pdf.png)

## Desenvolvido por
Pedro Guarnieri.
