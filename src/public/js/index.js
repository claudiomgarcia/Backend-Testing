const truncate = (str, len) => {
    if (str.length > len) {
        return str.slice(0, len) + '...'
    }
    return str
}

const socketClient = io()

socketClient.on("sendProducts", (obj) => {
    updateProductList(obj)
})

function updateProductList(productList) {
    const productsDiv = document.getElementById('list-products')
    let productsHTML = ""
    productList.forEach((product) => {
        const truncatedDescription = truncate(product.description, 100)
        productsHTML += `
                <tr>
                            <td>${product.id}</td>
                            <td>${product.title}</td>
                            <td>${product.category}</td>
                            <td>${product.stock}</td>
                            <td>${product.price}</td>
                            <td class="is-vcentered">
                                <div class="has-text-centered">
                                    <button class="tag is-rounded is-delete" id="delete-product"
                                        data-cid="{{../cart._id}}" data-pid="{{this.product._id}}"></button>
                                </div>
                            </td>
                        </tr>`
    })

    productsDiv.innerHTML = productsHTML
}

const form = document.getElementById("formProduct")
form.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const title = form.elements.title.value
    const description = form.elements.description.value
    const category = form.elements.category.value
    const price = form.elements.price.value
    const code = form.elements.code.value
    const stock = form.elements.stock.value
    const thumbnail = form.elements.thumbnail.value
    const status = form.elements.status.checked

    socketClient.emit("addProduct", {
        title,
        description,
        category,
        price,
        code,
        stock,
        thumbnail,
        status,
    })
    form.reset()
})

document.getElementById("delete-btn").addEventListener("click", () => {
    const idInput = document.getElementById("id-prod")
    const deleteId = idInput.value

    socketClient.emit("deleteProduct", deleteId)
    idInput.value = ""
})

socket.emit('message', "Comunicandome desde websocket")