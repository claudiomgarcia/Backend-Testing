export default {
    truncate: function (str, len) {
        if (str.length > len) {
            return str.slice(0, len) + '...'
        }
        return str
    },
    multiply: (a, b) => a * b,
    countProducts: function (products) {
        let total = 0
        products.forEach(product => {
            total += product.quantity
        })
        return total
    },
    hasProducts: function (products) {
        let total = 0
        products.forEach(product => {
            total += product.quantity
        })
        return total > 0
    },
    cartTotal: function (products) {
        let total = 0
        products.forEach(product => {
            total += product.product.price * product.quantity
        })
        return total.toFixed(2)
    },
    hasOutOfStock: function (products) {
        return products.some(product => !product.inStock)
    },
    isAdmin: function (user) {
        if (user.role === "admin") return true
    }
}