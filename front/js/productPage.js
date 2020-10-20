// Récupère le nom du produit par l'url
let currentUrl = window.location.href;
let clean = currentUrl.replace('%20', ' ').replace('.html', '');
let path = clean.lastIndexOf('/');
let title = clean.substring(path + 1);
let productTitle = document.querySelector('main h1');
productTitle.textContent = title;

// Récupère les infos du produit par une recherche du nom dans les listes
for (type of typeList) {
  ajaxGet(type.url)
  .then(function(resolve) {
    let find = resolve.indexOf(title);
    // Recherche dans la liste des produits
    if (find < 0) {return 0} 
    else {
      // Produit trouvé dans cette liste => on recherche le bon produit
      resolve = JSON.parse(resolve);
      for (object of resolve) {
        if (object.name != title) {return 0}
        else {
          paint(object);
        }
      }
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
