let basket = document.getElementById('basket');
const writeBasket = async () => {
  let basketList = await getStore();
  if (basketList.length == 0) {
    document.getElementById('toutVide').style.display = 'unset';
    return
  };
  let i = 0, prod = {}, btnInc = {}, btnDec = {};
  for (product of basketList) {
    i++;
    let div = document.createElement('div');
    div.innerHTML = '<div class="dropdown-divider mx-5"></div><div class="d-flex flex-column align-items-center"><div class="d-flex flex-nowrap text-truncate w-100"><input id="prod' + i + '" type="text" class="rounded border border-secondary align-self-end text-center m-0 quantity" maxlength="1" required><label for="prod' + i + '" class="text-truncate pt-1 mb-0 ml-2 font-weight-bold productName"><a href="./product.html#' + product.category + '/id-' + product._id + '">' + product.name + '</a></label></div></div><div class="d-flex justify-content-between mb-1"><div class="increment"><button id="btnDec' + i + '" class="btn btn-secondary rounded-left">-</button><button id="btnInc' + i + '" class="btn btn-secondary rounded-right">+</button></div><p class="badge align-self-end badge bg-white border border-secondary mb-0 font-weight-normal"><span class="font-weight-bold">' + (product.price * product.quantity) / 100 + ' €</span></p></div>';
    basket.appendChild(div);
    prod[i] = document.getElementById('prod' + i.toString());
    prod[i].value = product.quantity.toString();
    btnInc[i] = document.getElementById('btnInc' + i.toString());
    btnDec[i] = document.getElementById('btnDec' + i.toString());
  }
  prodList = JSON.stringify(prod);
  for (let i = 1; i < prodList.length; i++) {
    btnInc[i].addEventListener('click', () => {
      prod[i].value++;
    });
    btnDec[i].addEventListener('click', () => {
      prod[i].value--;
    });
  }
}
writeBasket()