const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェアの設定
app.use(cors());
app.use(bodyParser.json());

// ルートの登録
app.use('/api/contact', contactRoutes);

// / パスへのレスポンスを追加
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.get('/api/contact/:id', async (req, res) => {
    const { id } = req.params;
    // Prismaでデータを取得するコード例
    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
    });
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  });

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
