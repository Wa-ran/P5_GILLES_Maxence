let product;
// Récupère le nom du groupe et l'id du produit par l'url
let currentUrl = window.location.href;
let path = currentUrl.lastIndexOf('#');
let info = currentUrl.substring(path + 1);
let separator = info.lastIndexOf('/id-');
let id = info.substring(separator + 4);
let group = info.replace(('/id-' + id), '');
group = decodeURI(group);
group = group.replace('_', ' ');

const modal = () => {
  // Affichage d'un modal (Bootstrap) pour retour à l'accueil en cas d'erreur
  return $(document).ready(function(){
    $("#modalBack").modal('show')
  })
};

const fillPage = (object) => {
  // Pour remplir la page produit
  let productUrl = object.apiUrl + '/' + id;
  ajaxGet(productUrl)
  // Si erreur réseau (mauvaise url pour l'API) ou 404 (id n'existe pas) => modal
  .catch(function() { modal() })
  .then(JSON.parse)
  .then(function(resolve) {
    product = resolve;
    // Titre du produit
    let productTitle = document.querySelector('main h1');
    productTitle.textContent = product.name;
    // Image
    let productImg = document.getElementById('productImg');
    productImg.src = product.imageUrl;
    // Selection des options
    let options = document.getElementById('options');
    // L'option de personnalisation est toujours la première clef
    let perso = product[Object.keys(product)[0]];
    for (option of perso) {
      let newOption = document.createElement('option');
      newOption.textContent = option;
      options.appendChild(newOption);
    };
    // Description
    let productDescription = document.getElementById('productDescription');
    productDescription.textContent = product.description;
    // Prix
    price();
  });
}

// Afichage du prix
const price = () => {
  let pricePurchase = qnt.value * (product.price / 100);
  let priceText = document.getElementById('priceText');
  priceText.textContent = 'Prix : ' + pricePurchase + ' €';
}

// Gestion du formulaire d'achat
let formProduct = document.getElementById('formProduct');

let qnt = document.getElementById('quantity');
qnt.addEventListener('change', () => { price() });

let qntStored;
let qntTotale;
formProduct.addEventListener('submit', (e) => {
  e.preventDefault();
  qntStored = parseInt(sessionStorage.getItem(id));
  qntPurchase = parseInt(qnt.value);
  if (isNaN(qntStored) === true) {  
    qntTotale = qntPurchase;
  }
  else {
    qntTotale = qntStored + qntPurchase;
  };
  sessionStorage.setItem(product._id, qntTotale);
});


// Recherche du groupe du produit
for (type of typeList) {
  let title = type.title;
  if (title === group) {
    // On a trouvé le groupe du produit
    product = type;
    fillPage(product);
    break
  }
};
if (product === undefined) {
  // Le groupe n'existe pas, appelle le modal
  modal();
};