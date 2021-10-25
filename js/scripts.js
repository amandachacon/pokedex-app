let pokemonRepository = (function () {
  let pokemonList = [
      {name: 'Charmander', type: ['fire'], height:0.6},
      {name: 'Pikachu', type: ['electric'], height:0.4},
      {name: 'Dragonite', type: ['dragon', 'flying'], height:2.2},
      {name: 'Charizard', type: ['fire', 'flying'], height:1.7},
      {name: 'Vaporeon', type: ['water'], height:1}
    ];
    
  function getAll() {
      return pokemonList;
  };
  function add(item) {
      return pokemonList.push(item);
  };
  
  return {
      getAll: getAll,
      add: add,
  };
  }());
   pokemonRepository.getAll().forEach(function(pokemonList){
    document.write(`${pokemonList.name} -(Height: ${pokemonList.height}) <br>`)
  });