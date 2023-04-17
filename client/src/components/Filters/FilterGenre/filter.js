//filter recive el listado de [videojuegos]
// y el género por el que se require fitrar
export default function filter(videogames, genre) {
  
  let genreFilter = [];
 if(Array.isArray(videogames)){
   //for itera todos los juegos
   for (let i = 0; i < videogames.length; i++) {
    //seleciona el videojuego segun en la posicíon en la que este el i
    const game = videogames[i];
    //
    // if (typeof game.genres === "object") {
      for (let j = 0; j < game?.genres?.length; j++) {
        if (game.genres[j].name === genre) {
          
          genreFilter.push(game);
          //si se cumple la condición minimo 1 vez es suficiente, no importantan los otros generos
          break;
        }
      }
      // }
    }
 }
    console.log(genreFilter);
  return genreFilter;
}
