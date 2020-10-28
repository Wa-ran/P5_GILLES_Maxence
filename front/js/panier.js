let basket = document.getElementById('basket');
let totalPanier = document.querySelector('#totalPanier>span');

const writeBasket = async () => {
  // On récupère les produits du panier
  let prodInBasket = await getStore();

  // Ecriture du prix du panier
  const writeTotal = () => {
    let total = 0;
    for (prod of prodInBasket) {
      total = total + (prod.quantity * prod.price)
    }
    totalPanier.textContent = total / 100 + " €";
  };
  writeTotal();

  // Panier vide = demande à l'utilisateur de le remplir bien-sûr ^^
  if (prodInBasket.length == 0) {
    document.getElementById('toutVide').style.display = 'unset';
    document.getElementById('colForm').style.display = 'none';
    document.getElementById('totalPanier').style.display = 'none';
    document.getElementById('thePanier').style.margin = 'auto';
    document.getElementById('thePanier').style.border = 'none';
    return
  };

  // Les divs des produits sont générés dynamiquement ainsi que leurs boutons, donc les variables sont des arrays que l'on va remplir
  let i = 0, prodQnt = {}, btnInc = {}, btnDec = {}, btnDelete = {}, prodPrice = {}, prodName = {};
    // Loop pour créer les divs des produits  
    for (let i = 0; i < prodInBasket.length; i++) {
      let product = prodInBasket[i];
      let div = document.createElement('div');
      div.innerHTML = '<div class="dropdown-divider mx-5"></div><div class="d-flex flex-column align-items-center"><div class="d-flex flex-nowrap text-truncate w-100"><input id="prodQnt' + i + '" type="text" class="rounded border border-secondary align-self-end text-center m-0 quantity" maxlength="2" required><label for="prodQnt' + i + '" class="text-truncate p-1 mb-0 ml-2 font-weight-bold productName"><a id="prodName' + i + '" href="./product.html#' + product.category.replaceAll(' ', '_') + '/id-' + product._id + '">' + product.name + '</a></label></div></div><div class="d-flex flex-nowrap mb-1"><div class="prodBasketBtn"><button id="btnDec' + i + '" class="btn btn-secondary rounded-left" aria-label="Retirer 1">-</button><button id="btnInc' + i + '" class="btn btn-secondary rounded-right" aria-label="Ajouter 1">+</button></div><div class="prodBasketBtn"><button id="btnDelete' + i + '" class="btn btn-secondary rounded ml-1" aria-label="Enlever du panier">x</button></div><p class="badge align-self-end badge bg-white border border-secondary mb-0 font-weight-bold ml-auto"><span id="prodPrice' + i + '">' + (product.price * product.quantity) / 100 + '</span> €</p></div>';
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
  const verif = (input, i) => {
    if (input.value < 1) {
      return input.value = 1;
    }
    else if (input.value > 9) {
      return input.value = 9;
    }
    else {
      qntChange(i);
    }
  };

  // Fonction pour recalculer le prix du produit et du panier au changement de la quantité
  const qntChange = (i) => {
    let prodChange = prodInBasket[i];
    prodChange.quantity = prodQnt[i].value;
    prodPrice[i].textContent = (prodChange.price * prodChange.quantity) / 100;

    let storeQnt = JSON.parse(localStorage.getItem(prodChange.name));
    storeQnt.qnt = prodChange.quantity;
    localStorage.setItem(prodChange.name, JSON.stringify(storeQnt));

    writeTotal();
  };

  // Pour enlever un élément du panier
  function removeParent(element, num, i) {
    for (let i = 0; i < num; i++) {
      if (element.parentNode) {
        element = element.parentNode;
      }
    }
    element.remove();
    localStorage.removeItem(prodInBasket[i].name);
    location.reload();
  };

  // Nouvelles loops ('i' en cours d'utilisation donc => 'j')
  // Solution au problème qu'en réécrivant le HTML avec la loop précédente, les addEvent sont perdus (sauf le dernier)
  for (let i = 0; i < prodInBasket.length; i++) {
      setInputFilter(prodQnt[i], function(value) {
      return /^\d$/.test(value);
    });
    btnInc[i].addEventListener('click', () => {
      prodQnt[i].value++;
      verif(prodQnt[i], i);
    });
    btnDec[i].addEventListener('click', () => {
      prodQnt[i].value--;
      verif(prodQnt[i], i);
    });
    prodQnt[i].addEventListener('change', () => {
      verif(prodQnt[i], i);
    });
    btnDelete[i].addEventListener('click', () => {
      removeParent(btnDelete[i], 3, i);
    });
  };

  // jQuery pour forcer la sélection de tout le texte des inputs text
  $(function(){
    $(document).on('click','input[type=text]',function(){ this.select(); });
  });

  // Envoie de la commande  
  let commande = document.getElementById('commande');
  commande.addEventListener('submit', async (e) => {
    e.preventDefault();
    let confirmation = {};
    // On vérifie en récupérant une dernière fois les produits au cas où des changements auraient eu lieu (nouveaux produits ou quantité depuis un autre onglet par ex.)
    prodInBasket = await getStore();
    if (prodInBasket.length === 0) {
      location.reload();
      return
    };
    // Objet contact
    let contact = {
      "firstName" : commande.elements.firstName.value,
      "lastName" : commande.elements.lastName.value,
      "address" : commande.elements.address.value,
      "city" : commande.elements.city.value,
      "email" : commande.elements.email.value,
    };
    // 1 API par catégorie = 1 post par catégorie
    for (type of typeList) {
      // Tableau products
      let products = [];
      for (product of prodInBasket) {
        if (RegExp(type.title).test(product.category) === true) {
          products.push(product._id);
          localStorage.removeItem(product.name)
        }
      };
      if (products.length > 0) {
        // Objet JSON à envoyer
        let data = {
          "contact" : contact,
          "products" : products,
        };
        await ajaxPost(type.apiUrl + '/order', data, true)
        .then(function(result) {
          confirmation[type.title] = result;
        })
      }
    };
    localStorage.setItem("confirmation", JSON.stringify(confirmation));
    window.location.href = "./confirmation.html"
  })
};
writeBasket();