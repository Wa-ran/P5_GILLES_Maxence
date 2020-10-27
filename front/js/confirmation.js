if (localStorage.getItem('confirmation') === null) {
  document.querySelector('main>div').style.display = 'none';
  location.replace('./index.html');
}
else {
  let confirmation = JSON.parse(localStorage.getItem('confirmation'));
  let confList = document.getElementById('confList');
  for ([group, purchase] of Object.entries(confirmation)) {
    let p = document.createElement('p');
    purchase = JSON.parse(purchase);
    p.classList.add('h6');
    p.innerHTML = group + '<br>(id : ' + purchase.orderId + ')';
    confList.appendChild(p);
    let ul = document.createElement('ul');
    confList.appendChild(ul);
    ul.classList.add('list-unstyled');
    let product = purchase.products;
    for (info of product) {
      let li = document.createElement('li');
      li.textContent = info.name;
      ul.appendChild(li);
    }
  };
  
  let contact = JSON.parse(Object.values(confirmation)[0]).contact;
  let address = document.getElementById('address');
  const write = (text) => {
    let p = document.createElement('p');
    p.textContent = text;
    address.appendChild(p);  
  }
  write(contact.lastName + ' ' + contact.firstName);
  write(contact.address + ', ' + contact.city);
  write('Un mail de confirmation va vous être envoyé à ' + contact.email)
  localStorage.removeItem('confirmation');
}