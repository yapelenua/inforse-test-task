import React from 'react';
import { IPost } from '../types/post.type';

interface PostListProps {
  posts: IPost[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 h-[800px]">
      {posts.map(post => (
        <div key={post.id} className="border border-gray-300 p-4 rounded lg:h-[120px] h-[160px]">
          <h2 className="text-xl font-semibold mb-2 multi-truncate">{post.title}</h2>
          <p className="multi-truncate">{post.body}</p>
        </div>
      ))}
    </div>
  );
};
