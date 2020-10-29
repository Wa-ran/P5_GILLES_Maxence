let confirmation;
// Aucune commande n'a été passée
if (localStorage.getItem('confirmation') === null && localStorage.getItem('historic') === null) {
  document.querySelector('main>div>div').style.display = 'none';
  document.querySelector('main>div').textContent = 'Votre historique de commandes est vide.';
}
// Accès à la page sans commander = commande la plus récente
else if (localStorage.getItem('confirmation') === null && localStorage.getItem('historic') != null) {
  confirmation = JSON.parse(localStorage.getItem('historic'));
}
else {
  // Accès après une commande
  confirmation = JSON.parse(localStorage.getItem('confirmation'));
}
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
write('Un mail de confirmation va vous être envoyé à ' + contact.email);
// On garde en mémoire la dernière commande
localStorage.setItem('historic', localStorage.getItem('confirmation'));
localStorage.removeItem('confirmation');