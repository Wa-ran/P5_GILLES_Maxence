// Génération des cartes produits
let productListsdf = {
  "id":"oak1",
  "name":"Meuble 1",
  "price":"10",
  "description":"Description meuble 1",
  "imageUrl":""
}

let main = document.getElementsByTagName('main')[0];
let menuProduct = document.getElementById('menuProduct');

const productList = (title) => {

  let container = document.createElement('div');
  container.className = "container border border-primary rounded my-5";
  main.appendChild(container);

  let titleGroup = document.createElement('div');
  titleGroup.className = "border border-primary rounded bg-white p-1 titleGroup";
  titleGroup.innerHTML = '<div><h2 class="h3 text-center m-2" id="' + title + '">' + title + '</h2></div>';
  container.appendChild(titleGroup);

  let row = document.createElement('div');
  row.className = "row pb-1";
  container.appendChild(row);

  for (i = 0; i < 5; i++) {
    let idNum = title + '_' + (i + 1);
    let col = document.createElement('div');
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    col.innerHTML = '<div class="card my-2"><a class="card-body btn btn-outline-primary stretched-link p-0" href="./product.html"><div style="background-image: url(../../images/' + idNum + '.jpg);" class="card-img-top mb-2" alt=""></div><h5 class="card-title">' + idNum + '</h5><p class="card-text mb-3">' + idNum + '</p></a></div>';
    row.appendChild(col);
  }
}

productList('vcam');
productList('oak');
productList('teddy');