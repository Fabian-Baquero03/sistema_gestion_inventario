$(document).ready(function () {
    let currentPage = 1;
    const productsPerPage = 15;
    let totalProducts = 0;

    // Función para cargar los productos
    function loadProducts(page) {
        $.getJSON("http://localhost:3000/productos", function (data) {
            totalProducts = data.length;
            const start = (page - 1) * productsPerPage;
            const end = start + productsPerPage;

            // Filtrar los productos para la página actual
            const productsToDisplay = data.slice(start, end);

            if (productsToDisplay.length > 0) {
                let productRows = '';
                productsToDisplay.forEach(function (producto) {
                    productRows += `
                        <tr class="text-center">
                            <td>${producto.id}</td>
                            <td>${producto.marca}</td>
                            <td>${producto.procesador}</td>
                            <td>${producto.ram}</td>
                            <td>${producto.almacenamiento}</td>
                            <td>${producto.tipo}</td>
                        </tr>
                    `;
                });
                $('#productList').html(productRows);
            } else {
                $('#productList').html('<tr><td colspan="6" class="text-center">No hay productos disponibles</td></tr>');
            }

            // Generar los botones de paginación
            generatePagination(page);
        }).fail(function () {
            $('#productList').html('<tr><td colspan="6" class="text-center">Error al cargar los productos</td></tr>');
        });
    }

    // Función para generar los botones de paginación
    function generatePagination(page) {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        let paginationButtons = '';

        // Botón de "anterior"
        if (page > 1) {
            paginationButtons += `<button class="btn btn-secondary" id="prevPage">Anterior</button>`;
        }

        // Botones numéricos
        for (let i = 1; i <= totalPages; i++) {
            paginationButtons += `
                <button class="btn btn-primary page-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>
            `;
        }

        // Botón de "siguiente"
        if (page < totalPages) {
            paginationButtons += `<button class="btn btn-secondary" id="nextPage">Siguiente</button>`;
        }

        // Agregar la paginación al contenedor
        $('#pagination').html(paginationButtons);
    }

    // Manejar el clic en los botones de la paginación
    $(document).on('click', '.page-btn', function () {
        currentPage = $(this).data('page');
        loadProducts(currentPage);
    });

    // Manejar el clic en el botón "Anterior"
    $(document).on('click', '#prevPage', function () {
        if (currentPage > 1) {
            currentPage--;
            loadProducts(currentPage);
        }
    });

    // Manejar el clic en el botón "Siguiente"
    $(document).on('click', '#nextPage', function () {
        if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
            currentPage++;
            loadProducts(currentPage);
        }
    });

    // Cargar los productos de la primera página al iniciar
    loadProducts(currentPage);
});
