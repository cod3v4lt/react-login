# React Auth App

Uma aplicação moderna de autenticação construída com React, PostgreSQL e Bootstrap.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18, React Router, Bootstrap 5, React Icons
- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Estilização**: Bootstrap 5 + CSS customizado

## 📁 Estrutura do Projeto

```
react-auth-app/
├── frontend/                 # Aplicação React (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .gitignore
│   ├── .env                  # Variáveis de ambiente
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── ENV_SETUP.md
├── backend/                  # API Node.js
│   ├── index.js
│   ├── package.json
│   ├── .gitignore
│   ├── .env                  # Variáveis de ambiente
│   ├── config/
│   │   └── database.js
│   └── ENV_SETUP.md
├── package.json             # Scripts principais
├── .gitignore              # Git ignore global
└── README.md
```

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd react-auth-app
   ```

2. **Instale todas as dependências**
   ```bash
   npm run install-all
   ```

3. **Configure o banco de dados PostgreSQL**
   - Crie um banco de dados chamado `react_auth_db`
   - Configure as credenciais no arquivo `.env` do backend

4. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=react_auth_db
   DB_PASSWORD=sua_senha_do_postgres
   DB_PORT=5432
   JWT_SECRET=sua_chave_secreta_jwt
   PORT=5000
   ```

## 🚀 Como Executar

### Desenvolvimento (Recomendado)
Para executar tanto o frontend quanto o backend simultaneamente:
```bash
npm run dev
```

### Executar separadamente

**Backend (API)**
```bash
npm run backend
# ou
cd backend && npm run dev
```

**Frontend (React)**
```bash
npm run frontend
# ou
cd frontend && npm start
```

### Produção
```bash
npm run build  # Build do frontend
npm start      # Inicia o backend
```

## 🔧 Funcionalidades

- ✅ **Registro de usuários** com validação
- ✅ **Login** com autenticação JWT
- ✅ **Interface responsiva** com Bootstrap
- ✅ **Proteção de rotas** baseada em autenticação
- ✅ **Criptografia de senhas** com bcrypt
- ✅ **Validação de formulários** no frontend e backend
- ✅ **Design moderno** com ícones e gradientes

## 🎨 Interface

A aplicação possui uma interface moderna e responsiva com:
- **Página Home**: Apresentação da aplicação com recursos destacados
- **Formulário de Login**: Autenticação de usuários existentes
- **Formulário de Registro**: Criação de novas contas
- **Navbar**: Navegação com status de autenticação
- **Design responsivo**: Funciona em desktop, tablet e mobile

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- Tokens JWT para autenticação
- Validação de dados no frontend e backend
- Proteção contra ataques comuns

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🌐 URLs da Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Endpoints da API**:
  - `POST /api/register` - Registro de usuário
  - `POST /api/login` - Login de usuário
  - `GET /api/verify` - Verificação de token

## 🚀 Deploy

Para fazer deploy da aplicação:

1. **Build do frontend**:
   ```bash
   npm run build
   ```

2. **Configure o servidor de produção** com as variáveis de ambiente adequadas

3. **Configure o banco de dados PostgreSQL** no ambiente de produção

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, por favor abra uma issue no repositório.