'use client';
import React from 'react';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import {
  registerWithGoogle,
  registerWithGithub,
} from '@/app/(auth)/auth_handler';

export function SignIn() {
  type HandlerName = 'google' | 'github';

  const signInHandler = (handler_name: HandlerName) => {
    const handlers: { [key in HandlerName]: () => void } = {
      google: registerWithGoogle,
      github: registerWithGithub,
    };

    handlers[handler_name]();
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to AI CV Analyzer
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Empower your recruitment process with AI CV Analyzer, revolutionizing
        candidate evaluation.
      </p>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      <div className="flex flex-col space-y-4">
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium  bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
          onClick={() => signInHandler('google')}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
          <span className="text-neutral-300 text-sm">Google</span>
          <BottomGradient />
        </button>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium  bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
          onClick={() => signInHandler('github')}
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-300" />
          <span className="text-neutral-300 text-sm">Github</span>
          <BottomGradient />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-[#4841a5] to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
