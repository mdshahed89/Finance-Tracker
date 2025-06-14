import React from 'react'

const loading = () => {
  return (
    <div className=' flex items-center justify-center min-h-[100vh] w-full '>
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>
        </div>
  )
}

export default loading