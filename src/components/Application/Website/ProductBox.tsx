import Image from "next/image"
import Link from "next/link"

const ProductBox = ({ product }: any) => {

    const imageUrl = product?.media[0]?.secure_url || "/placeholder.png"
    const productSlug = product?.slug || ''

    return (
        <Link href={`/products/${productSlug}`} className="block">
            <div className="rounded-lg bg-white shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">

                {/* Product Image and Discount Tag */}
                <div className="relative w-full lg:h-[300px] md:h-[200px] h-[150px] overflow-hidden">
                    <Image
                        src={imageUrl}
                        width={400}
                        height={400}
                        alt={product?.name || 'product image'}
                        className="w-full h-full object-cover object-center transition-transform duration-500"
                    />
                    
                    {/* Discount Badge */}
                    {product?.discountPercentage > 0 && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full shadow-md">
                            -{product?.discountPercentage}% OFF
                        </span>
                    )}
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col justify-between">
                    <div>
                        <h4 className="font-semibold text-gray-800 text-lg sm:text-xl line-clamp-1 mb-1">
                            {product?.name}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2rem]">
                            {product?.description}
                        </p>
                    </div>

                    {/* Pricing */}
                    <div className="mt-3 flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-xl sm:text-2xl">
                            ₹{product?.sellingPrice.toLocaleString('en-IN')}
                        </span>
                        {product?.discountPercentage > 0 && (
                             <span className="text-gray-400 text-sm line-through">
                                ₹{product?.mrp.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default ProductBox