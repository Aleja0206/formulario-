var puntaje_final=0
var contador_intentos= 10
var letrasramdon=[];

function openModalsfinalscore(puntaje_final){
    document.getElementById("modal1").style.display = "block";
    document.getElementById("Puntaje").textContent=puntaje_final;
}
function openModals(capital){
    document.getElementById("modal").style.display = "block";
    document.getElementById("capital").textContent=capital;
}
function closeModals1(){
    document.getElementById("modal1").style.display = "none";
}
function closeModals(){
    document.getElementById("modal").style.display = "none";
}

async function getCapital(nombrecapital) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`https://restcountries.com/v3.1/capital/${nombre}`, requestOptions);

    if (response.status === 200) {
        const data = await response.json();
        return data[0].capital;
    } else {
        throw new Error("La capital del país no es válida.");
    }
}


function generateRandomLetter() {
    var letras = "abcdefghijklmnopqrstuvwxyz";
    letrasfinal=letras.split("").map(letter =>{
        if (!letrasramdon.includes(letter)){
            return letter;
        }
        return"";
        });
    letras=letrasfinal.join("")
    var randomLetter = letras.charAt(Math.floor(Math.random() * letras.length));
    document.getElementById("randomLetterContainer").textContent = randomLetter;
}
function contadorIntentos(){
    contador_intentos--;
    if (contador_intentos==0){
        openModalsfinalscore(puntaje_final)
    };
        
    document.getElementById("contador").textContent=contador_intentos
    
}

function actualizarValor(resultado) {
    if (contador_intentos==0){
        puntaje_final=0
        contador_intentos=10
    }
    puntaje_final=puntaje_final+resultado;
    document.getElementById("puntaje").textContent=puntaje_final

}

function validaPais(){
    var nombrePais=document.getElementById("nombre").value;
    var randomLetter=document.getElementById("randomLetterContainer").textContent;
    letrasramdon.push(randomLetter);
    if (nombrePais === "") {
        alert("Debe ingresar un país");
        return false;
    }
    console.log(nombrePais,randomLetter,letrasramdon)
    if (nombrePais.charAt(0) !== randomLetter) {
        alert("El nombre del país no comienza con la letra generada");
        return false;
    }
    return;
    getCountry(nombrePais).then((result) => {
        const capital=(buscacapital(result,"capital"))
        actualizarValor(5);
        openModals(capital)
    }).catch((error) => {
        console.log(error)
        actualizarValor(-3);
        alert("la respuesta es incorrecta")
    });
    
}  
async function validaCiudad(){
    var nombreCiudad=document.getElementById("ciudad").value;
    var randomLetter=document.getElementById("randomLetterContainer").textContent;
    if (nombreCiudad === "") {
        alert("Debe ingresar una ciudad");
        return false;
    }
    console.log(nombreCiudad,randomLetter,letrasramdon)
    if (nombreCiudad.charAt(0) !== randomLetter) {
        alert("El nombre de la ciudad no comienza con la letra generada");
        return false;
    }
    getciudad(nombreCiudad).then((result) => {
        const ciudad=((result,"ciudad"))
        actualizarValor(5);
    }).catch((error) => {
        console.log(error)
        actualizarValor(-3);
        alert("la respuesta es incorrecta")
    });
}

function buscacapital (object, llave){
    return object[0][llave][0]
}
async function getciudad(){
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "HVBLGZcH3P2N0oJJETBw/g==ONrkKh20pIoY1k1w");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'};    

    fetch("https://api.api-ninjas.com/v1/city?name=bogota", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
async function getCountry(name){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
    const response = await fetch("https://restcountries.com/v3.1/translation/"+name, requestOptions);
    if (response.status==200){
    const data = await response.json();
     
    return data;
    }
    throw new Error("Country not found");
}


    

   