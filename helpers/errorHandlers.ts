import { NextFunction, Request, Response } from 'express'; 

class ErrorHandler{
    static errorhandler(err: Error, req: Request, res: Response, next: NextFunction) {
        console.log(err)
        let code: number;
        let name = err.name;
        let message: string;
        switch (name) {
            case 'REQUIRED':
                code = 500;
                message = 'Email or Password Required'
                break;
            case 'ALREADY_EXIST':
                code = 500;
                message = 'Email Already Exist!';
                break;
                case 'VALID' :
                    code = 500;
                    message = 'fill a valid request'
                    break;
                    case 'CATEGORYEXIST' :
                        code = 500;
                        message = 'Category Already Exist'
                        break;
                case 'PRODUCT_NOT_FOUND' :
                    code = 404;
                    message = 'Product not found'
                    break;   
            case 'MISSING_TOKEN':
                code = 401;
                message = 'Missing access token!'
                break;
            case 'INVALID_TOKEN':
                code = 401;
                message = 'Invalid access token!';
                break;
            case 'LOGIN_FAILED':
                code = 404;
                message = 'Incorrect Email or Password!!'
                break;
            case 'NOT_FOUND':
                code = 404;
                message = 'User Not Found!'
                break;
            case 'AUTH_FAILED':
                code = 500;
                message = 'Incorrect ID or Token!!' 
                break;
            default:
                code = 500;
                message = 'Internal server error';
                break;
        }
          res.status(code).json({ success: false, message });
        };
    }
    
export default ErrorHandler