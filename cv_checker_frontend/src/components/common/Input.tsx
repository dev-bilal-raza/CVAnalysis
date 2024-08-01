import React from 'react'

interface InputType {
    labelText: string,
    otherClasses?: string,
    setInput: (value: string) => void
}

const Input = ({ labelText, otherClasses, setInput }: InputType) => {
    return (
        <div className="relative h-10 w-full">
            <input
                className="peer w-full focus:bg-white h-full bg-slate-100 text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                placeholder=" "
                onChange={(e) =>setInput(e.target.value)}
                required
                />
            <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-400 peer-focus:text-indigo-500 before:border-blue-gray-200 peer-focus:before:!border-indigo-500 after:border-gray-200 peer-focus:after:!border-indigo-500">
                {labelText}
            </label>
        </div>
    )
}

export default Input