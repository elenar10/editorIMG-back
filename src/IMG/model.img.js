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

