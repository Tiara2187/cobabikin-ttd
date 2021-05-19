import mongoose from 'mongoose'

interface ICheckout extends mongoose.Document
{
    totalprice : number,
    historyorder : string
}

interface ICheckoutDoc extends mongoose.Document
{
    totalprice : number,
    historyorder : string
}

interface MCheckout extends mongoose.Model<ICheckout>{
    build(attr:ICheckout):ICheckoutDoc
}

const checkoutSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    totalprice: {type: Number},
    historyorder: {type: String}
},

{
    timestamps: true
})

const Checkout = mongoose.model<ICheckoutDoc,MCheckout>('Checkout', checkoutSchema)

export {Checkout}