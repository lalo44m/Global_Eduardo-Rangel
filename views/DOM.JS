const IOT = require("../models/temperatura_humedad.js");
IOT.find({_id:"6274f2e1cdde31b4eef54086"},(err, result)=>{
     if (err) {
       console.log("!");
     }else{
      let p = document.createElement("p");
      let pTexto = document.createTextNode(result[0].Humedad);
      p.appendChild(pTexto);
      document.body.appendChild(p);
     }
     
});