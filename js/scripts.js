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
    //this breaks the page, no buttons appear, "li is not defined"
    //li.classList.add('group-list-item');
    button.innerText = pokemon.name;
    //breakes code (btn btn, primary), removed btn
    button.classList.add('btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener('click', () => {
      showDetails(pokemon);
      showModal(pokemon);
      console.log(pokemon)
    });
  }


  function loadDetails(pokemon) {
    let item = pokemon
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other['official-artwork']['front_default'];
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types;
      item.types = pokemon.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.detailsUrl
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();
    //dobble check element names in modal, consider adding back image back image code commented out
    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrl);
    //let imageElementBack = $('<img class="modal-img" style="width:50%">');
    //imageElementBack.attr("src", item.ImageURLBack);
    let heightElement = $("<p>" + "height" + item.height + "</p>");
    let typesElement = $("<p>" + "types : " + item.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageUrl);
    //modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalContainer.appendChild(modal);

  }


  function hideModal() {
    targetModal.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  targetModal.addEventListener('click', (e) => {
    let target = e.target;
    if (target === targetModal) {
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
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


