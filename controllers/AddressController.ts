import { NextFunction, Request, Response } from 'express';
import { Address } from '../models/Address'

class AddressController {
    static async createAddress(req: Request, res: Response, next: NextFunction){
        const { village, district, city, province, country, zip } = req.body
        try {
            const addressData = await Address.findOne({ user: (<any>req)._userId })
            if (addressData) {
                const newAddress = {village, district, city, province, country, zip}
        for(let key in newAddress) if(!newAddress[key]) delete newAddress[key]
        const addressData = await Address.findOneAndUpdate({user : (<any>req)._userId},newAddress,{new : true})
        res.status(200).json({result : true, addressData})
            }
            else {
                const address = await new Address({
                    user: (<any>req)._userId,
                    village, district, city, province, country, zip
                })
                address.save()
                res.status(200).json({ success: true, data: address })
            }
        }
        catch (e) { next({name :'NOT_FOUND' }) }
    }

    static async getAddress(req: Request, res: Response, next: NextFunction){
        try{
            const addressData = await Address.findOne({user : (<any>req)._userId})
            .populate('user')
            res.status(200).json({success : true, data : addressData})
        }
        catch(e){next({name :'NOT_FOUND' })}
    }

    static async updateAdress(req:Request,res:Response,next:NextFunction){
        const {village, district, city, province, country,zip} = req.body
      try{
        const newAddress = {village, district, city, province, country, zip}
        for(let key in newAddress) if(!newAddress[key]) delete newAddress[key]
        const addressData = await Address.findOneAndUpdate({user : (<any>req)._userId},newAddress,{new : true})
        res.status(200).json({result : true, addressData})
      }
        catch (e){next({name :'NOT_FOUND' })}
    }

    static async deleteAddress(req:Request,res:Response,next:NextFunction){
        if(await Address.findOneAndDelete({user : (<any>req)._userId})){
        res.status(200).json({result : true, message : 'Delete Success'})
        }
        else {next({name :'NOT_FOUND' })}
    }


}

export default AddressController