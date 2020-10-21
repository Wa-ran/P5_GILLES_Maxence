// Récupère le nom du produit par l'url
let currentUrl = window.location.href;
let path = currentUrl.lastIndexOf('#');
let info = currentUrl.substring(path + 1);
let separator = info.lastIndexOf('-id-');
let id = info.substring(separator + 4);
let group = info.replace(('-id-' + id), '');
group = decodeURI(group);

// Récupération de l'url de l'API
let productType;
for (type of typeList) {
  let title = type.title;
  if (title === group) {
    productType = type;
    break
  }
}
let productUrl = productType.apiUrl + '/' + id;
// On rempli la page produit !
ajaxGet(productUrl).then(JSON.parse).then(function(resolve) {
  // Titre du produit
  let productTitle = document.querySelector('main h1');
  productTitle.textContent = resolve.name;
  // Image
  let productImg = document.getElementById('productImg');
  productImg.src = resolve.imageUrl;
  // Selection des options
  let options = document.getElementById('options');
  // L'option de personnalisation est toujours la première clef
  let perso = resolve[Object.keys(resolve)[0]];
  for (option of perso) {
    let newOption = document.createElement('option');
    newOption.textContent = option;
    options.appendChild(newOption);
  };
  // Description
  let productDescription = document.getElementById('productDescription');
  productDescription.textContent = resolve.description;
});