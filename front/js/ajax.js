// Exécute un appel AJAX GET
// Utilisation des promises
function ajaxGet(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            if (req.status == 200) {
                resolve(req.responseText);
            } else {
                reject(Error(req.status + " > " + req.statusText + " > " + url));
            }
        };
        req.onerror = function() {
            reject(Error("Erreur réseau avec " + url));
        };
        req.send();
    });
}

// Exécute un appel AJAX POST
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
// Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON
function ajaxPost(url, data, isJson) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("POST", url);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                resolve(req.responseText);
            } else {
                reject(Error(req.status + " > " + req.statusText + " > " + url));
            }
        });
        req.onerror = function() {
            reject(Error("Erreur réseau avec l'URL " + url));
        };
        if (isJson) {
            // Définit le contenu de la requête comme étant du JSON
            req.setRequestHeader("Content-Type", "application/json");
            // Transforme la donnée du format JSON vers le format texte avant l'envoi
            data = JSON.stringify(data);
        }
        req.send(data);
    });
}