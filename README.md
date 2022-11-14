# Duosy

## 📷 Screenshot

<p align="center">
  <img src="/.github/duosy_screenshot_desktop.png" alt="cover" />
</p>

## 💻 Projeto
O Duosy é uma aplicação de publicação de anúncios para encontrar jogadores que combinem com suas preferências.

## 🚀 Como executar
Clone o projeto
```
git clone https://github.com/jhonathanalencar/duosy.git
```
Entre na pasta do servidor
```
cd server
```
Instale as dependências
```
npm install
```
Adicone as variáveis de ambiente em um arquivo .env na pasta server
```
DATABASE_URL=
CLIENT_SECRET=
AUTHORIZATION_SERVER_TOKEN_URL=
APP_URL=
```
Execute o servidor
```
npm run dev
```
Se tudo estiver correto, é possível acessar o server em http://localhost:3333

Instale as dependências da aplicação web
```
cd ..
cd web
npm install
```
Adicone as variáveis de ambiente em um arquivo .env na pasta web
```
VITE_TWITCH_APP_TOKEN=
VITE_TWITCH_CLIENT_ID=
VITE_TWITCH_CLIENT_SECRET=
VITE_APP_URL=
VITE_SERVER_URL=
```
Execute o aplicação
```
npm run dev
```
Se tudo estiver correto, é possível acessar a aplicação em http://localhost:5173

## 🧪 Tecnologias utilizadas
- [React](https://reactjs.org)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)

## 📝 Licença
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
