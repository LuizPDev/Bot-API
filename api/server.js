const jsonServer = require('json-server')
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

const server = jsonServer.create()

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

const secretKey = 'sua_chave_secreta';

// Rota de autenticação
app.post('/login', (req, res) => {
  // Verifique as credenciais do usuário
  // Se as credenciais estiverem corretas, gere um token JWT
  const payload = { user_id: 123, username: 'exampleuser' };
  const token = jwt.sign(payload, secretKey);
  res.json({ token });
});

// Rota protegida que requer autenticação
app.get('/protegido', (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secretKey);
    // Token válido, continue o processamento
    res.json({ mensagem: 'Rota protegida' });
  } catch (error) {
    // Token inválido, retorne um erro
    res.status(401).json({ mensagem: 'Token inválido' });
  }
});

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});

const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

module.exports = server
