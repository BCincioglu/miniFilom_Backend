// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User.js');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Kullanıcıyı veritabanında kontrol edin
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
    // Girilen şifreyi hashlenmiş kullanıcı şifresiyle karşılaştır
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
    // JWT oluştur
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Kullanıcı adının veritabanında mevcut olup olmadığını kontrol edin
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu kullanıcı adı zaten kullanımda' });
    }
    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);
    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      password: hashedPassword
    });
    await newUser.save();
    res.status(200).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};