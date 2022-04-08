
import {createFavorite} from './model.img.js';
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
    