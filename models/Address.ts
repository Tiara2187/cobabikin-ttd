import mongoose from 'mongoose'

interface IAddress extends mongoose.Document
{
    village : string,
    district : string,
    city : string,
    province : string,
    country : string,
    zip : number
}

interface IAddressDoc extends mongoose.Document
{
    village : string,
    district : string,
    city : string,
    province : string,
    country : string,
    zip : number

}

interface MAddress extends mongoose.Model<IAddress>{
    build(attr:IAddress):IAddressDoc
}

const addressSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    village : {type : String},
    district: {type : String},
    city : {type : String},
    province : {type: String},
    country : {type : String},
    zip : {type : Number},   
},
{
    timestamps: true
})

const Address = mongoose.model<IAddressDoc,MAddress>('Address', addressSchema);
export {Address}