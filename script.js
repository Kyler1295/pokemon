var pokemonInfo = document.getElementById('pokemoninfo');
var pokeBall = document.getElementById('pokeball');
var addPokemonButton = document.getElementById('addPokemon');
var pokeParty = document.getElementById('pokemonHolder');
var pokemonShown = false;
partyCount = 0;
var pokemon_api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

function getPokemon() {
  pokemon_api.get('pokemon')
    .then((response) => {
      pokemon_api.get('pokemon/' + Math.round((Math.random() * 800)))
        .then((response) => {
          let pokemonName = `<ul id="pokemonInformation" class="card-content white-text">
                                <li id="pokemonName" class="card-title" value="${response.data.name}">Name: ${response.data.name}</li>
                                <li id="pokemonId" value="${response.data.id}">PokeDex ID: ${response.data.id}</li>
                                <li id="pokemonWeight" value="${response.data.weight}">Weight: ${response.data.weight}</li>
                                <li id="pokemonType" value="`;
          if(typeof response.data.types[1] !== 'undefined'){
            pokemonName += `${response.data.types[0].type.name} and ${response.data.types[1].type.name}">Type: ${response.data.types[0].type.name} and ${response.data.types[1].type.name}</li></ul>`;
          }else{
            pokemonName += `${response.data.types[0].type.name}">Type: ${response.data.types[0].type.name}</li></ul>`;
          }
          let pokeImage = response.data.sprites.front_default;
          pokemonInfo.innerHTML = pokemonName;
          pokeBall.style.backgroundImage = "url("+ pokeImage +")";
          pokeBall.style.animation = "none";
          addPokemonButton.style.display = 'block';
        }).catch ((error) => {
          console.log(error);
        })
    })
    .catch(function (error) {
      console.log('whoops');
    })

    pokemonShown = true;
};

function addPokemon() {
  if (pokemonShown && partyCount < 6){

    //Gets the pokemon name and pokemon image of current pokemon
    let currentPokemonName = document.getElementById('pokemonName').getAttribute('value');
    let currentPokemonId = document.getElementById('pokemonId').getAttribute('value');
    let currentPokemonWeight = document.getElementById('pokemonWeight').getAttribute('value');
    let currentPokemonType = document.getElementById('pokemonType').getAttribute('value');
    let currentPokemonImg = document.getElementById('pokeball').style.backgroundImage;

    //creates the new li, p, and img element for the pokemon.
    let newPokemonEntry = document.createElement('li');
    newPokemonEntry.className = 'pokemonEntry';
    let newPokemonName = document.createElement('p');
    newPokemonName.className = 'pokemonName';
    let newPokemonImage = document.createElement('img');
    newPokemonImage.className = 'pokemonImage';
    newPokemonImage.setAttribute("onClick", "showPokemon(event)");
    let removePokemonButton = document.createElement('button');
    removePokemonButton.className = 'removePokemonButton waves-effect waves-light btn-large red';
    removePokemonButton.setAttribute("onClick", "removePokemon(event)");
    let newPokemonId = document.createElement('span');
    newPokemonId.className = 'hiddenPokemonId';
    let newPokemonWeight = document.createElement('span');
    newPokemonWeight.className = 'hiddenPokemonWeight';
    let newPokemonType = document.createElement('span');
    newPokemonType.className = 'hiddenPokemonType';



    //sets the image, and name and creates the new pokemon
    newPokemonImage.style.backgroundImage = currentPokemonImg;
    newPokemonName.appendChild(document.createTextNode(currentPokemonName));
    removePokemonButton.appendChild(document.createTextNode('Release'));
    newPokemonId.appendChild(document.createTextNode(currentPokemonId));
    newPokemonWeight.appendChild(document.createTextNode(currentPokemonWeight));
    newPokemonType.appendChild(document.createTextNode(currentPokemonType));
    pokeParty.appendChild(newPokemonEntry);
    newPokemonEntry.appendChild(newPokemonName);
    newPokemonEntry.appendChild(newPokemonImage);
    newPokemonEntry.appendChild(removePokemonButton);
    newPokemonEntry.appendChild(newPokemonId);
    newPokemonEntry.appendChild(newPokemonWeight);
    newPokemonEntry.appendChild(newPokemonType);
    partyCount++;
    newPokemon = '';

  }
  //checks to see if the party is full.
  else if(partyCount > 5){
    Materialize.toast('You can only have 6 pokemon!', 3000, 'red btn-large')
  }
  else {
    alert('No Pokemon!');
  }
};

function removePokemon(e){
  let buttonPressed = e.target;
  buttonPressed.parentElement.remove();
  partyCount--;

  checkParty();
};

function showPokemon(e){
  let imgClicked = e.target;
  pokemonStored = imgClicked.parentElement;
  StoredName = pokemonStored.children[0];
  StoredImg = pokemonStored.children[1];
  StoredId = pokemonStored.children[3];
  StoredWeight = pokemonStored.children[4];
  StoredType = pokemonStored.children[5];
  newName = StoredName.innerHTML;
  newImage = StoredImg.style.backgroundImage;
  newId = StoredId.innerHTML;
  newWeight = StoredWeight.innerHTML;
  newType = StoredType.innerHTML;

  newContent = `
      <ul id="pokemonInformation" class="card-content white-text">
        <li id="pokemonName" class="card-title" value="${newName}">Name: ${newName}</li>
        <li id="pokemonId" value="${newId}">PokeDex ID: ${newId}</li>
        <li id="pokemonWeight" value="${newWeight}">Weight: ${newWeight}</li>
        <li id="pokemonType" value="${newType}">Type: ${newType}</li>
      </ul>`
  pokemonInfo.innerHTML = newContent;
  pokeBall.style.backgroundImage = newImage;
};

function checkParty(){
  let pokemonBag = document.getElementById('pokemonHolder');
  let pokemonInformation = document.getElementById('pokemonInformation');
  if(pokemonBag.children.length > 0){

  } else{
    pokeBall.style.backgroundImage = "url('../css/images/pokeball.svg')";
    pokeBall.style.animation = "poketurn 1.5s linear infinite";
    addPokemonButton.style.display = "none";
    pokemonInformation.remove();
  }
}
