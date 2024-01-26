// Curso: JavaScript Flex
// Comision: 55985
// Profesor: Jesus Gabriel Jorge
// Alumno: Javier Filippis
// Pre entrega 1

const unidades = [
    {
        unidad: "PB01",
        piso: "PB",
        capacidad: "2",
    },{
        unidad: "PB02",
        piso: "PB",
        capacidad: "3",
    },{
        unidad: "PB03",
        piso: "PB",
        capacidad: "4",
    },{
        unidad: "PB04",
        piso: "PB",
        capacidad: "5",
    }
];

// Mostramos la tabla a modo de referencia
console.log("Estado actual de unidades activas:");
console.table(unidades);

// Función para agregar una unidad
const agregarUnidad = () => {
    const nuevaUnidad = prompt("Ingrese número de habitación o unidad a agregar");

    // Verificar si la unidad ya existe
    const unidadExistente = unidades.find(u => u.unidad === nuevaUnidad);
    if (unidadExistente) {
        alert(`La unidad ${nuevaUnidad} ya existe. Por favor, ingrese una unidad diferente.`);
        agregarUnidad(); // Reiniciar el proceso
        return; // Salir de la función para evitar la ejecución del código restante
    }

    const piso = prompt("Ingrese piso de la unidad");
    const capacidad = prompt("Ingrese capacidad de la unidad");

    const nuevaUnidadObj = {
        unidad: nuevaUnidad,
        piso: piso,
        capacidad: capacidad
    };
    unidades.push(nuevaUnidadObj);

    // Mensaje de confirmación
    alert(`La unidad ${nuevaUnidad} ha sido agregada.`);

    // Mostramos la tabla de unidades después de la operación
    console.table(unidades);
};

////////////////////////////////////////////////////////////////////////////

// Función para eliminar una unidad 
const eliminarUnidad = () => {
    const unidadEliminar = prompt("Ingrese el número de la unidad que desea eliminar");

    // Verificar si la unidad existe
    const index = unidades.findIndex(u => u.unidad === unidadEliminar);
    if (index === -1) {
        alert(`La unidad ${unidadEliminar} no fue encontrada. Por favor, ingrese un número de unidad válido.`);
        eliminarUnidad(); // Reiniciar el proceso
        return; // Salir de la función para evitar la ejecución del código restante
    }

    // Confirmar la eliminación
    const confirmacion = confirm(`¿Está seguro de que desea eliminar la unidad ${unidadEliminar}?`);
    if (confirmacion) {
        // Eliminar la unidad
        unidades.splice(index, 1);
        console.log(`La unidad ${unidadEliminar} ha sido eliminada.`);
        alert(`La unidad ${unidadEliminar} ha sido eliminada.`);
    } else {
        console.log(`La eliminación de la unidad ${unidadEliminar} fue cancelada.`);
    }
};

////////////////////////////////////////////////////////////////////////////


// Función para editar una unidad
const editarUnidad = () => {
    const unidadEditar = prompt("Ingrese el número de la unidad que desea editar");

    // Verificar si la unidad existe
    const index = unidades.findIndex(u => u.unidad === unidadEditar);
    if (index === -1) {
        alert(`La unidad ${unidadEditar} no fue encontrada. Por favor, ingrese un número de unidad válido.`);
        editarUnidad(); // Reiniciar el proceso
        return; // Salir de la función para evitar la ejecución del código restante
    }

    // Obtener los nuevos datos para la unidad
    const nuevoPiso = prompt("Ingrese el nuevo piso de la unidad (deje en blanco para mantener el valor original)") || unidades[index].piso;
    const nuevaCapacidad = prompt("Ingrese la nueva capacidad de la unidad (deje en blanco para mantener el valor original)") || unidades[index].capacidad;

    // Actualizar los datos de la unidad solo si se proporciona un valor no vacío
    if (nuevoPiso.trim() !== "") {
        unidades[index].piso = nuevoPiso;
    }
    if (nuevaCapacidad.trim() !== "") {
        unidades[index].capacidad = nuevaCapacidad;
    }

    console.log(`La unidad ${unidadEditar} ha sido editada.`);
    alert(`La unidad ${unidadEditar} ha sido editada.`);
};

// Función para obtener la operación del usuario
const obtenerOperacion = () => {
    let operacion;

    do {
        operacion = prompt("¿Qué operación desea realizar? (Agregar/Eliminar/Editar/Salir)");

        if (operacion !== null && operacion.trim() === "") {
            alert("Por favor, ingrese una operación válida.");
        }
    } while (operacion !== null && operacion.trim() === "");

    return operacion ? operacion.toLowerCase() : null;
};

// Función para repetir la selección de operación
const repetirOperacion = () => {
    do {
        const nuevaOperacion = obtenerOperacion();
        if (nuevaOperacion !== null) {
            return nuevaOperacion;
        } else {
            alert("Operación no válida. Por favor, elija 'Agregar', 'Eliminar', 'Editar' o 'Salir'.");
        }
    } while (true);
};

// Obtener la operación del usuario
let operacionUsuario = repetirOperacion();

// Verificar si se proporcionó una operación válida
while (operacionUsuario !== "salir") {
    // Según la operación seleccionada, llamar a la función correspondiente
    if (operacionUsuario === "agregar") {
        agregarUnidad();
    } else if (operacionUsuario === "eliminar") {
        eliminarUnidad();
    } else if (operacionUsuario === "editar") {
        editarUnidad();
    } else {
        alert("Operación no válida. Por favor, elija 'Agregar', 'Eliminar', 'Editar' o 'Salir'.");
    }

    // Mostramos la tabla de unidades después de la operación
    console.table(unidades);

    // Obtener la siguiente operación del usuario
    operacionUsuario = repetirOperacion();
}

alert("Proceso finalizado. ¡Hasta luego!");

