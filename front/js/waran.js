// Bouton haut de page
let pageUp = document.getElementById('pageUp');
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    pageUp.style.display = "flex";
  } else {
    pageUp.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



// Ancres produits du header
const ancresList = (title) => {

  let ancre = document.createElement('a');
  ancre.className = "dropdown-item rounded px-1";
  ancre.href = './index.html#' + title;
  ancre.innerHTML = title;
  menuProduct.appendChild(ancre);
}
ancresList('vcam');
ancresList('oak');
ancresList('teddy');

// const parse = (someJSONFile) => {
//   let object = JSON.parse(someJSONFile);
// }

// let aj = ajaxGet('http://localhost:3000/api/cameras', function(response) {
//   // let resp = JSON.parse(response);
//   // console.log(resp[0])
//   parse(response)
//   .then(function(response) {
//     console.log(response)
//   })
//   .catch(function(error) {
//     console.log('prout')
//   });
// })
