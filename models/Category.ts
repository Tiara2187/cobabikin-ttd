import mongoose from 'mongoose'

interface ICategory extends mongoose.Document 
{
    categoryname : string
}

interface ICategoryDoc extends mongoose.Document
{
    categoryname : string
}

interface MCategory extends mongoose.Model<ICategory>{
    build(attr:ICategory):ICategoryDoc
}

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}, 

{
    timestamps: true
})

const Category = mongoose.model<ICategoryDoc,MCategory>('Category', categorySchema);
      
export {Category}
 
