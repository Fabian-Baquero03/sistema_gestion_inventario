$(document).ready(function () {
    $('#searchProduct').click(function () {
        var productId = $('#productId').val();

        if (productId) {
            // Buscar el producto por su ID
            $.getJSON(`http://localhost:3000/buscar-producto/${productId}`, function (data) {
                if (data) {
                    $('#productDetails').html(`
                        <tr class="text-center">
                            <td>${data.id}</td>
                            <td><input type="text" class="form-control" value="${data.marca}" id="editMarca"></td>
                            <td><input type="text" class="form-control" value="${data.procesador}" id="editProcesador"></td>
                            <td><input type="text" class="form-control" value="${data.ram}" id="editRam"></td>
                            <td><input type="text" class="form-control" value="${data.almacenamiento}" id="editAlmacenamiento"></td>
                            <td><input type="text" class="form-control" value="${data.tipo}" id="editTipo"></td>
                            <td>
                                <button class="btn btn-warning" id="updateProduct" data-id="${data.id}">
                                    <i class="far fa-edit"></i> Actualizar
                                </button>
                                <button class="btn btn-danger" id="deleteProduct" data-id="${data.id}">
                                    <i class="far fa-trash-alt"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    `);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Producto no existe',
                        text: 'No se encontró un producto con ese ID.',
                        confirmButtonColor: '#3085d6',
                    });
                }
            }).fail(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se encontró un producto con ese ID.',
                    confirmButtonColor: '#3085d6',
                });
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'Por favor, ingrese un ID de producto.',
                confirmButtonColor: '#3085d6',
            });
        }
    });

  // Actualizar producto
  $(document).on('click', '#updateProduct', function () {
    var productId = $(this).data('id');
    var updatedProduct = {
        id: productId,  // Este es el ID que no debe cambiar
        marca: $('#editMarca').val(),
        procesador: $('#editProcesador').val(),
        ram: $('#editRam').val(),
        almacenamiento: $('#editAlmacenamiento').val(),
        tipo: $('#editTipo').val(),
    };

    // Comprobamos que los datos no estén vacíos
    if (!updatedProduct.marca || !updatedProduct.procesador || !updatedProduct.ram || !updatedProduct.almacenamiento || !updatedProduct.tipo) {
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
        url: `http://localhost:3000/actualizar-producto/${productId}`,
        type: 'PUT',
        contentType: 'application/json',  // Especificamos que el contenido es JSON
        data: JSON.stringify(updatedProduct),  // Convertimos el objeto en JSON
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Producto actualizado',
                text: 'El producto ha sido actualizado correctamente.',
                confirmButtonColor: '#28a745',
                showConfirmButton: false,
                timer: 1500
            });

            // Limpiar el campo de búsqueda y la tabla
            $('#productId').val('');  // Limpiar el campo de ID
            $('#productDetails').html('');  // Limpiar los resultados de la tabla
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar el producto.',
                confirmButtonColor: '#3085d6',
            });
        }
    });
});

// Eliminar producto
$(document).on('click', '#deleteProduct', function () {
    var productId = $(this).data('id');



    

    // Confirmar eliminación
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        $.ajax({
            url: `http://localhost:3000/eliminar-producto/${productId}`,
            type: 'DELETE',
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: 'El producto ha sido eliminado correctamente.',
                    confirmButtonColor: '#28a745',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Limpiar el campo de búsqueda y la tabla
            $('#productId').val('');  // Limpiar el campo de ID
            $('#productDetails').html('');  // Limpiar los resultados de la tabla
            },
            error: function () {
                alert('Hubo un error al eliminar el producto');
            }
        });
    }




});
});





