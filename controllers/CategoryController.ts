import { NextFunction, Request, Response } from 'express'
import {Category} from '../models/Category'

class CategoryController {

    static async createCategory(req: Request, res: Response, next: NextFunction){
        const {categoryname} = req.body
        const categoryData = await Category.findOne({categoryname : categoryname})
        console.log(categoryData)
        if(categoryData) { next({name: 'CATEGORYEXIST'}) }
        else{
        const category = new Category({
            categoryname
        });
        category.save()
        .then(data => {
            res.status(200).json({success : true, data})
        })
        .catch(err => {next({name : 'VALID'})})
        }
    }

    static async getCategory(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        try{
            const category = await Category.findById(id)
            res.status(200).json({success : true, data : category})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }
    
    static async listCategory(req: Request, res: Response, next: NextFunction){
        try{
            const category = await Category.find()
            res.status(200).json({success : true, data : category})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }
    
    
}

export default CategoryController