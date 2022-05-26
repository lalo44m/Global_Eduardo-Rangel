const mongoose = require("mongoose");
const connection = mongoose.connect(`mongodb+srv://lalo:queso123@cluster0.1imik.mongodb.net/iotr2u3?retryWrites=true&w=majority`)
.then((db)=>{
    console.log("Conexion exitosa a mongoDB");
}).catch((err)=>{
    console.log("Ah ocurrido un error: "+err.message);
})
module.exports = connection;