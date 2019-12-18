# gympoint
Monorepo da aplicação GymPoint

## executando o backend
- É necessário ter instâncias rodando do mongodb, postgres e redis. Abaixo seguem os comandos docker que criam e executam os containers necessários para se ter as instâncias em funcionamento (por favor instalar o [docker](https://docs.docker.com/install/) em sua máquina):
    - docker run --name postgres-database-dev -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
    - docker run --name mongo-database-dev -p 27017:27017 -d -t mongo
    - docker run --name redis-database-dev -p 6379:6379 -d -t redis:alpine
- É necessário configurar o arquivo `.env.example` do diretório raiz do backend (basicamente já vem configurado para as instâncias supracitadas) e então renomear o arquivo para `.env`para que o sistema o utilize (para email foi utilizada conta do mailtrap.io e configurada uma caixa de entrada para receber os emails)
- Não se esqueça de acessar o banco de dados postgres via aplicação de sua preferência (user: postgres  pass: postgres) e criar a base de dados chamada gympoint (conform arquivo .env, se alterar, crie de acordo)
- É necessário executar o comando `yarn sequelize db:migrate` no diretório raiz do backend para executar as migrações da base de dados
- É necessário executar o comando `yarn sequelize db:seed:all` no diretório raiz do backend para criar um usuário admin para acessar a aplicação( user: admin@gympoint.com / pass: 123456)
- No diretório raiz do backend, executar `yarn` para resolver os node packages e então `yarn dev` para inicializaar a aplicação (em uma nova janela do terminal, no diretório raiz do backend, execute também `yarn queue` para iniciar o processo de filas para emails)


## executando o frontend

- É necessário ter o backend rodando antes de iniciar o frontend
- No diretório raiz do frontend, execute `yarn` para resolver os node packages e então `yarn start` para inicializar a aplicação em [gympoint-localhost](http://localhost:3000/)


## executando o mobile

- É necessário ter o backend rodando antes de iniciar o mobile
- No diretório raiz do mobile, execute `yarn` para resolver os node packages e então `yarn react-native run-ios` para iniciar a aplicação no IOS ou `yarn react-native run-android ` para iniciar a aplicação no Android. Favor realizar os testes no IOS (foi testado no Android também, porém a execução e fluidez é mais simples no IOS, pois por exemplo no Android existe a necessidade de redirecionamento de portas e afins, o que depende de cada ambiente).
