
const jwt = require("jsonwebtoken");
const secretKey = 'your_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated!");


  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload.id;
    next()
  });
};

module.exports=verifyToken;
