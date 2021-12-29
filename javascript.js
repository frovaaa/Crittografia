var testoLetto = "";

function criptazione(chiave)
{
    testocriptato = "";
    var h = 0;
    for (var i = 0; i < testoLetto.length; i++) {

        var carattere = (testoLetto[i].charCodeAt() + chiave[h].charCodeAt());
        carattere = String.fromCharCode(carattere);
        testocriptato = testocriptato + carattere;
        h++;
        if (h >= chiave.length) {
            h = 0;
        }
    }

}

function loadFileAsText() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var readedText = fileLoadedEvent.target.result.split(/[\r\n]+/g);
        document.getElementById("textPreview").innerHTML = "";
        readedText.forEach((item, index) => {
            document.getElementById("textPreview").innerHTML += (item + "\n");
        });
        testoLetto = readedText;
    };
    fileReader.readAsDataURL(fileToLoad, "UTF-8");

}

function downloadBase64File(fileName) {
    contentBase64 = testoLetto;

    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = contentBase64;
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click();
}

function copyKey() {
    navigator.clipboard.writeText(document.getElementById("chiaveOutput").value);
}

function showKeyLenght(value) {
    document.getElementById("keyLabel").innerText = "Lunghezza chiave: " + value;
    //document.getElementById("chiaveOutput").setAttribute("rows", (value / 15));
}

function chiave() {
    var chiave = ""; //Variabile dove verra' salvata la
    //Prendo il valore della lunghezza della chiave
    let l = parseInt(document.getElementById("lunghezzaChiave").value);
    //Modifico la UI
    showKeyLenght(l);

    //Oggetto dell'area di testo
    let objOut = document.getElementById("chiaveOutput");

    //Genero la chiave
    for (let i = 0; i < l; i++) chiave += String.fromCharCode(Math.floor(Math.random() * (126 - 33) + 33));

    objOut.value = chiave;
}
