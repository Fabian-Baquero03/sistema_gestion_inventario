document.getElementById('updateProduct').addEventListener('click', async () => {
    const id = document.getElementById('productId').value;
    const updatedData = {
        id,
        marca: document.getElementById('marca').value,
        procesador: document.getElementById('procesador').value,
        ram: document.getElementById('ram').value,
        almacenamiento: document.getElementById('almacenamiento').value,
        tipo: document.getElementById('tipo').value,
    };

    try {
        const response = await fetch('http://localhost:3000/actualizar-producto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        const result = await response.json();
        if (result.status === 'success') {
            alert('Producto actualizado correctamente.');
        } else {
            alert('Error al actualizar el producto: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo conectar al servidor.');
    }
});