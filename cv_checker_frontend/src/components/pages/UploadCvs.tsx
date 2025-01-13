'use client';
import Input from '../common/Input';
import { toast } from 'react-hot-toast';
import { STATUS } from '@/common/constants';
import { useRouter } from 'next/navigation';
import Loader from '../layout/loader/Loader';
import { addJob } from '@/apis/job.api';
import React, { FormEvent, useState } from 'react';
import { handleUploadFiles } from '@/utils/file_handler';

const Stepper = ({
  step,
  handleStep,
  canProceed,
}: {
  step: number;
  handleStep: (step: number) => void;
  canProceed: (step: number) => boolean;
}) => {
  const steps = [
    { number: 1, label: 'Job Title' },
    { number: 2, label: 'Job Description' },
    { number: 3, label: 'Upload CVs' },
  ];

  return (
    <div className="flex justify-center w-full py-8 mb-6">
      <div className="relative flex justify-between w-full max-w-3xl px-4">
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200" />
        <div
          className="absolute top-6 left-0 h-1 bg-purple-600 transition-all duration-500 ease-in-out"
          style={{
            width: `${((step - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((s, index) => (
          <div
            key={s.number}
            className="flex flex-col items-center"
            style={{
              width: index === 0 || index === steps.length - 1 ? 'auto' : '0',
            }}
          >
            <button
              onClick={() => handleStep(s.number)}
              type="button"
              className={`
                relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full
                transition-all duration-300 ease-in-out transform hover:scale-110
                ${
                  step >= s.number
                    ? 'bg-[#6b39ba] text-white shadow-lg hover:bg-[#8148db]'
                    : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300'
                }
                ${step === s.number ? 'ring-4 ring-purple-100' : ''}
              `}
              disabled={!canProceed(s.number)}
            >
              <span className="font-bold text-sm sm:text-lg">{s.number}</span>
            </button>

            <div
              className={`
              absolute top-14 text-sm font-medium whitespace-nowrap
              transition-colors duration-300
              ${step >= s.number ? 'text-[#6b39ba]' : 'text-gray-400'}
            `}
            >
              <p className="exsmall:block hidden">{s.label}</p>
              <p
                aria-valuetext={s.label}
                className="text-tooltip block sm:hidden relative"
              >
                {s.label.slice(0, 4)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UploadCvs = () => {
  const [formState, setFormState] = useState({
    step: 1,
    jobTitle: '',
    jobDescription: '',
    uploadedFiles: [] as File[],
    fileLimit: false,
    response: '',
    loading: false,
  });

  const router = useRouter();

  // Function to count non-whitespace characters
  const countNonWhitespace = (str: string): number => {
    return str.replace(/\s/g, '').length;
  };

  const canProceedToStep = (targetStep: number): boolean => {
    if (targetStep <= formState.step) return true;
    if (targetStep === 2) return countNonWhitespace(formState.jobTitle) >= 3;
    if (targetStep === 3)
      return countNonWhitespace(formState.jobDescription) >= 15;
    return false;
  };

  const handleStep = (newStep: number) => {
    console.log('New step: ', newStep);
    if (canProceedToStep(newStep)) {
      setFormState((prev) => ({
        ...prev,
        step: newStep,
        response: '',
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    // event.();
    const fileResponse = handleUploadFiles(
      Array.from(event.currentTarget.files),
      formState.uploadedFiles,
      (limit: boolean) =>
        setFormState((prev) => ({ ...prev, fileLimit: limit })),
      (files: File[]) =>
        setFormState((prev) => ({ ...prev, uploadedFiles: files }))
    );

    setFormState((prev) => ({
      ...prev,
      response:
        fileResponse === true
          ? ''
          : 'You are only allowed to upload PDF files.',
    }));
  };

  const uploadCvs = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    if (formState.step !== 3) return;

    setFormState((prev) => ({ ...prev, loading: true, response: '' }));

    const isValid =
      formState.uploadedFiles.length > 0 &&
      formState.jobTitle &&
      countNonWhitespace(formState.jobDescription) >= 15;

    if (isValid) {
      const formData = new FormData();
      formState.uploadedFiles.forEach((file) => {
        formData.append('cvs', file);
      });
      formData.append('job_title', formState.jobTitle);
      formData.append('job_description', formState.jobDescription);

      try {
        const response = await addJob(formData);
        console.log('Response: ', response);
        if (response?.data.status === STATUS.SUCCESS) {
          setFormState((prev) => ({ ...prev, loading: false }));
          toast.success(response.data.message, {
            style: {
              border: '2px solid #DEF0E1',
              padding: '16px',
              color: 'black',
              fontWeight: 'bold',
              backgroundColor: '#F1F8F4',
            },
            iconTheme: {
              primary: '#039427',
              secondary: '#FFFAEE',
            },
          });
          // setTimeout(() => router.push('/'), 2000);
        } else {
          toast.error(response?.data.message, {
            style: {
              border: '2px solid #F3DDD7',
              padding: '16px',
              color: 'black',
              fontWeight: 'bold',
              backgroundColor: '#FBEFEB',
            },
            iconTheme: {
              primary: '#f71b31',
              secondary: '#FFFAEE',
            },
          });
          setFormState((prev) => ({
            ...prev,
            loading: false,
            response: response?.data.message,
          }));
        }
      } catch (error) {
        setFormState((prev) => ({
          ...prev,
          loading: false,
          response: 'An error occurred while uploading files.',
        }));
        toast.error('An error occurred while uploading files.', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      }
    } else {
      console.log('Invalid form data');
      setFormState((prev) => ({
        ...prev,
        loading: false,
        response: 'You have not filled the form correctly.',
      }));
    }
  };

  const renderStepContent = () => {
    switch (formState.step) {
      case 1:
        return (
          <div className="w-full p-1 sm:p-3 md:p-5">
            <Input
              labelText="Job Title"
              extraLabel="(min. 3 non-space characters)"
              is_required={false}
              input_value={formState.jobTitle}
              setInput={(value) =>
                setFormState((prev) => ({
                  ...prev,
                  jobTitle: value,
                }))
              }
            />
            {formState.jobTitle.length > 0 &&
              countNonWhitespace(formState.jobTitle) < 3 && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter at least 3 non-space characters (
                  {3 - countNonWhitespace(formState.jobTitle)} more needed)
                </p>
              )}
          </div>
        );

      case 2:
        return (
          <div className="w-full p-1 sm:p-3 md:p-5">
            <div className="relative w-full">
              <textarea
                className="resize-none bg-slate-100 focus:bg-white h-28 peer w-full font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm rounded-[7px] border-blue-gray-200 focus:border-purple-700 px-2 py-2 border-t-transparent"
                placeholder=" "
                value={formState.jobDescription}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    jobDescription: e.target.value,
                  }))
                }
                required
              />
              <label className="flex w-full select-none pointer-events-none absolute left-0 font-normal truncate peer-placeholder-shown:text-text-purple-700 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-400 peer-focus:text-purple-700 before:border-blue-gray-200 peer-focus:before:!border-purple-700 after:border-blue-gray-200 peer-focus:after:!border-purple-700">
                Job Description{' '}
                <span className="exsmall:inline hidden">
                  (min. 15 non-space characters)
                </span>
              </label>
              {formState.jobDescription.length > 0 &&
                countNonWhitespace(formState.jobDescription) < 15 && (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter at least 15 non-space characters (
                    {15 - countNonWhitespace(formState.jobDescription)} more
                    needed)
                  </p>
                )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-2xl mx-auto p-5">
            <div className="space-y-4">
              <label className="block text-center text-lg font-medium text-gray-700">
                Upload CVs
              </label>
              <div className="relative">
                <label
                  className="group flex flex-col items-center justify-center w-full h-48 
                                border-2 border-dashed border-gray-300 rounded-lg
                                transition-all hover:border-purple-700 cursor-pointer
                                bg-gray-50 hover:bg-gray-100"
                >
                  <div className="space-y-2 text-center">
                    <div
                      className="mx-auto inline-flex h-12 w-12 items-center justify-center 
                                  rounded-full bg-gray-200 group-hover:bg-gray-300"
                    >
                      <svg
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-purple-700 hover:text-purple-600">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </div>
                    <p className="text-xs text-gray-500">PDF files only</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf"
                    disabled={formState.fileLimit}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {formState.uploadedFiles.length > 0 && (
                <div className="text-center text-sm text-gray-600">
                  {formState.uploadedFiles.length} CV
                  {formState.uploadedFiles.length !== 1 ? 's' : ''} uploaded
                </div>
              )}
              {formState.response && (
                <div className="text-center text-sm font-para text-red-500">
                  {formState.response}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  const renderNavigation = () => {
    if (formState.loading)
      return (
        <div className="w-full flex flex-col justify-center items-center m-2 mb-6">
          <Loader />
          <p className="text-gray-500 font-para text-sm sm:text-base text-center">
            This may take a moment, but it’ll be faster than waiting for a human
            to handle it.
          </p>
        </div>
      );

    return (
      <div className="flex justify-between items-center w-full px-2 sm:px-5 py-4">
        {formState.step > 1 && (
          <button
            type="button"
            onClick={() => handleStep(formState.step - 1)}
            className="sm:px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none
                     transition-colors duration-200"
          >
            ← Back
          </button>
        )}
        <div className={formState.step === 1 ? 'ml-auto' : ''}>
          {formState.step === 3 ? (
            <button
              type="submit"
              disabled={formState.uploadedFiles.length === 0}
              className="px-2 sm:px-4 md:px-6 py-2 text-sm sm:text-lg bg-[#6b39ba] text-white rounded-lg
                       hover:bg-[#8243e7] focus:outline-none focus:ring-2 
                       focus:ring-purple-700 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              Analyze CVs
            </button>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => handleStep(formState.step + 1)}
                disabled={!canProceedToStep(formState.step + 1)}
                className="px-2 sm:px-4 md:px-6 py-2 text-sm sm:text-lg bg-[#6b39ba] text-white rounded-lg
                       hover:bg-[#8243e7] focus:outline-none focus:ring-2 
                       focus:ring-purple-700 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-1 sm:px-6 lg:px-8">
      <div className="relative bg-white w-full md:max-w-4xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="relative font-heading text-center text-2xl exsmall:text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Analyze Your CVs
          </h2>
          <p className="text-slate-500 text-sm md:text-lg text-center">
            The more you add, the more accurate your analysis will be.
          </p>
        </div>
        <form
          onSubmit={uploadCvs}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className=" py-5 px-2 sm:px-4 md:p-6">
            <Stepper
              step={formState.step}
              handleStep={handleStep}
              canProceed={canProceedToStep}
            />
            {renderStepContent()}
          </div>
          {renderNavigation()}
        </form>
      </div>
    </div>
  );
};

export default UploadCvs;
