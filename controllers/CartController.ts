import { NextFunction, Request, Response } from 'express'
import {Cart} from '../models/Cart'
import {Product} from '../models/Product'
import product from '../routes/product'

class CartController {
    static async addCart(req: Request, res: Response, next: NextFunction){
        const { product } = req.body
        const dataCart = await Cart.findOne({ user : (<any>req)._userId, product : product})
        const dataProduct = await Product.findById(product)
        try{
            if((<any>dataProduct).quantity >= 1){
                if(dataCart == null){
                    const cart = await new Cart({
                        user: (<any>req)._userId,
                        product,
                        totalprice : (<any>dataProduct).productprice

                    })
                    await Product.findByIdAndUpdate(product,{$set : {quantity : (<any>dataProduct).quantity - 1}})
                    cart.save()
                    res.status(200).json({ success: true, data: cart })
                }
                else{
                    const quantity = dataCart.quantity
                    const total = (quantity + 1) * (<any>dataProduct).productprice
                    const addcart = await Cart.findOneAndUpdate({product : product},{$set : {quantity : quantity + 1, totalprice : total}}, {new : true})
                    await Product.findByIdAndUpdate(product,{$set : {quantity : <any>dataProduct?.quantity -1}})
                    res.status(200).json({ success: true, data: addcart})
                }

            }else next({name : 'NOT_FOUND'})
        }
        catch (e) { next({ name: 'PRODUCT_NOT_FOUND'})}
    }


    static createcart(req: Request, res: Response, next: NextFunction){
        const {productId} = req.body
        const {quantity} = req.body
        const dataProduct = Product.findById(product)
        const cart = new Cart({productId,quantity })
        const total = (quantity + 1) * (<any>dataProduct).productprice
        const addcart = Cart.findOneAndUpdate({product : product},{$set : {quantity : quantity + 1, totalprice : total}}, {new : true})
        cart.save()
        .then(addcart => {
            res.status(200).json({message:'Cart created successfully.', data:addcart});
        })
        .catch(next)
    }

    static async listCart(req: Request, res: Response, next: NextFunction){
        try{
            const dataCart = await Cart.find({ user: (<any>req)._userId })
            .populate('user')
            .populate('product')
            res.status(200).json({success : true, data : dataCart})
        }
        catch (e) { next({name: 'PRODUCT_NOT_FOUND'})}
    }

    static async getDetailCart(req: Request, res: Response, next: NextFunction){
        const { cartId } = req.params
        try {
            const cart = await Cart.findById(cartId)
            .populate('user')
            .populate('product')
            res.status(200).json({ success: true, data: cart })
        }
        catch (e) { next({ name: 'PRODUCT_NOT_FOUND'}) }
    }

    static async addOneCart(req: Request, res: Response, next: NextFunction)
    {
        const {productId} = req.params
        try{
            const product = await Product.findById(productId)
            const cart = await Cart.findOne({product : productId, user: (<any>req)._userId })
            const productQty = product?.quantity
            const quantity = cart?.quantity
            const newCart = await Cart.findOneAndUpdate({product : productId}, {$set : {quantity : <any>quantity + 1}}, {new : true})
            await Product.findByIdAndUpdate(productId, {$set : {quantity : <any>productQty - 1}}, {new:true})
            res.status(200).json({ success: true, message: 'Success add Quantity to Cart', data : newCart})

        }
        catch { next({ name : 'PRODUCT_NOT_FOUND'})}
    }

    static async deleteCart(req: Request, res: Response, next: NextFunction)
    {
        await Cart.deleteOne({ cartId: req.params.cartId})
        res.status(200).send({ success: true, message: 'Success Delete Cart' })
    }

    static async deleteOneCart(req: Request, res: Response, next: NextFunction){
        const {productId} = req.params
        const product = await Product.findById(productId)
        const cart = await Cart.findOne({ product: productId, user: (<any>req)._userId})
        const productQty = product?.quantity
        const quantity = cart?.quantity
        try{
            if((<any>quantity) > 1){
                const newCart = await Cart.findOneAndUpdate({product : productId}, {$set : {quantity : (<any>quantity) - 1}}, {new : true})
                await Product.findByIdAndUpdate(productId, {$set : {quantity: (<any>productQty) + 1}}, {new: true})
                res.status(200).json({ success: true, message: 'Success delete Quantity to Cart', data : newCart})
            }
            else{
                await Cart.findOneAndDelete({product : productId})
                await Product.findByIdAndUpdate(productId, {$set: {quantity: (<any>productQty) + 1}}, {new : true})
                res.status(200).json({ success: true, message: 'Success delete Quantity to Cart'})
            }
        }
        catch { next({ name : 'PRODUCT_NOT_FOUND'})}

    }

}

export default CartController