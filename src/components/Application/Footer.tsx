import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-zinc-950 text-zinc-300">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
    <div className="py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold text-zinc-50">
            Rudra Silk Saree
          </h3>
          <p className="mt-4 text-sm text-zinc-400">
            Exquisite handwoven sarees for every occasion. Weaving tradition with modern elegance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-3">
          
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-zinc-400">Shop</h4>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="hover:text-zinc-50 transition-colors duration-200">New Arrivals</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition-colors duration-200">Best Sellers</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition-colors duration-200">Collections</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition-colors duration-200">Sale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-zinc-400">About</h4>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="hover:text-zinc-50 transition-colors duration-200">Our Story</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-zinc-50 transition-colors duration-200">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-zinc-400">Follow Us</h4>
            <div className="mt-4 flex space-x-5">
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c-4.42 0-7.8 3.38-7.8 7.8s3.38 7.8 7.8 7.8 7.8-3.38 7.8-7.8S16.735 2 12.315 2zM1.803 12.314c0-4.041 3.272-7.314 7.314-7.314s7.314 3.273 7.314 7.314-3.272 7.314-7.314 7.314-7.314-3.273-7.314-7.314zm1.905 0c0 3.013 2.443 5.456 5.456 5.456s5.456-2.443 5.456-5.456S12.178 6.858 9.172 6.858s-5.456 2.443-5.456 5.456zm3.55 0c0-1.07.866-1.936 1.936-1.936s1.936.866 1.936 1.936-.866 1.936-1.936 1.936-1.936-.866-1.936-1.936zm7.258-3.467a.962.962 0 11-1.924 0 .962.962 0 011.924 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                 <span className="sr-only">Pinterest</span>
                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.633 7.825 6.25 9.394-.038-.79-.06-1.94.184-2.88a8.318 8.318 0 011.52-2.31c.394-.492.628-1.12.628-1.815 0-1.687-1.31-3.037-2.924-3.037-2.21 0-3.882 1.654-3.882 3.662 0 .894.343 1.86.782 2.378.18.21.206.31.15.513-.047.17-.154.614-.194.774-.055.215-.224.28-.41.17-1.55-.9-2.52-2.79-2.52-4.83 0-2.984 2.16-5.833 6.34-5.833 3.32 0 5.613 2.35 5.613 5.218 0 3.23-1.854 5.63-4.4 5.63-.88 0-1.72-.46-1.99-.988 0 0-.43 1.706-.534 2.11-.16.63-.615 1.34-1.026 1.768C9.214 21.61 10.55 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                 </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-12 border-t border-zinc-800 py-8">
      <p className="text-center text-sm text-zinc-500">
        &copy; 2025 Rudra Silk Saree. All Rights Reserved.
      </p>
    </div>
    
  </div>
</footer>
    </div>
  )
}

export default Footer