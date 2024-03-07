import React from 'react';
import { ISuggestion } from '../types/post.type';
import HomeIcon from '../icons/homeIcon.svg';

interface SearchBarProps {
  searchValue: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: () => void;
  suggestions: ISuggestion[];
  handleSuggestionClick: (suggestion: ISuggestion) => void;
  handleShowAllPosts: () => void;
  isHomeVisible:boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  isHomeVisible, 
  searchValue, 
  handleSearchInputChange, 
  handleSearchSubmit, 
  suggestions, 
  handleSuggestionClick, 
  handleShowAllPosts }) => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChange}
        placeholder="Search posts..."
        className="border border-gray-300 rounded py-2 px-4 mr-2"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white w-64 shadow-md mt-[160px] position-relative top-[2px]">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="cursor-pointer p-2 hover:bg-gray-100">
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSearchSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Search</button>
      {isHomeVisible && 
        <button onClick={handleShowAllPosts} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-2">
          <img src={HomeIcon} alt="Home Icon" />
        </button>
    }
    </div>
  );
};
