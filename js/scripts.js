let pokemonRepository = (function () {
  let repository = [
    { name: 'Charmander', type: ['fire'], height: 0.6 },
    { name: 'Pikachu', type: ['electric'], height: 0.4 },
    { name: 'Dragonite', type: ['dragon', 'flying'], height: 2.2 },
    { name: 'Charizard', type: ['fire', 'flying'], height: 1.7 },
    { name: 'Vaporeon', type: ['water'], height: 1 }


  ];
  function getAll() {
    return repository;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
