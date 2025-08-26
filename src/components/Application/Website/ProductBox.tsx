import Image from "next/image"
import Link from "next/link"
const ProductBox = ({ product }: any) => {
    return (
        <div className="rounded-lg shadow cursor-pointer hover:shadow-md transition overflow-hidden">

            <Link href="">
            <Image src={product?.media[0].secure_url} width={400} height={400} alt={product?.media[0]?.alt || product?.media[0]?.title  || 'product' } title={product?.media[0]?.title} 
            className="w-full lg:h-[300px] md:h-[200px] h-[150px] object-cover objext-top"/>
            <div className="p-3">
                <h4>{product?.name}</h4>
                <p className="flex gap-2 text-sm mt-2">
                    <span className="line-through">{product?.mrp.toLocaleString('en-IN' , {style : 'currency' , currency: 'INR'})}</span>    
                    
                    <span className="font-semibold">{product?.sellingPrice.toLocaleString('en-IN' , {style : 'currency' , currency: 'INR'})}</span>
                </p>    
            </div>
            </Link>
        </div>
    )
}

export default ProductBox