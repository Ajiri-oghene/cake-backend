const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const multer = require('multer');
const permission = require('../middleware/permission')
const checkAuth = require('../middleware/check-auth');
const CategoryController = require('../controllers/category_control')
 


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
        cb(uploadError, './upload/');
    },
    filename: (req, file, cb) =>{
        file.mimetype
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const upload = multer({storage: storage,
    limits: {fileSize: 1024 * 1024 *  10},
});

router.get('/', CategoryController.getAllCategory );

router.post('/', checkAuth, permission, upload.single('icon'), CategoryController.createCategory);

router.delete('/:categoryId', checkAuth, CategoryController.deleteCategory);//working

router.get('/:categoryId', checkAuth, permission, CategoryController.getSpecificCategory);//working

router.patch('/:categoryId',checkAuth,  CategoryController.updateCategory);//still need attention

// router.patch('/gallery-images/:categoryId', upload.array('images', 10), async (req, res, next) =>{
//     const files = req.files
//     const basePath = `${req.protocol}://${req.get('host')}/cake-backend/upload/`

//     if(files) {
//         files.map(file =>{
//             imagesPaths.push(file.fileName);
//         })
//     }
//     let imagesPaths = [];
//     const category = await Category.findByIdAndUpdate(
//         req.params.id,
//         {
//             images: imagesPaths
//         },
//         {new: true}
//     )
//     if(!category) return res.status(500).send('the category cannot be updated')
    
//     res.send(category);
// });

// implement isAdmin roles in post, patch and delete categories


module.exports = router;