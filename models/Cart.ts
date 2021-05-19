import mongoose from 'mongoose'

interface ICart extends mongoose.Document
{
    product: any
    quantity : number,
    totalprice : number
}

interface ICartDoc extends mongoose.Document
{
    product: any
    quantity : number,
    totalprice : number
}

interface MCart extends mongoose.Model<ICart>{
    build(attr:ICart):ICartDoc
}

const cartSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity : {
        type: Number,
        default: 0
    },
    totalprice : {
        type : Number
    },

},
    {
        timestamps: true
    })

const Cart = mongoose.model<ICartDoc,MCart>('Cart', cartSchema)

export {Cart}