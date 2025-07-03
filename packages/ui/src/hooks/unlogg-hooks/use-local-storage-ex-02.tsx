"use client";

import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { Input } from "@unlogg/ui/components/input";
import { useLocalStorage } from "@unlogg/ui/hooks/unlogg-hooks/use-local-storage";
import { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export default function UseLocalStorage_Ex_02() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>({
    key: "todo-list",
    defaultValue: [],
  });

  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">
          Persistent Todo List Hook
        </h3>
        <p className="text-muted-foreground mb-4 text-sm">
          A todo list that persists across browser sessions using localStorage
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Badge variant="default" className="text-sm">
            📝 {todos.length} Total Tasks
          </Badge>
          <Badge variant="secondary" className="text-sm">
            ✅ {completedCount} Completed
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            localStorage: todo-list
          </Badge>
        </div>
      </div>

      <Card className="mx-auto w-full max-w-4xl p-6">
        <h4 className="text-md mb-4 font-semibold">Todo Manager</h4>
        <TodoManager
          todos={todos}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onClearAll={clearAll}
        />
      </Card>
    </div>
  );
}

function TodoManager({
  todos,
  inputValue,
  onInputChange,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onClearAll,
}: {
  todos: TodoItem[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAddTodo: () => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onClearAll: () => void;
}) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAddTodo();
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Todo Section */}
      <div className="flex gap-2">
        <Input
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={onAddTodo} disabled={!inputValue.trim()}>
          Add
        </Button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            <div className="mb-2 text-4xl">📝</div>
            <p>No todos yet. Add one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-background flex items-center gap-3 rounded-lg border p-3"
            >
              <button
                onClick={() => onToggleTodo(todo.id)}
                className="flex-shrink-0"
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                    todo.completed
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                >
                  {todo.completed && "✓"}
                </div>
              </button>
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      {todos.length > 0 && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-muted-foreground text-sm">
            {todos.filter((t) => !t.completed).length} remaining
          </div>
          <Button variant="outline" onClick={onClearAll} size="sm">
            Clear All
          </Button>
        </div>
      )}

      {/* Storage Info */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="text-sm text-gray-700">
            <strong>Storage Size:</strong> {JSON.stringify(todos).length} bytes
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="text-sm text-gray-700">
            <strong>Last Updated:</strong>{" "}
            {todos.length > 0
              ? new Date(
                  Math.max(...todos.map((t) => new Date(t.createdAt).getTime()))
                ).toLocaleTimeString()
              : "Never"}
          </p>
        </div>
      </div>
    </div>
  );
}
