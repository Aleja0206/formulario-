var puntaje_final=0
var contador_intentos= 10


function openModals(capital){
    document.getElementById("modal").style.display = "block";
    document.getElementById("capital").textContent=capital;
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
    var randomLetter = letras.charAt(Math.floor(Math.random() * letras.length));
    document.getElementById("randomLetterContainer").textContent = randomLetter;
}
function contadorIntentos(){
    contador_intentos--;
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
    if (nombrePais === "") {
        alert("Debe ingresar un país");
        return false;
    }
    console.log(nombrePais,randomLetter)
    if (nombrePais.charAt(0) !== randomLetter) {
        alert("El nombre del país no comienza con la letra generada");
        return false;
    }
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
function buscacapital (object, llave){
    return object[0][llave][0]
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


    

   