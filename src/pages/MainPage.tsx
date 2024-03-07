import React, { useState, useEffect } from 'react';
import { IPost, ISuggestion } from '../types/post.type';
import { SearchBar } from '../components/SearchBar';
import { PostList } from '../components/PostList';
import { Pagination } from '../components/Pagination';
import { postService } from '../services/post.service'
import { EmptyPlug } from '../components/EmptyPlug';


export const MainPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [ isHomeVisible, setIsHomeVisible ] = useState<boolean>(false);

  const fetchPosts = async (currentPage: number) => {
    try {
      const response = await postService.fetchPosts(currentPage)
      const totalCount = Number(response.headers['x-total-count']);
      const totalPages = Math.ceil(totalCount / 10);
      setPosts(response.data);
      setTotalPages(totalPages);
    } catch (error) {
      throw new Error('Error fetching posts:' + error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setSearchValue(value);
    if (value === '') {
      setSuggestions([]);
      fetchPosts(currentPage);
    } else {
      const filteredSuggestions = posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: ISuggestion) => {
    setSearchValue(suggestion.title);
    setSelectedSuggestion(suggestion.title);
    setSuggestions([]);
  };

  const handleSearchSubmit = () => {
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()));
    setPosts(filteredPosts);
    setSuggestions([]);
    setSearchValue('');
    setIsHomeVisible(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowAllPosts = () => {
    setSearchValue('');
    setIsHomeVisible(false);
    fetchPosts(currentPage);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl text-center mb-4">Posts Search</h1>
      <SearchBar
        searchValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchSubmit={handleSearchSubmit}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        handleShowAllPosts={handleShowAllPosts}
        isHomeVisible = {isHomeVisible}
      />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <EmptyPlug/>
      )}

      {posts.length > 9 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
      )}
    </div>
  );
};
