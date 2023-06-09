//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {saveApiDataGenres,saveApiDataPlatforms} = require('./src/controllers/saveApiData.controller')
const {fetchVideogames}= require('./src/controllers/getAllGames.controller')
require('dotenv').config();
const {
  PORT
} = process.env;
// Llamamos a la función para cargar los datos de la API antes de iniciar el servidor

// Syncing all the models at once.
async function main(){
  await fetchVideogames();
  await conn.sync({ force: true }).then(() => {

    saveApiDataGenres()
    saveApiDataPlatforms()
    server.listen(PORT, () => {
      console.log('%s listening at ' + PORT); // eslint-disable-line no-console
    });
  });
}
main()