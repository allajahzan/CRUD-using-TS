import { model, Schema } from "mongoose";

interface userI {
    name:string;
    email:string;
    phoneNo:string;
    image:string
}


const userSchema = new Schema<userI>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

// export const User = model<userI>('User',userSchema)  // if i give like this in i have to import this with objecet destructuring , it will pass as object

const User = model<userI>('User', userSchema)
export default User  // if i give like this then it will be a single item , not an object