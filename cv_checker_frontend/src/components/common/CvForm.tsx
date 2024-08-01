import React from 'react'

const CvForm = () => {
    return (
        <div>
            {/* <form onSubmit={uploadJob} className='flex flex-col items-center gap-6 m-6 p-4 md:order-1 order-2'>
                <p className='font-semibold text-lg text-red-500'>
                    {
                        message ? message : ""
                    }
                </p>
                <p className='font-semibold text-lg text-blue-500'>
                    {
                        responseMessage ? responseMessage : ""
                    }
                </p>
                <h1 className='font-semibold text-center'>
                    Analyze CV by writing job description.
                </h1>
                <div className='w-full'>
                    <label htmlFor="job_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job title</label>
                    <input type="text" id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setJobTitle(e.target.value)} placeholder="Frontend development" required />
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write Job description here!</label>
                    <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setJobDescription(e.target.value)} placeholder="Your responsibilities include integrating authentication..."></textarea>
                </div>
                <div className="mt-3">
                    <label htmlFor='fileUpload' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>

                        <a className={`${!fileLimit ? '' : 'disabled'} `}>Upload CVs</a>
                    </label>
                    <input id='fileUpload' className='block  p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' type='file' multiple
                        accept='application/pdf, image/png'
                        onChange={handleFileEvent}
                        disabled={fileLimit}
                    />
                    <div className="flex flex-wrap gap-2 m-2">
                        {uploadedFiles.map((file, i) => (
                            <div key={i} className='text-white bg-blue-950 rounded-xl p-4'>
                                {i + 1}: {file.name}
                            </div>
                        ))}
                    </div>
                </div>
                <button className='bg-black hover:bg-black/75 text-white px-4 p-3 rounded-lg w-28' type='submit'>
                    Analyze
                </button> */}
            {/* </form> */}
        </div>
    )
}

export default CvForm