// El modulo mqtt nos permite crear un cliente ya sea un publicador o un subscritor
const mqtt = require('mqtt');
// para poder leer los datos via serial enviados del arduino (mandados desde el sensor),
// debemos instalar el modulo: serialport
const serialport = require('serialport');


const pub = mqtt.connect('mqtt://localhost:9001');
// para definir el puerto donde leremos los datos del arduino, se necesita 
// instanciar un serialport, con el puerto conectado al arduino y un objecto,
// especificando la taza de envio de datos por serial 
const port = new serialport("COM12",{
    baudRate:9600
});

// var funcion12 = setInterval(function enviarMensaje() {
//     console.log(new Date().toLocaleTimeString());
//         console.log("Mandando mensaje")
//          ws.send("Hola");
// },1000*10);

// Convertir los datos que llega del serial a un string 
// readLine = Leer una linea que esta llegando por el serial y le pasamos un dilimitador
// \n = significa quiebre de linea (final de linea)


port.on('error', function(err){
        console.log("error ----> " + err)

});


const parser = port.pipe(new serialport.parsers.Readline({delimiter:'\n'}));
// el cliente se conecta al servidor broker
// no se utiliza http si no mqtt 
pub.on('connect',()=>{
//   data =  es cuando el lee o le llega datos por el serial 
parser.on('data',(datosrecibidos)=>{
    // creamos una nueva publicacion, en donde se enviara los datos resividos
    // de la placa arduino 
            // ("titulo de mensaje","mensaje")
    pub.publish("Topic test",datosrecibidos);
})
});






module.exports = pub;