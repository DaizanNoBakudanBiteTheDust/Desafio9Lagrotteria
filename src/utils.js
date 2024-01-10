import {
    fileURLToPath
} from 'url';
import {
    dirname,
    join
} from 'path';
import configs from "./config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { fakerES as faker } from '@faker-js/faker';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const PRIVATE_KEY = configs.privateHash;

//Valida pass
const isValidPassword = (plainPassword, hashedPassword) =>
    bcrypt.compareSync(plainPassword, hashedPassword);

 //generacion de token
 
 const generateToken = (user) => {
    const token = jwt.sign({ user }, configs.privateJwt, { expiresIn: '24h' });
    return token;
}

const decodedToken = (token) => { 
    const decodedToken = jwt.decode(token);

    // Recupera el usuario
    const user = decodedToken.user;

    return user;
}

// Mocking Faker




const generateProduct = () => {

    const numberOfProducts = faker.number.int({ min: 1, max: 5 });

    let products = [];

    for (let i = 0; i < numberOfProducts; i++) {
        products.push({
            titulo: faker.commerce.productName(),
            precio: faker.commerce.price(),
            category: faker.commerce.department(),
            stock: faker.number.int(1),
            _id: faker.database.mongodbObjectId(),
            thumbnail: faker.image.url(),
            code: faker.string.alphanumeric(10),
            description: faker.commerce.productDescription()
        });
    }

    return products
}


export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken,
    decodedToken,
    generateProduct
};

export const productsFilePath = join(__dirname, "./dao/fileManagers/files/productos.json")
export const cartsFilePath = join(__dirname, "./dao/fileManagers/files/carrito.json");