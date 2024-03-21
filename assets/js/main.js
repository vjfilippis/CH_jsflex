const preloadMessage = document.getElementById('preloadMessage');
const unidadId = document.getElementById("unidadId");
const unidadNombre = document.getElementById("unidadNombre");
const unidadPiso = document.getElementById("unidadPiso");
const unidadCategoria = document.getElementById("unidadCategoria");
const unidadCapacidad = document.getElementById("unidadCapacidad");
const unidadObservaciones = document.getElementById("unidadObservaciones");
const unidadesLista = document.getElementById("unidadesLista");
const mainBtn = document.getElementById("mainBtn");

let unidades = [];
let pisos;
let categorias;
let capacidades;
let gIndex;

function simulatePreload() {        
    return new Promise(resolve => {
        setTimeout(() => {
            preloadMessage.style.display = "none";
            resolve();
        }, 2000);
    });
}

function fetchData(url) {
    return new Promise(async (resolve, reject) => {
        try {
            await simulatePreload(); // Esperar a que termine la precarga
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

function addItem() {
    if (nameregex() && pisoregex() && catregex() && capacregex()) {
        const productobject = {
            uNombre: unidadNombre.value,
            uPiso: unidadPiso.value,
            uCategoria: unidadCategoria.value,
            uCapacidad: unidadCapacidad.value,
            uObservacion: unidadObservaciones.value,
        };
        unidades.push(productobject);
        display(unidades);
        localStorage.setItem("data", JSON.stringify(unidades));
        clear()
    }
}

function check() {
    unidades = JSON.parse(localStorage.getItem("data")) || [];
    display(unidades);
}

function display(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
        <tr>
            <td>${i + 1}</td>
            <td>${arr[i].uNombre}</td>
            <td>${arr[i].uPiso}</td>
            <td>${arr[i].uCategoria}</td>
            <td>${arr[i].uCapacidad}</td>
            <td>${arr[i].uObservacion}</td>
            <td>
            <button class="btn btn-sm btn-danger  me-3" onclick="Del(${i})"><i class="bi bi-trash-fill"></i> Eliminar</button>
            <button class="btn btn-sm btn-warning" onclick="Update(${i})"><i class="bi bi-pencil-square"></i> Editar</button>
            </td>

        </tr>
        `;
    }
    unidadesLista.innerHTML = box;
}

function Del(index) {
    unidades.splice(index, 1);
    display(unidades);
    localStorage.setItem("data", JSON.stringify(unidades)); 
}

function Update(index) {
    gIndex = index;
    unidadNombre.value = unidades[index].uNombre;
    unidadPiso.value = unidades[index].uPiso;
    unidadCategoria.value = unidades[index].uCategoria;
    unidadCapacidad.value = unidades[index].uCapacidad;
    unidadObservaciones.value = unidades[index].uObservacion;
    mainBtn.innerHTML = "Guardar";
}

function edit() {
    if (nameregex() && pisoregex() && catregex() && capacregex()) {
        unidades[gIndex].uNombre = unidadNombre.value;
        unidades[gIndex].uPiso = unidadPiso.value;
        unidades[gIndex].uCategoria = unidadCategoria.value;
        unidades[gIndex].uCapacidad = unidadCapacidad.value;
        unidades[gIndex].uObservacion = unidadObservaciones.value;
        display(unidades);
        localStorage.setItem('data', JSON.stringify(unidades))
        mainBtn.innerHTML = 'Agregar'
        clear()
    }
}

function clear() {
    unidadNombre.value = "";
    unidadPiso.value = "";
    unidadCategoria.value = "";
    unidadCapacidad.value ="";
    unidadObservaciones.value = "";
}

function search(ele) {
    let searchedarr = [];
    for (let i = 0; i < unidades.length; i++) {
        if (unidades[i].uNombre.toLowerCase().includes(ele.value.toLowerCase())) {
            searchedarr.push(unidades[i])
        }
    }
    display(searchedarr)
}

function fullSelect(array, idSelect) {
    const select = document.getElementById(idSelect);
    array.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

// Controles y validaciones

function nameregex() {
    const regex = /[a-zA-Z]{1,20}/
        if (regex.test(unidadNombre.value)) {
            return true;
        } else {
            //alert("Falta Nombre");
            Swal.fire("Falta campo nombre");
            return false;
        }
}

function pisoregex() {
    const regex = /[0-9]{1,10}/
    if (regex.test(unidadPiso.value)) {
        return true;
    } else {
        //alert("Falta Piso");
        Swal.fire("Falta campo Piso");
        return false;
    }
}

function catregex() {
    const regex = /[a-zA-Z]{1,10}/
    if (regex.test(unidadCategoria.value)) {
        return true;
    } else {
        //alert("Falta Categoria");
        Swal.fire("Falta campo Categoria");
        return false;
    }
}

function capacregex() {
    const regex = /[0-9]{1,10}/
    if (regex.test(unidadCapacidad.value)) {
        return true;
    } else {
        //alert("Falta Capacidad");
        Swal.fire("Falta campo Capacidad");
        return false;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Cargar los datos del local storage al inicio
    check();

    fetchData('./data/parametros.json')
        .then(data => {
            //console.log('Datos obtenidos:', data);
            //alert('¡El JSON se cargó con éxito!');
            
            // Extraer el array 'unidades' del JSON
            const unidadesJSON = data.unidades;

            // Insertar los elementos de 'unidadesJSON' al inicio de 'unidades'
            if (unidades.length === 0) {
                unidadesJSON.forEach(unidad => {
                    unidades.unshift(unidad);
                });
            }

            // Extraer otros arrays del JSON
            pisos = data.Pisos;
            fullSelect(pisos, "unidadPiso");

            categorias = data.Categorias;
            fullSelect(categorias, "unidadCategoria");

            // Mostrar unidades actualizado en la consola
            //console.log('unidades actualizado:', unidades);
            
            // Mostrar unidades en la tabla
            display(unidades);
        })
        .catch(error => {
            //console.error('Hubo un problema con la operación de fetch:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo Salio Mal!",
                footer: '<a href="#">Realiza tu reclamo haciendo clic aquí</a>'
            });
        });

    // Evento click del botón principal
    mainBtn.onclick = () => {
        if (mainBtn.innerHTML == "Agregar") addItem();
        else edit();
    };
});
