import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Todo {
  id: number;
  title: string;
  subTasks: Todo[];
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newId = todos.length + 1;
      const newTodoItem: Todo = {
        id: newId,
        title: newTodo,
        subTasks: [],
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleAddSubTask = (parentId: number, subTaskTitle: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === parentId) {
        const newId = todo.subTasks.length + 1;
        const newSubTask: Todo = {
          id: newId,
          title: subTaskTitle,
          subTasks: [],
        };
        return {
          ...todo,
          subTasks: [...todo.subTasks, newSubTask],
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const renderTodoList = (todoList: Todo[]) => {
    return (
      <ul style={{ margin: "5px", paddingLeft: "20px" }}>
        {todoList.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            {todo.title}
            <button
              style={{
                backgroundColor: "#65a9e0",
                color: "#fff",
                width: "100px",
                height: "35px",
                fontSize: "14px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                marginLeft: "10px",
              }}
              onClick={() => handleAddSubTask(todo.id, `Subtask of ${todo.title}`)}
            >
              Add Subtask
            </button>
            {todo.subTasks.length > 0 && renderTodoList(todo.subTasks)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ backgroundColor: "#f2f2f2", padding: "20px", textAlign: "center", marginBottom: "30px" }}>
        Welcome, {user?.username}
      </h2>

      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Todo List</h3>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <input
          style={{ flex: 1, height: "35px", marginRight: "10px", padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
          type="text"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "#65a9e0",
            color: "#fff",
            width: "100px",
            height: "35px",
            fontSize: "14px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontFamily: "Montserrat",
          }}
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>

      {renderTodoList(todos)}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          style={{
            backgroundColor: "#AA4A44",
            color: "#fff",
            width: "100px",
            height: "35px",
            fontSize: "14px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontFamily: "Montserrat",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
