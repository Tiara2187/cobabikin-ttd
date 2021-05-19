import { NextFunction, Request, Response } from 'express'
import { Product } from '../models/Product'

class ProductController {
  static createProduct(req: Request, res: Response, next: NextFunction)
  {
    const {productname, productprice,productimage, _categoryId,description, preview, color, size, quantity } = req.body
    const product = new Product({
      productname, productprice,productimage, _categoryId, description, preview, color, size, quantity
    })
    product.save()
    .then((product) => {
      res.status(201).json({message:'Success add product', data: product})
    })
    .catch(next)
  }

  static postProduct(req: Request, res: Response, next: NextFunction)
  {
    const {productname, productprice, description, preview, color, size, quantity} = req.body
    const productimage = req.file.path
    const product = new Product({
      productname, productprice, productimage, description, preview, color, size, quantity
    })
    product.save()
    .then(result => {
      res.status(201).json({success : true, result})
    })
    .catch(e => {next({name: 'PRODUCT_NOT_FOUND'})})
  }

    static async getOneProduct(req: Request, res: Response, next: NextFunction)
    {
        const {productId} = req.params
        try{
            const product = await Product.findById(productId)
            .populate('Category')
            res.status(200).json({success: true, product})
        }
        catch (any) { next({name: 'PRODUCT_NOT_FOUND'})}
    }

      static async listProduct(req: Request, res: Response, next: NextFunction) {
        try {
        const product = await Product.find()
        .populate('Category')
        res.status(200).json({success : true, product})
        }
        catch  (e) { next({name: 'PRODUCT_NOT_FOUND'}) }
      }

      static async getCategory(req: Request, res: Response, next: NextFunction){
          const {categoryId} = req.params
          try{
              const product = await Product.find({category : categoryId})
              .populate('Category')
              res.status(200).json({success : true,product})
          }
          catch (any) { next({name: 'PRODUCT_NOT_FOUND'})}
      }
    
}

export default ProductController