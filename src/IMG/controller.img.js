
import { deleteOneFavoriteById, retrieveAllImagesByEmail, findUserBySucessEmail, createFavorite, retrieveAllFavorites, retrieveOneFavoriteById } from "./model.img.js";

import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



/** CREA UN FAVORITO TRAS COMPROBAR QUE EL USER EXISTE Y EL IMG DE LA IMAGEN NO
 * @param {http request/response} 
 * @return {objeto} 
 */

 export async function setNewFavorite(req, res){
    const fileImage = req.file
    console.log('req.file es este', fileImage.path)
    console.log('req.file es este', cloudinaryConfig)
        // const userFound = await findUserBySucessEmail(req.body.email)
      
        const uploadedResponse = await cloudinaryConfig.v2.uploader.upload(fileImage.path, {folder: 'FAVOREDIT'});
        console.log('uploadedResponse en controller', uploadedResponse)
        const file ={
            url: uploadedResponse.secure_url,
            imgID: uploadedResponse.public_id
        }
        
        const {name, img, info, email} = req.body
        const cleanRequest = {name, img, info, email, file}
     
        console.log('cleanRequest', cleanRequest)
        // if(userFound != null){ condición para cuando la app tenga registro y login
        if(cleanRequest.img && cleanRequest.name !== null || undefined){
            const favoriteCreated = await createFavorite(cleanRequest);
            
            console.log("en setNewFavorite controller devuelve function", favoriteCreated)
            
            res.json(favoriteCreated)
        }else{
            res.sendStatus(401)
        }
}

/**TODOS LOS DOCUMENTOS DE FAVORITES
 * @param {http request/response} 
 * @return {Array de objetos} todos los documentos de la collection PRODUCTOS o bien mensaje de error.
 */

 export async function getAllFavorites(req, res){
    const favoritesFound = await retrieveAllFavorites();
 
    if(favoritesFound!==null){
        console.log("hasta aquí", favoritesFound)
        res.json(favoritesFound);
        
    }else{
        res.sendStatus(404);
    }
  };

  export async function getOneImageById(req, res){
    console.log('esta es la imagen', req.params.id)
   const favoriteFound = await retrieveOneFavoriteById(req.params.id)
   if(favoriteFound!==null){
       favoriteFound;
       res.json([favoriteFound]);
   }else{
       res.sendStatus(404);
   }
};


  /** BORRA UN DOCUMENTO DE FAVORITES POR ID
 * @param {http request/response} body de request es un string con el id
 * @return {objeto} ok o bien mensaje de error.
 */
 export async function deleteOneFavorite(req, res){
    console.log('esta es la imagen líena 87', req.body.id)
    const productId = req.body.id
    console.log('datos', productId)
   const favoriteDeleted = await deleteOneFavoriteById(productId)
   console.log('este es el favorito borrado', favoriteDeleted)
   if(favoriteDeleted!==null){
       res.json([favoriteDeleted]);
   }else{
       res.sendStatus(404);
   }
};

/**RECUPERA TODOS LOS DOCUMENTOS DE UN USUARIO
 * @param {http request/response} req.body.email
 * @return {Array de objetos} todos los documentos de la collection img o bien mensaje de error.
 */

 export async function getAllImagesByUser(req, res){
   
    const imagesFound = await retrieveAllImagesByEmail(req.body.email)
    console.log(imagesFound)
    if(imagesFound!==null){
        res.json(imagesFound);
        
    }else{
        res.sendStatus(404);
    }
};




    