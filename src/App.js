import logo from './logo.svg';
import './App.css';
import PostList from "./components/PostList/PostList";
import React, {useState, useEffect} from 'react';
import queryString from 'query-string'
import Pagination from "./components/PostList/Pagination";
function App() {
  const [postList, setPostList] = useState([])
  const [pagination, setPagination] = useState({})
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1
  })
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const {data, pagination} = responseJSON;
        setPostList(data)
        setPagination(pagination)
      } catch(error) {
        console.log("Failed to fetch: ", error.message)
      }
    }
    fetchPostList();
  }, [filters])

  function handlePage(newPage) {
    setFilters({
      ...filters,
      _page: newPage
    })
  }
  return (
    <div className="App">
      <h1>Welcome to my class!</h1>
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePage} />
    </div>
  );
}

export default App;
