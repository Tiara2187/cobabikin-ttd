import { Router, Request, Response } from "express"
import AddressController from '../controllers/AddressController'
import UserAuth from '../helpers/authentication'

class Address {
    router:Router
    constructor(){
        this.router = Router()
        this.address()
    }
    public address():void{
        this.router.post('/address',UserAuth.userAuth, AddressController.createAddress)
        this.router.get('/address',UserAuth.userAuth, AddressController.getAddress)
        this.router.put('/address/update',UserAuth.userAuth, AddressController.updateAdress)
        this.router.delete('/address',UserAuth.userAuth, AddressController.deleteAddress)
    }
}
export default new Address().router