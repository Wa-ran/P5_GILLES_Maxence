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

const productList = (title , url) => {

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

  ajaxGet(url, function(response) {
    let list = JSON.parse(response);
    for (i = 0; i < 5; i++) {
      let object = list[i];
      let name = object.name;
      let imageUrl = object.imageUrl;
      let col = document.createElement('div');
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
      col.innerHTML = '<div class="card my-2"><a class="card-body btn btn-outline-primary stretched-link p-0" href="./' + name + '.html"><div style="background-image: url(' + imageUrl + ');" class="card-img-top mb-2" alt=""></div><h5 class="card-title">' + name + '</h5></a></div>';
      row.appendChild(col);
    }
  })
}

productList('vcam', 'http://localhost:3000/api/cameras');
productList('oak','http://localhost:3000/api/furniture');
productList('teddy', 'http://localhost:3000/api/teddies');