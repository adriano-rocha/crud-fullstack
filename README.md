# Sistema de Cadastro de Estudantes

Um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de estudantes universitários, desenvolvido com tecnologias modernas de desenvolvimento web.

## Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para construção de interfaces de usuário
- **HTML5/CSS3** - Estruturação e estilização
- **JavaScript (ES6+)** - Lógica de programação

### Backend
- **Node.js** - Runtime JavaScript server-side
- **Express.js** - Framework web para Node.js
- **Prisma** - ORM (Object-Relational Mapping) para banco de dados

### Banco de Dados
- **MongoDB** - Banco de dados NoSQL orientado a documentos

## Funcionalidades

- ✅ Cadastrar novos estudantes
- ✅ Visualizar lista de estudantes
- ✅ Atualizar informações de estudantes
- ✅ Excluir estudantes
- ✅ Limpar todos os registros

## Estrutura do Projeto

```
crud-fullstack/
├── back/                    # Backend (API)
│   ├── prisma/
│   │   └── schema.prisma    # Schema do banco de dados
│   ├── server.js            # Servidor Express
│   ├── package.json         # Dependências do backend
│   └── .env                 # Variáveis de ambiente
├── front/                   # Frontend (React)
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas da aplicação
│   │   └── services/        # Serviços de API
│   ├── public/              # Arquivos públicos
│   └── package.json         # Dependências do frontend
└── README.md
```

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- MongoDB (local ou MongoDB Atlas)

## Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/adriano-rocha/crud-fullstack.git
cd crud-fullstack
```

### 2. Configuração do Backend

```bash
cd back
npm install
```

Crie um arquivo `.env` na pasta `back/`:
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
```

Execute as migrações do Prisma:
```bash
npx prisma generate
npx prisma db push
```

### 3. Configuração do Frontend

```bash
cd ../front
npm install
```

## Como Executar

### Backend (API)
```bash
cd back
npm run dev
```
O servidor estará rodando em `http://localhost:3020`

### Frontend
```bash
cd front
npm start
```
A aplicação estará disponível em `http://localhost:3000`

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/students` | Listar todos os estudantes |
| POST | `/students` | Cadastrar novo estudante |
| PUT | `/students/:id` | Atualizar estudante |
| DELETE | `/students/:id` | Excluir estudante |
| DELETE | `/students/clean` | Limpar todos os estudantes |

### Exemplo de Payload (POST/PUT)
```json
{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "sr": "123456",
  "course": "Engenharia de Software"
}
```

## Deploy

### Backend (Render.com)
1. Conecte o repositório ao Render
2. Configure as variáveis de ambiente:
   - `DATABASE_URL`: String de conexão do MongoDB
3. Defina os comandos:
   - Build Command: `npm install`
   - Start Command: `npm start`

### Frontend (Netlify/Vercel)
1. Conecte o repositório
2. Configure o diretório de build: `front/build`
3. Comando de build: `npm run build`

## Modelo de Dados

### Student (Estudante)
```prisma
model Student {
  id     String @id @default(auto()) @map("_id") @db.ObjectId
  name   String
  email  String @unique
  sr     Int
  course String
}
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Demo

Aplicação em produção: [https://crud-fullstack-ivory.vercel.app/](https://crud-fullstack-ivory.vercel.app/)

## Contato

Adriano Rocha - [GitHub](https://github.com/adriano-rocha)

Link do Projeto: [https://github.com/adriano-rocha/crud-fullstack](https://github.com/adriano-rocha/crud-fullstack)
