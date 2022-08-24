import multer from "multer";
const storage = multer.diskStorage({
    destination:(req,file,cb ) =>{
        cb(null,'../public/images')
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() + '--' + file.originalname )
    }
})
export const upload = multer({storage:storage})