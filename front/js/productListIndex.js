// Affichage des cartes produits de l'Index -----------------------------------------------------
let main = document.getElementsByTagName('main')[0];
let menuProduct = document.getElementById('menuProduct');

const productList = (title , url) => {
// Container
  let container = document.createElement('div');
  container.className = "container border border-primary rounded bg-light my-5";
  main.appendChild(container);
// Titre du groupe de produits
  let titleGroup = document.createElement('div');
  titleGroup.className = "border border-primary rounded bg-white p-1 titleGroup";
  titleGroup.innerHTML = '<div><h2 class="h3 text-center m-2" id="' + title + '">' + title + '</h2></div>';
  container.appendChild(titleGroup);
// Row
  let row = document.createElement('div');
  row.className = "row pb-1";
  container.appendChild(row);
// Carte de chaque produits, voir Ajax.js
  ajaxGet(url).then(JSON.parse).then(function(resolve) {
    for (object of resolve) {
      let col = document.createElement('div');
      col.id = title;
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
      col.innerHTML = '<div class="card my-2 border-white"><a class="card-body btn btn-outline-primary stretched-link p-0" href="./product.html#' + title + '-id-' + object._id + '"><div style="background-image: url(' + object.imageUrl + ');" class="card-img-top mb-2" alt=""></div><h5 class="card-title">' + object.name + '</h5></a></div>';
      row.appendChild(col); 
    };
  });
};
for (type of typeList) {
  productList(type.title, type.apiUrl)
};