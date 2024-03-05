const hotelDelMar = {
    pisos: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"],
    categorias: ["Superior", "Estándar"],
    capacidad: Array.from({ length: 20 }, (_, index) => index + 1), // Array de 1 a 20
    unidades: [
        { id: 1, piso: "P1", unidad: "P01", tipo: "Estándar", capacidad: 2 },
        { id: 2, piso: "P1", unidad: "P02", tipo: "Estándar", capacidad: 3 },
        { id: 3, piso: "P1", unidad: "P03", tipo: "Superior", capacidad: 2 },
        { id: 4, piso: "P1", unidad: "P04", tipo: "Superior", capacidad: 3 }
    ]
};

// Obtener registros del localStorage
const historialLocalStorage = localStorage.getItem("historial");

// Parsear registros del localStorage
const historialUnidades = historialLocalStorage ? JSON.parse(historialLocalStorage) : [];


let unidadesContainer = document.getElementById("lista-unidades");

function renderunidades(unidadesArray) {
    unidadesContainer.innerHTML = ""; // Limpiar el contenido existente
    unidadesArray.forEach(unidad => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<th scope="row">${unidad.id}</th>
                            <td>${unidad.piso}</td>
                            <td>${unidad.unidad}</td>
                            <td>${unidad.tipo}</td>
                            <td>${unidad.capacidad}</td>
                            <!-- <td><button type="button" class="btn btn-primary btn-sm unidadEditar abrirModal" data-id="${unidad.id}" data-modal="ModalEditarUnidad">Editar</button> <button type="button" class="btn btn-secondary btn-sm unidadEliminar" id="${unidad.id}">Eliminar</button></td> -->`;
        
        unidadesContainer.appendChild(fila);
    });

    addUnidad();
}

//aca renderizo y muestro la tabla
renderunidades(hotelDelMar.unidades);


// voy a necesitar los campos tipo seleccionables para el modal. 
// Función para llenar un select

function llenarSelect(array, idSelect) {
    const select = document.getElementById(idSelect);
    array.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

// Llenar los selects con los valores correspondientes
llenarSelect(hotelDelMar.pisos, "pisoSelect");
llenarSelect(hotelDelMar.categorias, "categoriaSelect");
llenarSelect(hotelDelMar.capacidad, "capacidadSelect");

function addUnidad() {
    const form = document.getElementById("formNuevaUnidad");
    
    const submitHandler = function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe
        
        const piso = form.piso.value;
        const unidad = form.unidad.value;
        const categoria = form.categoria.value;
        const capacidad = parseInt(form.capacidad.value); // Convertir a entero
        
        const nuevaUnidad = {
            id: hotelDelMar.unidades.length + 1, // Generar un nuevo ID
            piso: piso,
            unidad: unidad,
            tipo: categoria,
            capacidad: capacidad
        };

        // Agregar la nueva unidad al array de unidades
        hotelDelMar.unidades.push(nuevaUnidad);

        // Guardo y actualizado en el localStorage
        localStorage.setItem("unidades", JSON.stringify(hotelDelMar.unidades));

        // renderizo de vuelta la tabla
        renderunidades(hotelDelMar.unidades);

        // cerramos el modal
        const modal = document.getElementById("ModalAgregarUnidad");
        modal.classList.remove("show");

        // limpio el form del modal
        form.reset();

        // elimino el event porque sino se duplica
        form.removeEventListener("submit", submitHandler);
    };

    form.addEventListener("submit", submitHandler);
}

document.addEventListener("DOMContentLoaded", function() {

    const abrirModalLinks = document.querySelectorAll(".abrirModal");
    const cerrarModalBtns = document.querySelectorAll(".cerrarModal");


abrirModalLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Evita que el enlace siga el vínculo

        const modalId = link.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.classList.add("show");
    });
});

cerrarModalBtns.forEach(btn => {
    btn.addEventListener("click", function(event) {
        event.preventDefault(); // Evita que el botón realice su acción predeterminada

        const modal = btn.closest(".modal");
        modal.classList.remove("show");
    });
});
});

