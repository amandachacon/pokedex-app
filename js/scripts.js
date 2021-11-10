let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    let item = pokemon
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.setAttribute('data-toggle','modal')
    button.setAttribute('data-target','#targetModal')
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', () => { 
      showDetails(pokemon);
      showModal(pokemon);
    });
  }
  
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    let item = pokemon 
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other['official-artwork']['front_default'];
      item.height = details.height;
      item.types = details.types;
      item.types = pokemon.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    });
  }
  let modalContainer = document.querySelector('#modal-container');

  function showModal(name, height, img, types) {
  
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);
  
      let nameElement = document.createElement('h1');
      nameElement.innerText = name;
  
      let heightElement = document.createElement('p');
      heightElement.innerText = `Height: ${height}`;
            
      let typesElement = document.createElement('p');
      typesElement.innerText = `Type(s): ${types}`;
  
      let imgElement = document.createElement('img');
      imgElement.src = img;

  
      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modal.appendChild(typesElement);
      modal.appendChild(imgElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('is-visible');
  }


  function hideModal() {
      modalContainer.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
  
  modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
          hideModal();
      }
  });  
  

  function showDetails(item) { 
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item.name, item.height, item.imageUrl, item.types);
      let pokemon = item
      imgURL = pokemon.sprites.other['official-artwork']['front_default'];
      let height = item.height; 
      let img = document.querySelector('img');
      height.text = item.height
      img.src = item.imgURL
    });
  }

  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

