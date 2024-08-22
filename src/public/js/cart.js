document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#delete-product').forEach(button => {
        button.addEventListener('click', () => {
            const cid = button.getAttribute('data-cid')
            const pid = button.getAttribute('data-pid')
            deleteProduct(cid, pid)
        })
    })

    const emptyCartButton = document.getElementById('empty-cart')
    if (emptyCartButton) {
        emptyCartButton.addEventListener('click', () => {
            const cid = emptyCartButton.getAttribute('data-cid')
            emptyCart(cid)
        })
    }
})

function deleteProduct(cid, pid) {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        background: '#0F1013',
        color: '#fff',
        confirmButtonColor: '#4258FF',
        cancelButtonColor: '#393F4C',
        confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/carts/${cid}/products/${pid}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'El producto ha sido eliminado.',
                            icon: 'success',
                            background: '#0F1013',
                            color: '#fff',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(() => {
                            location.reload()
                        })
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'No se pudo eliminar el producto.',
                            icon: 'error',
                            background: '#0F1013',
                            color: '#fff',
                            confirmButtonColor: '#4258FF'
                        })
                    }
                })
        }
    })
}

function emptyCart(cid) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción vaciará todo el carrito.",
        icon: 'warning',
        showCancelButton: true,
        background: '#0F1013',
        color: '#fff',
        confirmButtonColor: '#4258FF',
        cancelButtonColor: '#393F4C',
        confirmButtonText: 'Sí, vaciarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/carts/${cid}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            title: 'Carrito Vaciado!',
                            text: 'El carrito ha sido vaciado.',
                            icon: 'success',
                            background: '#0F1013',
                            color: '#fff',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(() => {
                            location.reload()
                        })
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'No se pudo vaciar el carrito.',
                            icon: 'error',
                            background: '#0F1013',
                            color: '#fff',
                            confirmButtonColor: '#393F4C'
                        })
                    }
                })
        }
    })
}
