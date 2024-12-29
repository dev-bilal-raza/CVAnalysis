import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-3 md:px-8 xl:px-16 2xl:px-24">{children}</div>;
};

export default Container;
