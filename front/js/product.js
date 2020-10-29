let product;
// Récupère le nom du groupe et l'id du produit par l'url
let currentUrl = window.location.href;
let path = currentUrl.lastIndexOf('#');
let info = currentUrl.substring(path + 1);
info = decodeURI(info);
info = info.replaceAll('_', ' ');
let separator = info.lastIndexOf('/id-');
let id = info.substring(separator + 4);
let group = info.replace(('/id-' + id), '');

const modal = () => {
  document.querySelector('main>div').style.display = 'none';
  // Affichage d'un modal (Bootstrap) pour retour à l'accueil en cas d'erreur
  return $(document).ready(function(){
    $("#modalBack").modal('show')
  })
};

let productUrl;
const fillPage = (object) => {
  // Pour remplir la page produit
  productUrl = object.apiUrl + '/' + id;
  ajaxGet(productUrl)
  // Si erreur réseau (mauvaise url pour l'API) ou 404 (id n'existe pas) => modal
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
    // meta title et description
    document.title = product.name + ' - Orinoco';
    $('head').append( '<meta name="description" content="' + product.description + ' Disponible chez Orinoco !">' );
  })
  .catch(function() { modal() });
}

// Afichage du prix de l'article (en fonction de la quantité selectionnée)
const price = () => {
  let pricePurchase = qnt.value * (product.price / 100);
  let priceText = document.getElementById('priceText');
  priceText.textContent = 'Prix : ' + pricePurchase + ' €';
}

// Affichage du prix du panier et de la quantité
const writeTotal = async (quantity, panier) => {
  let total = 0;
  await getStore()
  .then(function(resolve) {
    for (purchase of resolve) {
      total = total + (purchase.quantity * purchase.price);
      let exp = purchase.name;
      let test = product.name;
      if (RegExp(exp.replaceAll(/[()]/g)).test(test.replaceAll(/[()]/g)) === true) {
        quantity.textContent = purchase.quantity;
      }
    };
    panier.textContent = total / 100 + " €";
  })
};

let basketPrice = document.querySelector('#basketPrice>span');
let qntProd = document.querySelector('#qntProd>span');
writeTotal(qntProd, basketPrice);

// Gestion du formulaire d'achat
let formProduct = document.getElementById('formProduct');
// Selection quantité
let qnt = document.getElementById('quantitySelector');
qnt.addEventListener('change', () => { price() });
// Bonton achat
let qntStored, qntTotale;
formProduct.addEventListener('submit', (e) => {
  e.preventDefault();
  let qntPurchase = parseInt(qnt.value);
  try {
    qntStored = localStorage.getItem(product.name);
    qntStored = JSON.parse(qntStored);
    qntStored = parseInt(qntStored.qnt);
  }
  catch {
    // Si le produit n'existe pas dans le panier (=null)
    qntStored = 0;
  };
  if (isNaN(qntStored) === true) {
    // Si le produit est stoké mais erreur sur la value qnt
    qntTotale = qntPurchase;
  }
  else {
    qntTotale = qntStored + qntPurchase;
  };
  let store = {"api" : productUrl, "qnt" : qntTotale, "group" : group};
  // Stockage de l'achat
  localStorage.setItem(product.name, JSON.stringify(store));
  // Maj du prix du panier
  writeTotal(qntProd, basketPrice);
});

// Recherche du groupe du produit
for (type of typeList) {
  let title = type.title;
  if (title === group) {
    // On a trouvé le groupe du produit => remplir la page
    product = type;
    fillPage(product);
    break
  }
};
if (product === undefined) {
  // Le groupe n'existe pas, appelle le modal
  modal();
};