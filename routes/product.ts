import { Router, Request, Response } from 'express'
import multer from 'multer'; 
import ProductController from '../controllers/ProductController'

const storage = multer.diskStorage({
    destination: function(req: Request, file: any, cb: any) {
      cb(null,'./uploadsProduct/');
    },
    filename: function(req: Request, file: any, cb: any) {
      cb(null, Date.now() +  file.originalname);
    }
  });
    
  const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype === 'productimage/jpg' || file.mimetype === 'productimage/png' || file.mimetype === 'productimage/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      console.log('format must jpg,jpeg,png')
    }
  };
  const uploads = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });



  class Product {
      router:Router
      constructor(){
          this.router = Router()
          this.product()
      }
      public product():void{
          this.router.post('/product',uploads.single('image'),ProductController.createProduct) 
          this.router.post('/createproduct',ProductController.createProduct)
          this.router.get('/listproduct',ProductController.listProduct)
          this.router.get('/detailproduct/:productId',ProductController.getOneProduct) 
          this.router.get('/product/category/:categoryId',ProductController.getCategory)
      }
      
  }
  export default new Product().router