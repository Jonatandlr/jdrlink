
import React from "react";
const MaxWithWrapper = (
    { children, className = '' }: { children: React.ReactNode, className?: string }
) => {
    return (
        <div className='mx-auto w-full max-w-screen-2xl px-2.5 md:px-20 '>
            {children}
        </div>
    )
}

export default MaxWithWrapper;