// Je sélectionne l'élément qui va afficher toutes mes images
const cats = document.querySelector(".cats");

// Je stocke ma clé API fourni par le site (envoyé par mail)
const apiKey =
  "live_BfqICSZg0vsV868uPoEx5OaK1g3HZp9FUSLYpOwVtxnOlFREAJUtklmXkqgnFw2s";

// Je définis le nombre limite d'éléments que je veux récupérer depuis l'api
const limit = 10;

// Je stock l'url de l'api en y intégrant la limite d'élément à afficher (limit) et ma clé api (apiKey)
// url de base https://api.thecatapi.com/v1/images/search?limit=${limit} (pas besoin de clé api pour l'instant)
// Je veux récupérer les données des races de chat, j'ajoute le paramètre "has_breed" qui prend en valeur 1 ou 0
// Pour récupérer les informations de races il faut obligatoirement indiquer la clé api, j'ajoute donc ma clé en tant que paramètre "api_key"
const urlApi = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1&api_key=${apiKey}`;

// Je crée une fonction asynchrone de manière générique que je nomme fetchApi et qui prend un url en paramètre
async function fetchApi(url) {
  // Je fait un "appel" sur l'api grâce à la méthode fetch et l'url et je stock la réponse obtenu dans une variable
  const response = await fetch(url);

  // Je transforme au format json les données contenue dans la réponse
  const datas = await response.json();

  // Je return les données
  return datas;
}

// J'utilise ma fonction fetchApi, j'envoie dans ses paramètre mon urlApi et je stocke les données retourné par la fonction dans une variable
const datas = fetchApi(urlApi);
//console.log(datas);
const form = document.querySelector("form");

datas.then((datas) => {
  console.log(datas);
  datas.forEach((data) => {
    displayCats(cats, data);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    cats.innerHTML = "";

    const inputValue = e.target.children[1].value;
    const filteredDatas = datas.filter(
      (data) => data.breeds[0].name === inputValue
    );
    console.log(filteredDatas);
    filteredDatas.forEach((data) => {
      displayCats(cats, data);
    });
  });
});

function displayCats(cats, data) {
  cats.innerHTML += `
    <article>
        <figure>
            <img src="${data.url}" alt="" />
            <figcaption>${data.id}</figcaption>
        </figure>
        
        <div class= "desc">
                <h2>${data.breeds[0].name}</h2>
                <p>${data.breeds[0].description}</p>
                <p>Origine : ${data.breeds[0].origin}</p>
        </div>
    </article>
    `;
}
