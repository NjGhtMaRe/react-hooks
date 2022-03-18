import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
    onTodoList: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onTodoList: null,
}
function TodoList(props) {
    const {todos, onTodoList} = props;

    function handleClick(todo) {
        if (!onTodoList) return;
        onTodoList(todo)
    }
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    onClick={() => handleClick(todo)}
                >
                    {todo.title}</li>
            ))}
        </ul>
    );
}

export default TodoList;