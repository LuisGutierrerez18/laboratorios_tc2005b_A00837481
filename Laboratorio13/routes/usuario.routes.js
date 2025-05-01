const express = require("express");
const path = require("path"); //Vienen con NodeJS no necesario instalar
const fs = require("fs"); //Vienen con NodeJS no necesario instalar
const router = express.Router();
const controller = require("../controllers/usuarios.controllers");

router.get("/test", controller.test_json);
router.get("/obtener_usuarios", controller.index);

module.exports = router;
