import { Router, Request, Response } from 'express'
import CategoryController from '../controllers/CategoryController'

class Category {
    router:Router
    constructor(){
        this.router = Router()
        this.category()

    }
    public category():void{

        this.router.post('/category/create', CategoryController.createCategory)
        this.router.get('/category/detailcategory/:id',CategoryController.getCategory)
        this.router.get('/category/listcategory', CategoryController.listCategory)
  
    }
}
export default new Category().router