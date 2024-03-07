import React from 'react';
import EmptyBox from '../icons/emptyBox.svg';


export const EmptyPlug: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-48 pt-[140px] flex-col">
      <img src={EmptyBox} alt="Empty Box" className='h-[80px] w-[80px]'/>
      <h1>OOPS! There are no posts</h1>
    </div>
  );
};

