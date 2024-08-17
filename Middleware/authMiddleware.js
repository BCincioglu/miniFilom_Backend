// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Erişim reddedildi: Yetkilendirme tokeni bulunamadı' });
  }

  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Erişim reddedildi: Geçersiz yetkilendirme tokeni' });
    }
    console.log(decodedToken);
    req.user = decodedToken; // decodedToken içinde kullanıcı bilgileri varsa, bu bilgileri request nesnesine ekleyebilirsiniz
    console.log(req.user.id); // bu user id
    next();
  });
};
