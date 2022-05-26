var express = require('express');
var router = express.Router();
const controller = require("../controllers/usercontrollers");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{data:null});
});

router.get('/newuser', function(req, res, next) {
  res.render('registre');
});

router.get('/home', function(req, res, next) {
  res.render('index',{usuario:req.session.usuario});
});

router.post("/nuevousuario", controller.crear_usuario)

router.post('/entrar', controller.verificar);

router.get('/cerrar', controller.user_logout)

module.exports = router;
