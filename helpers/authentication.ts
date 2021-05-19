import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

class UserAuth{
  static userAuth(req: Request, res: Response, next: NextFunction){
   //const { token } = req.headers;
    const token = req.header('Authorization').replace('Bearer ', '')
    if(token){
      jwt.verify(token, process.env.SECRET_KEY,(err,decoded) => {
        if(err) next({name: 'INVALID_TOKEN'})
        else{
          (<any>req)._userId = decoded._id;
          next()
        }
      })
    }else next({name : 'MISSING_TOKEN'})

  }
}

export default UserAuth



