const { Videogame } = require("../db");

async function addVideoGame(req, res) {
  try {
    //data del video juego recivida por body

    const {
      name,
      description,
      platforms,
      release,
      rating,
      genres,
    } = req.body;
    

    let url = `https://deploy-production-81f7.up.railway.app/uploads/${req.file.filename}`

 
    //crear el video juego en la db
    const newGame = await Videogame.create({
      name,
      description,
      background_image:url,
      release,
      rating,
    });
    // crear las asociaciones con la tabla intermedia
    // el nuvo juego asocia del modelo Genre los generos pasados por parametros ---> [1,2,30]
    await newGame.addGenre(genres.split(','));
    // el nuvo juego asocia del modelo Platform las plataformas pasados por parametros ---> [1,2,30]
    await newGame.addPlatform(platforms.split(','));

    //prueba traer data de un juego

    res.status(201).send({ msg: "video game added successfully" });
  } catch (e) {
    res.status(400).json({ err: e });
  }
}

module.exports = addVideoGame;
