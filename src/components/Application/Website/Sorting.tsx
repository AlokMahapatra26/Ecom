import React from 'react'

const Sorting = ({limit , setLimit, sorting , setSorting , mobileFilterOpen , setMobileFilterOpen }) => {
  return (
    <div className='flex justify-between items-center flex-wrap gap-2 p-4 bg-accent'>
        <ul className='flex items-center gap-4'>
            <li className='font-semibold'>
                Show
            </li>
            {[9,12,18,24].map(limitNumber => (
                <li key={limitNumber}>
                    <button type='button' 
                    onClick={() => setLimit(limitNumber)}
                    className={`${limitNumber === limit ? "w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm cursor-pointer"  : "cursor-pointer"}`}>{limitNumber}</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Sorting