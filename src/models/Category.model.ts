import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim : true
    },
    deletedAt:{
        type:String,
        default:null,
        index:true
    },
},{timestamps:true})


const CategoryModel = mongoose.models.Category || mongoose.model('Category' , categorySchema , 'categories')
export default CategoryModel;