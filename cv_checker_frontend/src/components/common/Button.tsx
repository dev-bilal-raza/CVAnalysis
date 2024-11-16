import React from 'react'

const Button = ({ is_delete, children, click_func, other_css }: {
    is_delete: boolean,
    children: any,
    click_func?: () => void,
    other_css?: string
}) => {
    return (
        <div className='border-b-2 hover:border-black duration-1000 border-transparent w-fit'>
            <button className={`font-sans p-2 md:px-4 rounded-lg ${!is_delete ? "bg-black" : "bg-red-500"} text-white md:text-base text-sm  hover:text-black hover:bg-transparent duration-1000 ${other_css}`} onClick={click_func}>
                {children}
            </button>
        </div>
    )
}

export default Button