const modal = document.getElementById("miModal");
const btnAbrir = document.getElementById("abrirModal");
const btnCerrar = document.getElementById("cerrarModal");

btnAbrir.addEventListener("click", function() {
    modal.style.display = "block";
});


function generateRandomLetter() {
    var letras = "abcdefghijklmnopqrstuvwxyz";
    var randomLetter = letras.charAt(Math.floor(Math.random() * letras.length));
    document.getElementById("randomLetterContainer").textContent = randomLetter;
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
        console.log(result)
        alert("la respuesta es correcta")
    }).catch((error) => {
        console.log(error)
        alert("la respuesta es incorrecta")
    });
    
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


    

   