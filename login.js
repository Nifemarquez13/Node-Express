const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

const users = [
  {
    email: "edwin@adaschool.com",
    paswword: "123edwin",
    name: "edwin",
    rol: "user",
  },
  {
    email: "alonso@adaschool.com",
    password: "alonso123",
    name: "alonso",
    rol: "user",
  },
  {
    email: "ana@adaschool.com",
    password: "ana123",
    name: "ana",
    rol: "admin",
  },
  {
    email: "marisol@adaschool.com",
    password: "marisol123",
    name: "marisol",
    rol: "admin",
  },
  {
    email: "angelica@adaschool.com",
    password: "angelica123",
    name: "angelica",
    rol: "invitado",
  },
];

function JWTValidation(req, res, next) {
  const tokenHeader = req.headers.authorization;

  jwt.verify(tokenHeader, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ err });
    }
    const { rol } = decoded;
    req.headers = { ...req.headers, rol };
    next();
  });
}

router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user)
    return res.status(401).json({ error: "Usuario o contraseña invalida" });
  const token = jwt.sign(user, process.env.SECRET_KEY, { algorithm: "HS256" });
  res.json({ token });
});

router.get("/profile", JWTValidation, (req, res) => {
  const { rol } = req.headers;
  if (rol === "admin") {
    res.send("Bienvenido Administrador");
  } else if (rol === "user") {
    res.send("Bienvenido Usuario");
  } else {
    res.send("Bienvenido Invitado");
  }
  res.status(403).json({ error: "Acceso no permitido" });
});

module.exports = router;
