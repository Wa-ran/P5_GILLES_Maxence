let basket = document.getElementById('basket');
let totalPanier = document.querySelector('#totalPanier>span');
writeTotal(totalPanier);
const writeBasket = async () => {
  // On récupère les produits du panier
  let prodInBasket = await getStore();
  if (prodInBasket.length == 0) {
    // Panier vide = demande à l'utilisateur de le remplir bien-sûr ^^
    document.getElementById('toutVide').style.display = 'unset';
    return
  };
  // Les divs des produits sont générés dynamiquement ainsi que leurs boutons, donc les variables sont des arrays que l'on va remplir
  let i = 0, prodQnt = {}, btnInc = {}, btnDec = {}, prodPrice = {}, prodName = {};
    // Loop pour créer les divs des produits  
    for (product of prodInBasket) {
    i++;
    let div = document.createElement('div');
    div.innerHTML = '<div class="dropdown-divider mx-5"></div><div class="d-flex flex-column align-items-center"><div class="d-flex flex-nowrap text-truncate w-100"><input id="prodQnt' + i + '" type="text" class="rounded border border-secondary align-self-end text-center m-0 quantity" maxlength="2" required><label for="prodQnt' + i + '" class="text-truncate pt-1 mb-0 ml-2 font-weight-bold productName"><a id="prodName' + i + '" href="./product.html#' + product.category + '/id-' + product._id + '">' + product.name + '</a></label></div></div><div class="d-flex justify-content-between mb-1"><div class="increment"><button id="btnDec' + i + '" class="btn btn-secondary rounded-left">-</button><button id="btnInc' + i + '" class="btn btn-secondary rounded-right">+</button></div><p class="badge align-self-end badge bg-white border border-secondary mb-0 font-weight-bold"><span id="prodPrice' + i + '">' + (product.price * product.quantity) / 100 + '</span> €</p></div>';
    basket.appendChild(div);
    prodQnt[i] = document.getElementById('prodQnt' + i.toString());
    prodQnt[i].value = product.quantity.toString();
    btnInc[i] = document.getElementById('btnInc' + i.toString());
    btnDec[i] = document.getElementById('btnDec' + i.toString());
    prodPrice[i] = document.getElementById('prodPrice' + i.toString());
    prodName[i] = document.getElementById('prodName' + i.toString());
  }
  // Fonction pour recalculer le prix du produit et du panier au changement de la quantité
  const qntChange = (j) => {
    prodInBasket[j - 1].quantity = prodQnt[j].value;
    prodPrice[j].textContent = (prodInBasket[j - 1].price * prodInBasket[j - 1].quantity) / 100;

    let storeQnt = JSON.parse(localStorage.getItem(prodInBasket[j - 1].name));
    storeQnt.qnt = prodInBasket[j - 1].quantity;
    localStorage.setItem(prodInBasket[j - 1].name, JSON.stringify(storeQnt));

    writeTotal(totalPanier);
  }
    // Nouvelles loops car en réécrivant le HTML avec la loop précédente, les addEvent sont perdus (sauf le dernier)
  for (let j = 1; j <= i; j++) {
    btnInc[j].addEventListener('click', () => {
      prodQnt[j].value++;
      qntChange(j);
    });
    btnDec[j].addEventListener('click', () => {
      prodQnt[j].value--;
      qntChange(j);
    });
  }
  for (let j = 1; j <= i; j++) {
    prodQnt[j].addEventListener('input', () => {
      qntChange(j);
    });
  }
  // jQuery pour forcer la sélection de tout le texte des inputs text
  $(function(){
    $(document).on('click','input[type=text]',function(){ this.select(); });
  });
}
writeBasket()