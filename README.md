# MedHelp

Escreva um ou dois  parágrafo resumindo o objetivo do seu projeto.

## Integrantes

*Letícia Rodrigues Blom de Paula, leticiarblom@gmail.com*

*Arthur Capanema Bretas, arthurcbretas@gmail.com*

*Igor Miranda Santos, igormsprofissional@gmail.com*

*Júlia Borges Araújo Silva, juliaborgesfacul@gmail.com*

*Gabriel Vitor de Oliveira Morais, gabrielvitor0309@gmail.com*

## Professor

*Hugo Bastos de Paula*

*Eveline Alonso Veloso*

## Instruções de utilização

Para complementar as instruções de utilização do sistema com as dependências NodeJS, Express, Sequelize e MySQL2, você pode seguir os passos a seguir:

Baixar o repositório:

Faça o download ou clone o repositório do sistema em sua máquina local. Você pode obter o repositório a partir de um servidor de controle de versão, como o Git.
Instalar o Node.js:

Verifique se o Node.js está instalado em sua máquina. Caso não esteja, faça o download e instale-o a partir do site oficial do Node.js (https://nodejs.org). Siga as instruções específicas para o seu sistema operacional.
Instalar as dependências:

Abra o terminal ou prompt de comando e navegue até o diretório raiz do projeto (onde o arquivo package.json está localizado).
Execute o comando npm install para instalar todas as dependências listadas no arquivo package.json. Isso incluirá as dependências do Express, Sequelize e MySQL2.
Configurar o banco de dados:

Certifique-se de ter um banco de dados MySQL configurado e atualizado disponível. Você pode criar um novo banco de dados ou usar um existente.
Abra o arquivo de configuração do Sequelize (normalmente chamado de config.js ou config.json) e atualize as informações de conexão com o banco de dados, como nome do host, porta, nome de usuário, senha e nome do banco de dados.
Executar as migrações do banco de dados:

No terminal, execute o comando npx sequelize-cli db:migrate. Isso irá aplicar as migrações definidas na pasta migrations, criando as tabelas e estruturas necessárias no banco de dados.
Executar a aplicação:

No terminal, execute o comando node app.js ou npm start. Isso iniciará a aplicação e ela estará pronta para ser usada.
Verifique se a aplicação está sendo executada corretamente sem erros.
Após seguir esses passos, o sistema estará instalado e pronto para uso. Certifique-se de fornecer informações adicionais específicas sobre o sistema, como portas de acesso, URLs ou outros detalhes relevantes para que os usuários possam interagir adequadamente com o sistema.

## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentacoes. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócios.

