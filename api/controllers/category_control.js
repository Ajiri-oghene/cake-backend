const mongoose = require('mongoose');
const Category = require('../models/category_model');
const upload = require('../middleware/uploads');

exports.getAllCategory = (req, res, next) =>{
    Category.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    _id: doc._id,
                    name: doc.name,
                    icon: doc.icon,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/api/eazy_cakes/category/' + doc._id
                    },
                    id: doc.id,
                }
            })
        })
    })
    .catch(err =>{
        res.status(500).json({error: err})
    }); 
};

exports.createCategory = (req, res, next) =>{

    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')

    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/cake-backend/upload/`

    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        icon: `${basePath}${fileName}`,
    });
    category
    .save()
    .then(result =>{
        res.status(201).json({
            createdCategory: {
                _id: result._id,
                name: result.name,                
                icon: result.icon,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/api/eazy_cakes/category/' + result._id 
                },
                id: result.id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

exports.deleteCategory = (req, res, next) =>{
    //http://localhost:8000/api/e-store/category/id
    const id = req.params.categoryId;
    Category.findByIdAndDelete({_id : id})
    .exec()
    .then(categories => {
        if(!categories) {
            return res.status(404).json({
                message: "No matching Product to delete",
            });
        } 

        res.send("Category deleted")
    })    
    .catch(err => {
        res.status(500).json({
            message: "Error",
            error: err
        })
    });
};

exports.getSpecificCategory = (req, res, next) =>{
    //http://localhost:8000/api/e-store/category/id
    Category.findById({_id: req.params.categoryId})
    .exec()
    .then(category => {
        if(!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        } else{
            res.status(200).json({
                category: category,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/api/e-store/category'
                }
            })
        }
    })    
    .catch(err => {
        res.status(500).json({
            message: "Cannot access specific category",
            error: err
        })
    });
};

exports.updateCategory = (req, res, next) =>{
    const id = req.params.categoryId;
    Category.findOneAndUpdate({_id : id}, req.body, {new: true})
    .exec()
    .then(category => {
        if(!category) {
            return res.status(404).json({
                message: "No matching Category to update",
            });
        } else{
            res.status(200).json({
                message: "Category Updated Successfully",
                update: category,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/api/e-store/category'
                },
            })
        }
    })    
    .catch(err => {
        res.status(500).json({
            message: "Unable to update category",
            error: err
        })
    });
};