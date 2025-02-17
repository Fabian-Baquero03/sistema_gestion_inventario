$(document).ready(function () {
    $('#searchClient').click(function () {
        var clientNit = $('#clientNit').val();

        if (clientNit) {
            // Buscar el cliente por su NIT
            $.getJSON(`http://localhost:3000/buscar-cliente/${clientNit}`, function (data) {
                if (data) {
                    $('#clientDetails').html(`
                        <tr class="text-center">
                            <td>${data.nit}</td>
                            <td><input type="text" class="form-control" value="${data.nombre}" id="editNombre"></td>
                            <td><input type="text" class="form-control" value="${data.apellido}" id="editApellido"></td>
                            <td><input type="text" class="form-control" value="${data.telefono}" id="editTelefono"></td>
                            <td><input type="text" class="form-control" value="${data.direccion}" id="editDireccion"></td>
                            
                            <td>
                                <button class="btn btn-warning" id="updateClient" data-nit="${data.nit}">
                                    <i class="far fa-edit"></i> Actualizar
                                </button>
                                <button class="btn btn-danger" id="deleteClient" data-nit="${data.nit}">
                                    <i class="far fa-trash-alt"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    `);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cliente no existe',
                        text: 'No se encontró un cliente con ese NIT.',
                        confirmButtonColor: '#3085d6',
                    });
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(`Error: ${textStatus}, ${errorThrown}`);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener el cliente',
                    text: `Detalles del error: ${errorThrown}`,
                    confirmButtonColor: '#3085d6',
                });
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'Por favor, ingrese un NIT de Cliente.',
                confirmButtonColor: '#3085d6',
            });
        }
    });

 
////////////////////


     // Actualizar producto
  $(document).on('click', '#updateClient', function () {
    var clientNit = $(this).data('nit');
    var updatedClient = {
        nit: clientNit,  // Este es el ID que no debe cambiar
        nombre: $('#editNombre').val(),
        apellido: $('#editApellido').val(),
        telefono: $('#editTelefono').val(),
        direccion: $('#editDireccion').val(),
        
    };

    // Comprobamos que los datos no estén vacíos
    if (!updatedClient.nombre || !updatedClient.apellido || !updatedClient.telefono || !updatedClient.direccion) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos.',
            confirmButtonColor: '#3085d6',
        });
        return;
    }

    // Enviar la actualización al servidor
    $.ajax({
        url: `http://localhost:3000/actualizar-cliente/${clientNit}`,
        type: 'PUT',
        contentType: 'application/json',  // Especificamos que el contenido es JSON
        data: JSON.stringify(updatedClient),  // Convertimos el objeto en JSON
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'cliente actualizado',
                text: 'El cliente ha sido actualizado correctamente.',
                confirmButtonColor: '#28a745',
                showConfirmButton: false,
                timer: 1500
            });

            // Limpiar el campo de búsqueda y la tabla
            $('#clientNit').val('');  // Limpiar el campo de ID
            $('#clientDetails').html('');  // Limpiar los resultados de la tabla
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar el cliente.',
                confirmButtonColor: '#3085d6',
            });
        }
    });
});

// Eliminar producto
$(document).on('click', '#deleteClient', function () {
    var clientNit = $(this).data('nit');

    // Confirmar eliminación
    if (confirm('¿Estás seguro de que deseas eliminar el cliente?')) {
        $.ajax({
            url: `http://localhost:3000/eliminar-cliente/${clientNit}`,
            type: 'DELETE',
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente eliminado',
                    text: 'El cliente ha sido eliminado correctamente.',
                    confirmButtonColor: '#28a745',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Limpiar el campo de búsqueda y la tabla
            $('#clientNit').val('');  // Limpiar el campo de ID
            $('#clientDetails').html('');  // Limpiar los resultados de la tabla
            },
            error: function () {
                alert('Hubo un error al eliminar el cliente');
            }
        });
    }




});
});
