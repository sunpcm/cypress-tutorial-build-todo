import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveTodo, loadTodos, destroyTodo, updateTodo } from '../lib/service'
import { filterTodos } from '../lib/utils'

const TodoApp = () => {

    const [currentTodo, setCurrentTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(false);

  useEffect(
    () => {
      loadTodos()
        .then(({ data }) => setTodos(data))
        .catch(() => setError(true));
    }, []
  )

  const handleNewTodoChange = (evt) => {
    setCurrentTodo(evt.target.value);
  }

  const handleDelete = (id) => {
    destroyTodo(id)
      .then(() => setTodos(todos.filter(t => t.id !== id)))
  }

  const handleToggle = (id) => {
    const targetTodo = todos.find(t => t.id === id)
    const updated = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete
    }
    updateTodo(updated)
      .then(({ data }) => {
        const handledTodos = todos.map(
          t => t.id === data.id ? data : t
        )
        setTodos(handledTodos);
      })
  }

  const handleTodoSubmit = (evt) => {
    evt.preventDefault()
    const newTodo = { name: currentTodo, isComplete: false }
    saveTodo(newTodo)
      .then(({ data }) => {
          setTodos(todos.concat(data));
          setCurrentTodo('');
      })
      .catch(() => setError(true));
  }

    const remaining = todos.filter(t => !t.isComplete).length
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {error ? <span className='error'>Oh no!</span> : null}
            <TodoForm
              currentTodo={currentTodo}
              handleTodoSubmit={handleTodoSubmit}
              handleNewTodoChange={handleNewTodoChange} />
          </header>
          <section className="main">
            <Route path='/:filter?' render={({ match }) =>
              <TodoList
                todos={filterTodos(match.params.filter, todos)}
                handleDelete={handleDelete}
                handleToggle={handleToggle} />
            } />
          </section>
          <Footer remaining={remaining} />
        </div>
      </Router>
    )
}

export default TodoApp;
