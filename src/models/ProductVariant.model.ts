import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema({
    product:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true,
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
  
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    sku: {
        type : Number,
        required : true,
        unique : true
    },
    media: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : "Media",
            required : true
        }
    ],
    deletedAt: {
        type: String,
        default: null,
        index: true
    },
}, { timestamps: true })





const ProductVariantModel = mongoose.models.ProductVariant || mongoose.model('ProductVariant', ProductVariantSchema, 'productsvariants')
export default ProductVariantModel;