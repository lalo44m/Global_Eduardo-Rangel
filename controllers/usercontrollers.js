const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.verificar=((req, res)=>{
    const data = req.body;
    User.find({Usuario:data.Usuario},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error");  
        } else  if(result[0]){
                bcrypt.compare(data.Password, result[0].Password, (err, coinciden)=>{
                    if (coinciden && data.Usuario == result[0].Usuario) {
                        req.session.usuario = result[0].Usuario;
                        res.redirect("/home");
                    } else {
                        let data = {
                            message: 'Usuario o contraseña incorrecto',
                        }
                        res.render('login', {data:'Usuario o contraseña incorrecto'});
                    }
                })
        }else{
            let data = {
                message: 'Usuario No Existe',
            }
            res.render('login', {data:'Usuario No Existe'});
        }
    });
});

exports.crear_usuario=((req, res)=>{
    const data = req.body;
    let user = new User({
        Usuario:data.Usuario,
        Email:data.Email,
        Password:data.Password,
    });

    user.save((err, result)=>{
        if (err) {
            console.log("A ocurrido un error",err.message);  
        } else {
            res.redirect("/");
        }
    });
});

exports.user_logout = function(req, res) {
    req.session.destroy();

    res.render('login', {data:null});   

};

