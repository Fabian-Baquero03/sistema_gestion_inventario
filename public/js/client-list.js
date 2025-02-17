$(document).ready(function () {
    let currentPage = 1;
    const clientsPerPage = 15;
    let totalClients = 0;

    // Función para cargar los productos
    function loadClients(page) {
        $.getJSON("http://localhost:3000/clientes", function (data) {
            totalClients = data.length;
            const start = (page - 1) * clientsPerPage;
            const end = start + clientsPerPage;

            // Filtrar los productos para la página actual
            const clientsToDisplay = data.slice(start, end);

            if (clientsToDisplay.length > 0) {
                let clientRows = '';
                clientsToDisplay.forEach(function (cliente) {
                    clientRows += `
                        <tr class="text-center">
                            <td>${cliente.nit}</td>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.apellido}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.direccion}</td>
                            
                        </tr>
                    `;
                });
                $('#clientList').html(clientRows);
            } else {
                $('#clientList').html('<tr><td colspan="6" class="text-center">No hay clientes disponibles</td></tr>');
            }

            // Generar los botones de paginación
            generatePagination(page);
        }).fail(function () {
            $('#clientList').html('<tr><td colspan="6" class="text-center">Error al cargar los clientes</td></tr>');
        });
    }

    // Función para generar los botones de paginación
    function generatePagination(page) {
        const totalPages = Math.ceil(totalClients / clientsPerPage);
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
        loadClients(currentPage);
    });

    // Manejar el clic en el botón "Anterior"
    $(document).on('click', '#prevPage', function () {
        if (currentPage > 1) {
            currentPage--;
            loadClients(currentPage);
        }
    });

    // Manejar el clic en el botón "Siguiente"
    $(document).on('click', '#nextPage', function () {
        if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
            currentPage++;
            loadClients(currentPage);
        }
    });

    // Cargar los productos de la primera página al iniciar
    loadClients(currentPage);
});
