let pokemonList = [
    {name: 'Charmander', type: ['fire'], height:0.6},
    {name: 'Pikachu', type: ['electric'], height:0.4},
    {name: 'Dragonite', type: ['dragon', 'flying'], height:2.2},
    {name: 'Charizard', type: ['fire', 'flying'], height:1.7},
    {name: 'Vaporeon', type: ['water'], height:1}
  ];

  
 for (i=0; i<pokemonList.length; i++){
  if (pokemonList[i].height >2) {
  document.write(pokemonList[i].name+" (Height- "+pokemonList[i].height+")"+" -Wow, that's big!"+"<br>");
 }else {
  document.write (pokemonList[i].name+" (Height- "+pokemonList[i].height+")" +"<br>")
 }}