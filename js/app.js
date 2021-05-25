// Variables
const carrito           = document.querySelector('#carrito'),
      contenedorCarrito = document.querySelector('#lista-carrito tbody'),
      vaciarCarritoBtn  = document.querySelector('#vaciar-carrito'),
      listaCursos       = document.querySelector('#lista-cursos');
let   articuloCarrito   = [];

const cargarEventListerner = () => {

    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos
    carrito.addEventListener('click', eliminaCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

const agregarCurso = (e) => {

    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
            leerDatosCursos(cursoSeleccionado)
    }

}

const eliminaCurso = (e) => {

    if( e.target.classList.contains('borrar-curso')){
        
        const cursoID = e.target.getAttribute('data-id');

        articuloCarrito = articuloCarrito.filter( curso => curso.id !== cursoID );

        carritoHtml();

    }
}

const vaciarCarrito = () => {
    
    articuloCarrito = [];

    limpiarHtml();
}

// Lee el contenifo del HTML al que le dimos click

const leerDatosCursos = (curso) => {
    //console.log(curso);

    //crear un objeto con la informacion del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').innerText,
        precio: curso.querySelector('.precio span').innerText,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe
    const existe = articuloCarrito.some( curso => curso.id === infoCurso.id );

    if( existe ){

        const cursos = articuloCarrito.map( curso => {

            if( curso.id === infoCurso.id ) {

                curso.cantidad++;
                return curso; // Retorna el objeto modificado

            } else {

                return curso; // Retorna los objetos que no son duplicados

            }

        });
    
        articuloCarrito = [...cursos];

    } else {

        // agrega elementos al carrito
        articuloCarrito = [...articuloCarrito, infoCurso];

    }


    carritoHtml();

    console.log(articuloCarrito);

}

// Muestra el carrito de comprar en el html

const carritoHtml = () => {

    // Limpiar html
    limpiarHtml();

    // Recorre el carrito y genera el html
    articuloCarrito.forEach( ( { imagen, titulo, precio, cantidad, id } ) => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href= "#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        // agrega el htm del carrito al body
        contenedorCarrito.appendChild(row)
    });

}

const limpiarHtml = () => {

    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) { // Si el elemento tiene un hijo se sigue ejecutando

        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        
    }

}

cargarEventListerner();