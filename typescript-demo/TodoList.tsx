import React, { useState } from "react";
import Clock from "./Clock";

interface ToDoItem {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: Date;
}

function TodoList() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.length === 0) {
      alert("입력란이 비었습니다.");
      return;
    }

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: newTodo,
        isDone: false,
        createdAt: new Date(),
      },
    ]);
    setNewTodo("");
  };
  const checkTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "16px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>To Do List</h1>

      <section>
        <Clock />
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "row",
          columnGap: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ padding: "12px" }}
        />
        <button
          type="button"
          onClick={addTodo}
          style={{
            padding: "12px",
            borderRadius: "24px",
            backgroundColor: "yellow",
          }}
        >
          추가
        </button>
      </section>

      {todos.length > 0 && (
        <section>
          <ul>
            {todos.map((item) => (
              <li
                style={{
                  listStyleType: "none",
                  display: "flex",
                  columnGap: "8px",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onClick={() => checkTodo(item.id)}
                />
                <p style={{ textDecoration: item.isDone ? "underline" : "" }}>
                  {item.title}
                </p>
                <button
                  type="button"
                  onClick={() => removeTodo(item.id)}
                  style={{
                    padding: "10px",
                    border: "1px solid red",
                    borderRadius: "24px",
                    backgroundColor: "white",
                    color: "red",
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default TodoList;
