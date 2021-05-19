import mongoose, { Schema } from 'mongoose'

interface IProduct extends mongoose.Document
{
    productname : string,
    productprice: string,
    productimage : string,
    _categoryId : mongoose.Schema.Types.ObjectId,
    description : string,
    preview : string,
    color : string,
    size : string,
    quantity : number
}

interface IProductDoc extends mongoose.Document
{
    productname : string,
    productprice: string,
    productimage : string,
    _categoryId : mongoose.Schema.Types.ObjectId,
    description : string,
    preview : string,
    color : string,
    size : string,
    quantity : number
}

interface MProduct extends mongoose.Model<IProduct>{
    build(attr:IProduct):IProductDoc
}

const productSchema = new mongoose.Schema({
    productname : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    productprice:{
        type: Number,
        required: true

    },
    productimage: {
        type: String,
        required: true
    },
    _categoryId:{
        type : Schema.Types.ObjectId, ref: 'Category',
        required: true

    },
    description: {
        type: String,
        required: true
    },
    preview : {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 100
    },  
},
{
    timestamps: true
})

const Product = mongoose.model<IProductDoc,MProduct>('Product', productSchema);
      
export {Product}
 

