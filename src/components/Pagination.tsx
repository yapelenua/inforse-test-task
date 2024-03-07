import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="mt-8 flex justify-center pb-[60px]">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`mx-2 py-2 px-4 rounded focus:outline-none ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
