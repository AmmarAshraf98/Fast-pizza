import React from "react";

export default function Loader() {
  return (
    <div
      className='absolute flex items-center justify-center inset-0 bg-slate-200/20 backdrop-blur-xs
      
    '
    >
      <div className='loader'></div>
    </div>
  );
}
