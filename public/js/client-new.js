$(document).ready(function () {
    $('form').on('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        // Capturar los datos del formulario
        const nuevoCliente = {
            nit: $('#cliente_nit').val(),
            nombre: $('#cliente_nombre').val(),
            apellido: $('#cliente_apellido').val(),
            telefono: $('#cliente_telefono').val(),
            direccion: $('#cliente_direccion').val()
        };

        // Validar que todos los campos estén llenos
        if (!nuevoCliente.nit || !nuevoCliente.nombre || !nuevoCliente.apellido || !nuevoCliente.telefono || !nuevoCliente.direccion) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos del formulario.'
            });
            return;
        }

        // Enviar los datos al servidor mediante AJAX
        $.ajax({
            url: 'http://localhost:3000/registrar-cliente',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevoCliente),
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: response.message
                }).then(() => {
                    // Limpiar el formulario
                    $('form')[0].reset();
                });
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el cliente.'
                });
            }
        });
    });
});
