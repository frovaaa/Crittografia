var testoLetto = "";
var testoCriptato = "";
var testoDecriptato = "";
var key = "";
var load = false;
var flagCript;

function criptazione() {                             //criptazione
    //if (testoLetto == "") testoLetto = btoa(document.getElementById("textPreview").value);
    let chiave;
    if (document.getElementById("sel_key2").checked) chiave = document.getElementById("keyOutput").value;
    else if (document.getElementById("sel_key1").checked) chiave = document.getElementById("keyManual").value;

    testoCriptato = "";
    var h = 0;
    for (var i = 0; i < testoLetto.length; i++) {
        //Ciclo di decrittazione che somma al carattere del testo da criptare il carattere della chiave
        var carattere = (testoLetto[i].charCodeAt() + chiave[h].charCodeAt());
        carattere = String.fromCharCode(carattere);
        testoCriptato = testoCriptato + carattere;
        h++;
        if (h >= chiave.length) {
            //Se raggiungo la fine della chiave riparto dal suo inizio
            h = 0;
        }
    }
    document.getElementById("criptedPreview").innerHTML = testoCriptato;
    //console.log("testo:" + testoCriptato);
}

function decriptazione() {
    var chiaveDec;

    //Controllo se la chiave è stata inserita via testo o file
    if (!load) chiaveDec = document.getElementById("keyManual").value;
    else chiaveDec = key;

    var testo_criptato = document.getElementById("textPreview").value;
    testodecriptato = "";
    var h = 0;
    //Ciclo di decrittazione che sottrae il carattere della chiave al carattere del testo criptato
    for (var i = 0; i < testo_criptato.length; i++) {
        var carattere = (testo_criptato[i].charCodeAt() - chiaveDec[h].charCodeAt());
        //console.log(testo_criptato[i] + " val : " + testo_criptato[i].charCodeAt());
        //console.log(chiaveDec[h] + " val : " + chiaveDec[h].charCodeAt());
        //console.log("num carattere :" + carattere);
        carattere = String.fromCharCode(carattere);
        //console.log("char carattere :" + carattere);
        testodecriptato = testodecriptato + carattere;
        h++;
        if (h >= chiaveDec.length) {
            h = 0;
        }
    }
    document.getElementById("decriptedPreview").innerHTML = testodecriptato;
    testoDecriptato = testodecriptato;
    //console.log(testodecriptato);
}

function loadFileAsText(asText) {
    //Funzione che permette la lettura come stringa di un file caricato
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        testoLetto = fileLoadedEvent.target.result;
        document.getElementById("textPreview").innerHTML = testoLetto;
    };
    if (asText) fileReader.readAsText(fileToLoad, "UTF-8");
    else fileReader.readAsDataURL(fileToLoad);
}

function loadKeyFileAsText() {          //caricamento e lettura del file
    //Funzione che permette la lettura come stringa di un file caricato
    load = true;
    var fileToLoad = document.getElementById("keyFile").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        key = fileLoadedEvent.target.result;
        document.getElementById("keyManual").innerHTML = key;
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
}

function downloadBase64File(fileName, dec) {
    contentBase64 = (dec) ? testoDecriptato : testoCriptato;    //Distinzione se devo far scaricare il file decriptato o non
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = ((dec) ? contentBase64 : 'data:text/plain;charset=utf-8,' + contentBase64);     //Assemblo la stringa base64 che andrà poi fatta scaricare
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click();
    document.body.removeChild(downloadLink);    //Distruggo il link nascosto creato
}

function saveKey() {                                                // funzione per salvare la chaive
    var text = document.getElementById("keyOutput").value;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));  //Assemblo la stringa base64 che andrà poi fatta scaricare
    element.setAttribute('download', "savedKey.pem");

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); //Distruggo il link nascosto creato
}

function copyKey() {
    navigator.clipboard.writeText(document.getElementById("keyOutput").value);  //Copio la chiave all'interno della clipboard dell'utente
}

function showKeyLenght(value) {
    document.getElementById("keyLabel").innerText = "Lunghezza chiave: " + value;
}

function chiave() {
    var chiave = ""; //Variabile dove verra' salvata la chiave
    // Prendo il valore della lunghezza della chiave
    let l = parseInt(document.getElementById("keyLength").value);
    //Modifico la UI
    showKeyLenght(l);

    //Oggetto dell'area di testo
    let objOut = document.getElementById("keyOutput");

    //Genero la chiave attraverso la generazione di caratteri valori numerici casuali tra 33 e 126 che poi andranno convertiti in char
    for (let i = 0; i < l; i++) chiave += String.fromCharCode(Math.floor(Math.random() * (126 - 33) + 33));

    objOut.value = chiave;

    KeyMode();
}

function KeyMode() {
    //Funzione per indicare con che modalita' si vuola inserire la chiave
    if (document.getElementById("sel_key2").checked) {
        document.getElementById("genChiave").style.display = "block";
    } else {
        document.getElementById("genChiave").style.display = "none";
    }

    if (document.getElementById("sel_key1").checked) {
        document.getElementById("insChiave").style.display = "block";
    } else {
        document.getElementById("insChiave").style.display = "none";
    }
}