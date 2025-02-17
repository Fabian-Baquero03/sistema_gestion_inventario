document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.form-neon');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();  // Evita que el formulario se recargue al enviar

        const data = new FormData(formulario);  // Recoge los datos del formulario

        // Crear un objeto con los datos del formulario
        const producto = {
            marca: data.get('marca'),
            procesador: data.get('procesador'),
            ram: data.get('ram'),
            almacenamiento: data.get('almacenamiento'),
            tipo: data.get('tipo')
        };

        // Enviar los datos al servidor
        fetch('/guardar-producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Producto guardado correctamente.') {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El producto se guardó correctamente.'
                }).then(() => {
                    // Limpiar los campos del formulario
                    formulario.reset();  // Resetea todos los campos del formulario
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un problema al guardar el producto.'
            });
        });
    });
});
