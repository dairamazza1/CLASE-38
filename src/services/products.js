//MODIFICA LA LÒGICA DEL CONTROLADOR E INTERACTUA CON DAO

// DAOS
const { ProductoDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
let product = new ProductoDaoArchivo();

// const { ChatDaoArchivo } = require('../daos/chat/ChatDaoArchivo');
// let chat = new ChatDaoArchivo();

//FORK
const { fork } = require("child_process");
const { log } = require('console');

async function getProductsDLO(){
    let ret = false;
    const prod = await product.getAll().then( (obj) =>{
            obj.length > 0 ? ret = true : ret = false;
    }) 
    return ret;
}
async function getProductsDataDLO(){
    let ret = {}
    const prod = await product.getAll().then( (obj) =>{
        obj.length > 0 ? ret = {products: obj} : ret = {products: {} }
    }) 
    return ret;
}

function getRandomDLO(n) {
    let num = null;
    const qtyAux = 1000;
    n == undefined ? num = qtyAux : num = n;

    const child = fork("./src/utils/randomsChild");
    child.send(num);
    child.on("message", (data) => {
        try {
            return JSON.parse(data);
        } catch (error) {
            const logger = log4js.getLogger("error");
            logger.info("Log error: ", error);
        }
    }); 
}

module.exports = {
    getProductsDLO,
    getRandomDLO,
    getProductsDataDLO
}