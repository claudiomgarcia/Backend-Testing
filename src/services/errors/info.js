export const generateProductErrorInfo = (product) => {
    return `Faltan uno o más campos obligatorios para crear el producto
    Lista de propriedades requeridas:
    * title : Se requiere un String, se recibio ${product.title}
    * price : Se requiere un Number, se recibio ${product.price}`
}