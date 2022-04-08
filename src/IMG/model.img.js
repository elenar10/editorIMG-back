import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// import { urlBBDD } from '../../config/config.js';

// const URI= urlBBDD;
const URI= process.env.URLBBDD;


const client = new MongoClient(URI);


// CREAR UN NUEVO FAVORITO
/**
 * @param {string} propiedad name del documento a recuperar de la collection images.
 * @return {promesa que cuando se resuelve objeto con su id} todos los documentos de la collection PRODUCTOS.
 */

 export async function createFavorite(favorite){
    
    try{
  
        await client.connect();
        const db = client.db('IMG');
        const collectionConected = db.collection('images');
        console.log('favorite en el model', favorite)
        
        const favoriteInserted = await collectionConected.insertOne(favorite);  // insertOne devuelve el user o null si no lo puede meter
        console.log('el producto ha sido insertado en el model y devuelve:', favoriteInserted);
        return favoriteInserted
    }catch (err){
        console.log(err);
    } finally{
        await client.close();
    }
};

// TODOS LOS DOCUMENTOS DE UNA COLECCIÓN
/**
 * @return {Array de objetos} todos los documentos de la collection images.
 */
 export async function retrieveAllFavorites(){
    try{
        await client.connect(); 
        const db = client.db('IMG');
        const allFavorites = db.collection('images'); 
        const listFavorites = await allFavorites.find({}).toArray(); 
        console.log(listFavorites)
        return listFavorites
    } catch (err){
        console.log(err);
    } finally {
        await client.close();
    }
  };

// TODOS LOS DOCUMENTOS DE FAVORITES POR EMAIL
/**
 * @return {Array de objetos} todos los documentos de la collection images.
 */
 export async function retrieveAllImagesByEmail(email){
    try{
        await client.connect(); 
        const db = client.db('IMG');
        const allImages = db.collection('images'); 
        const listImages = await allImages.find({email}).toArray(); 
        return listImages
    } catch (err){
        console.log(err);
    } finally {
        await client.close();
    }
};

/**
 * BUSCA POR EMAIL con SUCCESS Y DEVUELVE EL ID o NULL
 * usuario que corresponda con email o null si no lo encuentra
 * @param {string} email el email del usuario a buscar
 * @returns {<Promise>ObjectId} _id si hay un user con ese email o null . devuelve el id si el usuario existe en BBDD. 
 * findOne devuelve el id si lo encuentra o null cuando no lo encuentra
*/

export async function findUserBySucessEmail(email) {
    try {
      // const collectionConected = conectionBBDD('USERS');
      await client.connect();
      const db = client.db("IMG");
      const collectionConected = db.collection("users");
      const q = { $and: [
        { email: { $eq: email }},
        { status: { $eq: "SUCCESS" }}
     ]};
      const userId = await collectionConected.findOne(q); 
      console.log('model.img, findUser con email profe y status succes', userId)
      return userId;
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  }
// // ENCONTRAR UN DOCUMENTO POR NOMBRE para poner un buscador de imágenes por nombre o para organizar por carpetas
// /**
//  * @param {string} propiedad name del documento a recuperar de la collection PRODUCTOS.
//  * @return {object} documento de la collection PRODUCTOS o null.
//  */
//  export async function findOneProductByName(name){
   
//     try{
//         await client.connect();
//         const db = client.db('TIENDA-PATI');
//         const allProducts = db.collection('PRODUCTOS');
//         console.log('model, parametro nombre recibido', name)
//         const oneProduct = await allProducts.findOne({name});
//         console.log('encontrado', oneProduct)
//         return oneProduct

//     } catch (err){
//         console.log(err);
//     } finally {
//         await client.close();
//     }
// }


// UN DOCUMENTO POR  SU ID
/**
 * @param {string} propiedad name del documento a recuperar de la collection IMG.
 * @return {promesa que cuando se resuelve objeto con su id} todos los documentos de la collection PRODUCTOS.
 */

 export async function retrieveOneFavoriteById(productId){
    console.log(productId)
    try{
        await client.connect();
        const db = client.db('IMG');
        const allFavorites = db.collection('images');
        const oneFavorite = await allFavorites.findOne({ _id: ObjectId(productId) });
        return oneFavorite;

    } catch (err){
        console.log(err);
    } finally {
        await client.close();
    }
}

// BORRA UN DOCUMENTO POR  SU ID
/**
 * @param {string} ID del documento a BORRAR de la collection IMG.
 * @return {promesa que cuando se resuelve objeto con su id} .
 */

 export async function deleteOneFavoriteById(productId){
    console.log('datos del model', productId)
    try{
        await client.connect();
        const db = client.db('IMG');
        const allFavorites = db.collection('images');
        const query = { _id: ObjectId(productId) }
     
        const deletedFavorite = await allFavorites.findOneAndDelete(query);
        
        return deletedFavorite;

    } catch (err){
        console.log(err);
    } finally {
        await client.close();
    }
}

