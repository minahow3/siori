const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // 必須フィールドのバリデーション
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // データベースに新しいコンタクトを保存
    const newContact = await prisma.contact.create({
      data: { name, email, message },
    });
    res.status(201).json({ message: 'Contact saved successfully', newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

module.exports = router;
