// Récupère le nom du produit par l'url
let currentUrl = window.location.href;
let clean = currentUrl.replaceAll('%20', ' ').replace('.html', '');
let path = clean.lastIndexOf('#');
let title = clean.substring(path + 1);
let productTitle = document.querySelector('main h1');
productTitle.textContent = title;

// Récupère les infos du produit par une recherche du nom dans les listes
let i = 0;
for (type of typeList) {
  ajaxGet(type.url)
  .then(function(resolve) { 
    i++;
    // Recherche dans la liste des produits
    let find = resolve.indexOf('"name":"' + title + '",');
    if (find < 0 && i == typeList.length) {
      // Le produit n'existe pas, appelle un modal boostrap
      return $(document).ready(function(){
        $("#modalBack").modal('show')});
    }
    else if (find < 0) {
      // Le produit n'est pas dans cette liste
    }
    else {
      // Produit trouvé dans cette liste => on recherche le bon produit
      resolve = JSON.parse(resolve);
      for (object of resolve) {
        if (object.name === title) {
          return paint(object);
        }
      };
    };
  });
};
// Affichage de l'image et de la description
const paint = (product) => {
  let productImg = document.getElementById('productImg');
  productImg.src = product.imageUrl;
  let productDescription = document.getElementById('productDescription');
  productDescription.textContent = product.description;
}
