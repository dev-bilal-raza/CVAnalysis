import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='relative z-20 text-white p-6 bg-gradient-to-br from-black via-black to-[#151733]'>
            <div className='flex justify-center gap-2 items-center font-extralight font-sans text-small'>
                <Link href={""}>Github</Link>
                <Link href={""}>LinkedIn</Link>
                <Link href={""}>Facebook</Link>
            </div>
            <div className='h-0.5 bg-gradient-to-r from-black via-white to-[#0a0d13] m-4'/>
            <p className='text-center'>
                Copyright © 2024 CV Analyzer
            </p>
        </footer>
    )
}

export default Footer