import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends mongoose.Document 
{
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    birthdate: Date,
    address: string,

}

interface IUserDoc extends mongoose.Document 
{
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    birthdate: Date,
    address: string,

}

interface MUser extends mongoose.Model<IUser>{
    build(attr:IUser):IUserDoc
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        default : null
    },
    lastname: {
        type: String,
        default : null
    },
    email: {
        type: String,
        required: true,
        unique:true, partialFilterExpression: {email: {$exists:true }},
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    phone : {
        type : String,
        unique:true,
        required: true,
        maxlength: 20,
        validate : [/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/, 'please fill valid phone']
    },
    birthdate : {
        type : Date,
        default : null

    },
    address : {
        type: String,
        default : null
    }
},
{
    timestamps: true
})

userSchema.pre('save', function <IUser>(next) {
    User.findOne({ username: this.username, email: this.email })
      .then((user) => {
        if (user) {
          next({ name: 'EMAIL_ALREADY_EXISTS' });
        } else {
          this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
          next();
        }
      })
      .catch((any) => next('MONGOOSE_ERROR'));
  });
  

  const User = mongoose.model<IUserDoc,MUser>('User', userSchema);
      
  export {User}
   

      