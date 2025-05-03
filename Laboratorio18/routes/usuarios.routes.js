const express = require('express');
const router = express.Router();
const controller = require("../controllers/usuarios.controller.js");

//Seguridad de ruteo
const isAuth = require("../utils/is-auth");
const isAuth = require('../is-auth.js');



router.get('/test_json', isAuth ,(req, res)=>{
    res.status(200).json({code: 200, msg:"Ok"});
});
router.get('/login', controller.render_login);
router.post('/login', controller.do_login);

router.get('/registro', controller.get_registro);
router.post('/registro', controller.post_reguistro);

router.get('/protegido', isAuth, (req, res) => {
    res.status(200).json({code: 200, msg:"Ok"});
});


module.exports = router;