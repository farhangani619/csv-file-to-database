const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email");
                }
            }
        },
        password:{
           type:String,
           required:true,
           minlength:7,
           validate(value){
               if(value.toLowerCase().includes('password')){
                   throw new Error( 'password cant be password')
               }
           } 
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }],
})
userSchema.methods.generateAuthToken= async function(){
    const user = this
    const token = jwt.sign({_id: user.id.toString(), },'thisisanauthsign')
    
    user.tokens= user.tokens.concat({token})
    console.log(user.tokens);
    await user.save()
    return token
}
userSchema.pre('save',async function(next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        }
        next()
})
userSchema.statics.findByCredentials = async(email , password)=>{
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        throw new Error("unable to login")
    }
    return user
}
const User = mongoose.model('User',userSchema)

module.exports=User