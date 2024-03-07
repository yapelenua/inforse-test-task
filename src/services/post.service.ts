import axios from 'axios';

class PostService {
  fetchPosts(currentPage: number) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
  }
}

export const postService = new PostService()