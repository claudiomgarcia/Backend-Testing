import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const generateLink = (endpoint, page, sort, limit, query) => {
    let link = `/${endpoint}?page=${page}`
    if (limit) link += `&limit=${limit}`
    if (sort) link += `&sort=${sort}`
    if (query) link += `&query=${query}`
    return link
}

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const generateProducts = () => {
    return {
        _id: faker.string.alphanumeric({ length: 6 }),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.urlLoremFlickr(),
        code: faker.string.alphanumeric({ length: 6 }),
        status: faker.datatype.boolean(),
        category: faker.commerce.department(),
        stock: faker.number.int({ max: 100 }),
    }
}

export { __dirname, generateLink, createHash, isValidPassword, generateProducts }