# react-login-v2 — WSL (Debian) + PM2

Resumo curto: instruções para rodar em desenvolvimento o **frontend React (porta 3003)** e a **API Node (porta 5003)** dentro do WSL Debian, gerenciados pelo **PM2**. Inclui instalação, comandos PM2, troubleshooting e um `ecosystem.config.js` de exemplo.

---

## Pré-requisitos

* WSL2 com Debian instalado
* Node.js (LTS) e npm instalados no WSL
* PM2 global: `npm install -g pm2`
* Git (opcional)

---

## Estrutura sugerida (exemplo)

```
/mnt/d/myProjects/projects/js-apps/react-apps/react-login-v2
├─ backend/        # Node API (porta 5003)
└─ frontend/       # React (Vite)  (porta 3003)
```

Ajuste os caminhos abaixo conforme seu ambiente.

---

## Configurações importantes

* **Vite** (`vite.config.js`): expose para 0.0.0.0 para permitir acesso a partir do Windows/host.

```js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3003,
    proxy: {
      '/api': {
        target: 'http://localhost:5003',
        changeOrigin: true
      }
    }
  }
})
```

* **Backend**: quando fizer `app.listen`, prefira `0.0.0.0` (não apenas `localhost`):

```js
app.listen(5003, '0.0.0.0', () => console.log('API na 5003'))
```

## Instalação (rápido)

```bash
# no WSL (Debian) ou na VPS
npm install -g pm2
```
---

## Rodando com PM2 (modo desenvolvimento)

### Opção A — entrando na pasta e iniciando (recomendada)

```bash
# Frontend (entre na pasta frontend antes)
cd /mnt/d/.../react-login-v2/frontend
pm2 start npm --name react-login-v2-frontend -- run dev

# Backend
cd /mnt/d/.../react-login-v2/backend
pm2 start npm --name react-login-v2-backend -- run dev
```

### Opção B — usando --prefix (sem cd)

```bash
pm2 start npm --name react-login-v2-frontend --prefix /mnt/d/.../react-login-v2/frontend -- run dev
pm2 start npm --name react-login-v2-backend  --prefix /mnt/d/.../react-login-v2/backend  -- run dev
```

> Observação: o `--prefix` funciona, mas tome cuidado com scripts que tentem acessar pastas relativas (ex.: um `concurrently` que invoque `frontend`/`backend` a partir de outro cwd pode gerar `ENOENT`).

---

## Deletar / renomear processos (ex.: você criou com nome errado)

Listar processos:

```bash
pm2 list
```

Deletar por nome ou id:

```bash
pm2 delete react-login-v2-frontend
# ou
pm2 delete 0
```

Recriar com o nome correto (exemplo):

```bash
cd /mnt/d/.../react-login-v2/backend
pm2 start npm --name react-login-v2-backend -- run dev
```

---

## Logs e monitoramento

Ver logs em tempo real:

```bash
pm2 logs react-login-v2-backend
pm2 logs react-login-v2-frontend
# ou todos
pm2 logs
```

Monitor interativo:

```bash
pm2 monit
```

Para ver o erro `ENOENT` (ex.: procurando `frontend/backend/package.json`), abra o log com `pm2 logs` e corrija o `cwd`/`prefix` ou o script no `package.json`.

---

## Testes rápidos

* Testar localmente dentro do WSL:

```bash
curl http://localhost:3003
curl http://localhost:5003
```

* Verificar portas em uso (pode precisar de `sudo`):

```bash
ss -ltnp | grep 3003
# ou
sudo netstat -tulpn | grep 3003
```

* Se `localhost:3003` não abrir no Windows, pegue o IP do WSL e tente:

```bash
ip addr show eth0
# supondo inet 172.23.112.1/20
# acesse no Windows: http://172.23.112.1:3003
```

---

## Tornar persistente / startup

Salvar estado atual:

```bash
pm2 save
```

Configurar startup (se seu WSL suportar systemd):

```bash
pm2 startup systemd
# executar o comando que o pm2 retornar (como root)
pm2 save
```

Se o WSL não usar systemd, usar `pm2 resurrect` manualmente ao abrir a sessão é a alternativa.

---

## Exemplo de `ecosystem.config.js` (PM2)

```js
module.exports = {
  apps: [
    {
      name: 'react-login-v2-backend',
      cwd: '/mnt/d/myProjects/projects/js-apps/react-apps/react-login-v2/backend',
      script: 'npm',
      args: 'run dev',
      watch: false
    },
    {
      name: 'react-login-v2-frontend',
      cwd: '/mnt/d/myProjects/projects/js-apps/react-apps/react-login-v2/frontend',
      script: 'npm',
      args: 'run dev',
      watch: false
    }
  ]
}
```

Usar:

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## Deploy (modo produção) — resumo rápido

1. Build do frontend:

```bash
cd frontend
npm run build
# copia os arquivos de build (dist) para /var/www/react-login-v2 ou similar
```

2. Configurar Nginx para servir os arquivos estáticos e proxy /api para a porta 5003:

```nginx
server {
  listen 80;
  server_name exemplo.local;

  root /var/www/react-login-v2; # onde está o build
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:5003/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Recarregar nginx: `sudo systemctl restart nginx` (ou `service nginx restart`).

---

## Problemas comuns e soluções

* **`ENOENT: no such file or directory, open '.../frontend/backend/package.json'`**

  * Causa: script `dev` chama `concurrently` e usa caminhos relativos incorretos ou PM2 foi iniciado a partir de cwd errado.
  * Solução: iniciar PM2 dentro da pasta correta ou usar `cwd`/`--prefix` corretos; preferir scripts separados (um por app).

* **`localhost:3003` não abre no Windows**

  * Verifique `vite.config.js` host: `0.0.0.0` e o `app.listen` do backend com `0.0.0.0`.
  * Tente acessar pelo IP do WSL (ver `ip addr show eth0`).
  * Verifique firewall do Windows.

* **`missing script: dev`**

  * Abra `package.json` e confirme que existe o script `dev`.

---

## Comandos úteis (resumão)

```bash
pm2 list
pm2 logs <name> --lines 200
pm2 delete <name>
pm2 restart <name>
pm2 start npm --name <name> --prefix /caminho run dev
pm2 start ecosystem.config.js
pm2 save
pm2 resurrect
pm2 monit
```


## Adicionando SSL grátis (Let's Encrypt)

1. Instalar Certbot + plugin Nginx:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

2. Gerar certificado:

```bash
sudo certbot --nginx -d exemplo.com -d www.exemplo.com
```

3. Certbot ajusta automaticamente o arquivo de configuração do Nginx, incluindo:

```nginx
server {
  listen 443 ssl;
  server_name exemplo.com www.exemplo.com;

  ssl_certificate /etc/letsencrypt/live/exemplo.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/exemplo.com/privkey.pem;

  root /var/www/react-login-v2;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:5003/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

4. Renovação automática:

```bash
sudo systemctl enable certbot.timer
```

Teste renovação:

```bash
sudo certbot renew --dry-run
```
