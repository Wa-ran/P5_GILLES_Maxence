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
  let i = 0, prodQnt = {}, btnInc = {}, btnDec = {}, btnDelete = {}, prodPrice = {}, prodName = {};
    // Loop pour créer les divs des produits  
    for (product of prodInBasket) {
    i++;
    let div = document.createElement('div');
    div.innerHTML = '<div class="dropdown-divider mx-5"></div><div class="d-flex flex-column align-items-center"><div class="d-flex flex-nowrap text-truncate w-100"><input id="prodQnt' + i + '" type="text" class="rounded border border-secondary align-self-end text-center m-0 quantity" maxlength="2" required><label for="prodQnt' + i + '" class="text-truncate p-1 mb-0 ml-2 font-weight-bold productName"><a id="prodName' + i + '" href="./product.html#' + product.category + '/id-' + product._id + '">' + product.name + '</a></label></div></div><div class="d-flex flex-nowrap mb-1"><div class="prodBasketBtn"><button id="btnDec' + i + '" class="btn btn-secondary rounded-left" aria-label="Retirer 1">-</button><button id="btnInc' + i + '" class="btn btn-secondary rounded-right" aria-label="Ajouter 1">+</button></div><div class="prodBasketBtn"><button id="btnDelete' + i + '" class="btn btn-secondary rounded ml-1" aria-label="Enlever du panier">x</button></div><p class="badge align-self-end badge bg-white border border-secondary mb-0 font-weight-bold ml-auto"><span id="prodPrice' + i + '">' + (product.price * product.quantity) / 100 + '</span> €</p></div>';
    basket.appendChild(div);
    prodQnt[i] = document.getElementById('prodQnt' + i.toString());
    prodQnt[i].value = product.quantity.toString();
    btnInc[i] = document.getElementById('btnInc' + i.toString());
    btnDec[i] = document.getElementById('btnDec' + i.toString());
    btnDelete[i] = document.getElementById('btnDelete' + i.toString());
    prodPrice[i] = document.getElementById('prodPrice' + i.toString());
    prodName[i] = document.getElementById('prodName' + i.toString());
  }
  // Pour empêcher l'utilisateur d'entrer autre chose que des chiffres dans les inputs des produits
  function setInputFilter(textbox, inputFilter) {
    ["input"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  };
  // Pour bloquer la quantité d'achat entre 1 et 9
  const verif = (input, j) => {
    if (input.value < 1) {
      return input.value = 1;
    }
    else if (input.value > 9) {
      return input.value = 9;
    }
    else {
      qntChange(j);
    }
  };
  // Fonction pour recalculer le prix du produit et du panier au changement de la quantité
  const qntChange = (j) => {
    let prodChange = prodInBasket[j - 1];
    prodChange.quantity = prodQnt[j].value;
    prodPrice[j].textContent = (prodChange.price * prodChange.quantity) / 100;

    let storeQnt = JSON.parse(localStorage.getItem(prodChange.name));
    storeQnt.qnt = prodChange.quantity;
    localStorage.setItem(prodChange.name, JSON.stringify(storeQnt));

    writeTotal(totalPanier);
  };
  // Pour enlever un élément du panier
  function removeParent(element, num, j) {
    let parent = element;
    for (let i = 0; i < num; i++) {
        if (parent.parentNode) {
            parent = parent.parentNode;
        }
    }
    parent.remove();
    localStorage.removeItem(prodInBasket[j - 1].name);
    writeTotal(totalPanier);
  };
  // Nouvelles loops ('i' en cours d'utilisation donc => 'j')
  // Solution au fait qu'en réécrivant le HTML avec la loop précédente => les addEvent sont perdus (sauf le dernier)
  for (let j = 1; j <= i; j++) {
      setInputFilter(prodQnt[j], function(value) {
      return /^\d$/.test(value);
    });
    btnInc[j].addEventListener('click', () => {
      prodQnt[j].value++;
      verif(prodQnt[j], j);
    });
    btnDec[j].addEventListener('click', () => {
      prodQnt[j].value--;
      verif(prodQnt[j], j);
    });
    prodQnt[j].addEventListener('change', () => {
      verif(prodQnt[j], j);
    });
    btnDelete[j].addEventListener('click', () => {
      removeParent(btnDelete[j], 3, j);
    });
  };
  // jQuery pour forcer la sélection de tout le texte des inputs text
  $(function(){
    $(document).on('click','input[type=text]',function(){ this.select(); });
  });
};
writeBasket();