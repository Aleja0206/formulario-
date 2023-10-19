const localStorage = window.localStorage;
function precargarDatos(){
    console.log("hola mundo")
    console.log(localStorage.getItem('nombre'))
    console.log(localStorage.getItem('fechaNacimiento'))
    console.log(localStorage.getItem('telefono'))
    var nombre=document.getElementById("nombre");
    if (localStorage.getItem("nombre")!==null){
        nombre.value=localStorage.getItem("nombre");
        var fechaNacimiento= document.getElementById("fechaNacimiento");
        fechaNacimiento.value=localStorage.getItem('fechaNacimiento');
        var telefono= document.getElementById("telefono");
        telefono.value=localStorage.getItem("telefono")
    }
        
}
function validaFormulario() {
    
    var nombre = document.getElementById('nombre').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    var telefono = document.getElementById('telefono').value;
    var fechaActual = new Date();
    var fechaNacimientoDate = new Date(fechaNacimiento);
    if (fechaNacimientoDate > fechaActual) {
        alert('La fecha de nacimiento no puede ser igual o mayor al día presente.');
        return;
    }
    if (!/^[a-zA-Z ]+$/.test(nombre)) {
        alert('El nombre solo puede contener letras y espacios.');
        return;
    }
    if (!/^\+[0-9]+$/.test(telefono)) {
        alert('El número de teléfono solo puede contener números y un +.');
        return;
    }
    document.getElementById('miFormulario').submit();
   
   
    localStorage.setItem("nombre",document.getElementById('nombre').value);
    localStorage.setItem("fechaNacimiento", document.getElementById('fechaNacimiento').value);
    localStorage.setItem("telefono",document.getElementById('telefono').value)
  
    
}
