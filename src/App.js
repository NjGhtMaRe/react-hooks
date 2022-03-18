import logo from './logo.svg';
import './App.css';
import PostList from "./components/PostList/PostList";
import React, {useState, useEffect} from 'react';
import queryString from 'query-string'
import Pagination from "./components/PostList/Pagination";
import PostFilters from "./components/PostList/PostFilters";
import TodoList from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoList/TodoForm";
function App() {
  const [postList, setPostList] = useState([])
  const [pagination, setPagination] = useState({})
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: ""
  })

  const {
    v1: uuidv1,
    v4: uuidv4
  } = require("uuid");

  const [todoList, setTodoList] = useState([
    {id: uuidv4(), title: "I'm Andy"},
    {id: uuidv4(), title: "I'm Bin Bin"},
    {id: uuidv4(), title: "I'm Tuk Tuk"}
  ])
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

  function handleFiltersChange(newFilters) {
    console.log("New Filters: ", newFilters)
    setFilters({
      ...filters,
      _paper: 1,
      title_like: newFilters.searchTerm,
    })
  }

  function handleTodoList(todo) {
    const index = todoList.findIndex(x => x.id === todo.id)
    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodoList(newTodoList)
  }

  function handleTodoSubmit(formValues) {
    const newTodo = {
      id: uuidv4(),
      ...formValues
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList)
  }
  return (
    <div className="App">
      <h1>Welcome to my class!</h1>
      <PostFilters onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePage} />
      <TodoList todos={todoList} onTodoList={handleTodoList} />
      <TodoForm onSubmit={handleTodoSubmit} />
    </div>
  );
}

export default App;
