const WebSocket = require('ws');
const WS_URL = 'ws:///192.168.1.74:8888';
const ws = new WebSocket(WS_URL);





// El modulo mqtt nos permite crear un cliente ya sea un publicador o un subscritor
const IOT = require("./models/temperatura_humedad");
const mqtt = require('mqtt');


// el cliente (subscritor) se conecta al servidor broker
// no se utiliza http si no mqtt 
const sub = mqtt.connect('mqtt://localhost:9001');



sub.on("connect",()=>{
    // el sub se inscribe a la plubicacion con titulo: "topic test"
    sub.subscribe('Topic test');
});
// el evento message recibe todos los datos enviados del publicador
// este recibe tanto el titulo como el mensaje de la publicacion 
sub.on("message",(topic,mensaje)=>{
    // imprimimos los datos entregados 
   // console.log(mensaje.toString());
    str = mensaje.toString();
    const iniciohum = str.indexOf(":");
    const finhum = str.indexOf("%");
    humedad = Number.parseFloat(str.substr(iniciohum+2,finhum-iniciohum-2)).toFixed(2);


    const iniciotem = str.indexOf("ra:");
    const fintem = str.indexOf("*C");
    temperaturaC = Number.parseFloat(str.substr(iniciotem+4,fintem-iniciotem-4)).toFixed(2);


    const iniciotemf = str.indexOf("*C");
    const fintemf = str.indexOf("*F");
    temperaturaf = Number.parseFloat(str.substr(iniciotemf+3,fintemf-iniciotemf-3)).toFixed(2);

    const iniciocalor = str.indexOf("r:");
    indice_calorc = Number.parseFloat(str.substr(iniciocalor+3,iniciocalor-iniciocalor+5)).toFixed(2); 


    IOT.updateOne({_id:"6274f2e1cdde31b4eef54086"},{$set:{
        Humedad:humedad,
        TemperaturaC:temperaturaC,
        TemperaturaF:temperaturaf,
        Indice_calor:indice_calorc,
    }},(err, result)=>{
        if (err) {
            console.log("A ocurrido un error ",err.message);
        } else {
               ws.send(str.toString());

            console.log("datos insertados");
        }
    });
});
