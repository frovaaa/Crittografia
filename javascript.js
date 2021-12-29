var testoLetto = "";
var testoCriptato = "";

function criptazione() {
    chiave = document.getElementById("keyOutput").value;
    testoCriptato = "";
    var h = 0;
    for (var i = 0; i < testoLetto.length; i++) {
        var carattere = (testoLetto[i].charCodeAt() + chiave[h].charCodeAt());
        //console.log(testoLetto[i] + " val : " + testoLetto[i].charCodeAt());
        //console.log(chiave[h] + " val : " + chiave[h].charCodeAt());
        //console.log("num carattere :" + carattere);
        carattere = String.fromCharCode(carattere);
        //console.log("char carattere :" + carattere);
        testoCriptato = testoCriptato + carattere;
        h++;
        if (h >= chiave.length) {
            h = 0;
        }
    }
    document.getElementById("criptedPreview").innerHTML = testoCriptato;
    //console.log("testo:" + testoCriptato);  // a vostra discrezione come returnare il testo <3
}

function decriptazione(chiave) // decidete voi come buttare dentro la chiave ed il testo criptato
{
    var testo_criptato = document.getElementById("textPreview").value;
    testodecriptato = "";
    var h = 0;
    for (var i = 0; i < testo_criptato.length; i++) {
        var carattere = (testo_criptato[i].charCodeAt() - chiave[h].charCodeAt());
        //console.log(testo_criptato[i] + " val : " + testo_criptato[i].charCodeAt());
        //console.log(chiave[h] + " val : " + chiave[h].charCodeAt());
        //console.log("num carattere :" + carattere);
        carattere = String.fromCharCode(carattere);
        //console.log("char carattere :" + carattere);
        testodecriptato = testodecriptato + carattere;
        h++;
        if (h >= chiave.length) {
            h = 0;
        }
    }
    document.getElementById("textPreview").innerHTML = testodecriptato;
    return testodecriptato;
    //console.log(testodecriptato); // a vostra discrezione come returnare il testo <3
}


function loadFileAsText() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        testoLetto = fileLoadedEvent.target.result;
        document.getElementById("textPreview").innerHTML = testoLetto;
    };
    fileReader.readAsDataURL(fileToLoad, "UTF-8");

}

function downloadBase64File(fileName, dec) {
    contentBase64 = (dec) ? testoLetto : testoCriptato; //TODO: Mettere caso per decriptazione
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = ((dec) ? contentBase64 : 'data:text/plain;charset=utf-8,' + contentBase64);
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click();
}

function copyKey() {
    navigator.clipboard.writeText(document.getElementById("keyOutput").value);
    //alert("Chiave copiata all'interno degli appunti!");
}

function saveKey(){
    var text = document.getElementById("keyOutput").value;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "savedKey.txt");

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function showKeyLenght(value) {
    document.getElementById("keyLabel").innerText = "Lunghezza chiave: " + value;
    //document.getElementById("keyOutput").setAttribute("rows", (value / 15));
}

function chiave() {
    var chiave = ""; //Variabile dove verra' salvata la
    //Prendo il valore della lunghezza della chiave
    let l = parseInt(document.getElementById("keyLength").value);
    //Modifico la UI
    showKeyLenght(l);

    //Oggetto dell'area di testo
    let objOut = document.getElementById("keyOutput");

    //Genero la chiave
    for (let i = 0; i < l; i++) chiave += String.fromCharCode(Math.floor(Math.random() * (126 - 33) + 33));

    objOut.value = chiave;
}
