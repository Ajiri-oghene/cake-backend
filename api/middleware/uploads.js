// const multer = require('multer')



// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg'
// }
// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         const isValid = FILE_TYPE_MAP[file.mimetype];
//         let uploadError = new Error('invalid image type');

//         if(isValid) {
//             uploadError = null
//         }
//         cb(uploadError, './upload/');
//     },
//     filename: (req, file, cb) =>{
//         file.mimetype
//         const fileName = file.originalname.split(' ').join('-');
//         const extension = FILE_TYPE_MAP[file.mimetype]
//         cb(null, `${fileName}-${Date.now()}.${extension}`);
//     }
// });

// const upload = multer({storage: storage,
//     limits: {fileSize: 1024 * 1024 *  10},
// });