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
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── DashboardSidebar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Páginas da aplicação
│   │   │   ├── dashboard/    # Páginas protegidas do dashboard
│   │   │   │   ├── DashboardHome.jsx
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   └── Users.jsx
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
│   ├── models/
│   │   └── User.js
│   ├── migrations/           # Scripts de migração do banco de dados
│   │   ├── add-username-column.sql
│   │   ├── add-roles-column.sql
│   │   ├── run-migration.js
│   │   └── run-roles-migration.js
│   ├── init-db.js            # Script de inicialização do banco de dados
│   └── ENV_SETUP.md
├── package.json             # Scripts principais
├── ecosystem.config.js      # Configuração do PM2
├── nginx.conf               # Configuração do Nginx
├── deploy.sh                # Script de deployment
├── health-check.sh          # Script de verificação de saúde
├── backup-db.sh             # Script de backup do banco de dados
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
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=seu_usuario_postgres
   POSTGRES_PASSWORD=sua_senha_do_postgres
   POSTGRES_NAME=react_auth_db
   JWT_SECRET=sua_chave_secreta_jwt
   PORT=5004
   ```

   E na pasta `frontend/`, crie um arquivo `.env`:
   ```env
   VITE_APP_TITLE=React Auth App
   VITE_API_URL=http://localhost:5003
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
cd frontend && npm run dev
```

### Produção
```bash
npm run build  # Build do frontend
npm start      # Inicia o backend
```

## 🔧 Funcionalidades

- ✅ **Registro de usuários** com validação (incluindo campo de nome de usuário)
- ✅ **Login** com autenticação JWT
- ✅ **Interface responsiva** com Bootstrap
- ✅ **Proteção de rotas** baseada em autenticação
- ✅ **Criptografia de senhas** com bcrypt
- ✅ **Validação de formulários** no frontend e backend
- ✅ **Design moderno** com ícones e gradientes
- ✅ **Área administrativa** com gerenciamento de usuários
- ✅ **Controle de acesso baseado em roles** (admin/user)
- ✅ **Dashboard personalizado** para usuários logados

## 🎨 Interface

A aplicação possui uma interface moderna e responsiva com:
- **Página Home**: Apresentação da aplicação com recursos destacados
- **Formulário de Login**: Autenticação de usuários existentes
- **Formulário de Registro**: Criação de novas contas com campo de nome de usuário
- **Navbar**: Navegação com status de autenticação
- **Dashboard**: Área protegida para usuários logados
- **Área administrativa**: Gerenciamento de usuários (apenas para admins)
- **Design responsivo**: Funciona em desktop, tablet e mobile

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- Tokens JWT para autenticação
- Validação de dados no frontend e backend
- Proteção contra ataques comuns
- Controle de acesso baseado em roles
- Proteção de rotas sensíveis

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🌐 URLs da Aplicação

- **Frontend**: http://localhost:3004
- **Backend API**: http://localhost:5004
- **Endpoints da API**:
  - `POST /api/register` - Registro de usuário
  - `POST /api/login` - Login de usuário
  - `GET /api/verify` - Verificação de token
  - `GET /api/users` - Listagem de usuários (apenas admins)
  - `PUT /api/users/:id` - Atualização de usuário (apenas admins)
  - `DELETE /api/users/:id` - Exclusão de usuário (apenas admins)

## 🚀 Deploy com PM2

PM2 é um gerenciador de processos para aplicações Node.js que mantém sua aplicação online.

### Instalação do PM2
```bash
npm install -g pm2
```

### Configuração do PM2 para o Backend

1. **Arquivo de configuração**:
   O projeto já inclui um arquivo `ecosystem.config.js` configurado para o deployment.

2. **Inicie a aplicação com PM2:**
   ```bash
   npm run pm2:start
   ```

3. **Comandos úteis do PM2:**
   ```bash
   npm run pm2:status        # Listar aplicações
   npm run pm2:logs          # Ver logs
   npm run pm2:restart       # Reiniciar a aplicação
   npm run pm2:stop          # Parar a aplicação
   npm run pm2:delete        # Deletar a aplicação
   ```

4. **Configurar PM2 para iniciar automaticamente:**
   ```bash
   pm2 startup           # Gerar comando de inicialização
   pm2 save              # Salvar configuração atual
   ```

## 🌐 Deploy com Nginx

Nginx é um servidor web que pode ser usado como proxy reverso para sua aplicação.

### Instalação do Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

### Configuração do Nginx

1. **Use o arquivo de configuração fornecido:**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/react-auth-app
   ```

2. **Habilite o site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/react-auth-app /etc/nginx/sites-enabled/
   ```

3. **Teste a configuração:**
   ```bash
   sudo nginx -t
   ```

4. **Reinicie o Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

## 🔐 Configuração SSL com Let's Encrypt

Para adicionar HTTPS à sua aplicação:

1. **Instale o Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtenha um certificado SSL:**
   ```bash
   sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
   ```

3. **Configure a renovação automática:**
   ```bash
   sudo crontab -e
   # Adicione esta linha:
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 📦 Scripts de Migração do Banco de Dados

O projeto inclui scripts para migração do banco de dados:

1. **Executar migração inicial (adicionar coluna username):**
   ```bash
   cd backend
   npm run migrate
   ```

2. **Executar migração de roles:**
   ```bash
   cd backend
   npm run migrate:roles
   ```

3. **Inicializar o banco de dados:**
   ```bash
   cd backend
   npm run init-db
   ```

## 🛠️ Scripts de Manutenção

O projeto inclui vários scripts úteis para manutenção:

1. **Deploy da aplicação:**
   ```bash
   ./deploy.sh
   ```

2. **Verificação de saúde:**
   ```bash
   ./health-check.sh
   ```

3. **Backup do banco de dados:**
   ```bash
   ./backup-db.sh
   ```

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