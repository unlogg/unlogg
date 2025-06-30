"use client";

import { useState } from "react";
import { Badge } from "@unlogg/ui/components/badge";
import { Button } from "@unlogg/ui/components/button";
import { Card } from "@unlogg/ui/components/card";
import { Input } from "@unlogg/ui/components/input";
import { useLocalStorage } from "@unlogg/ui/hooks/unlogg-hooks/use-local-storage";

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
        <h3 className="text-lg font-semibold mb-2">
          Persistent Todo List Hook
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          A todo list that persists across browser sessions using localStorage
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
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

      <Card className="w-full max-w-4xl mx-auto p-6">
        <h4 className="text-md font-semibold mb-4">Todo Manager</h4>
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
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">📝</div>
            <p>No todos yet. Add one above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-background border rounded-lg"
            >
              <button
                onClick={() => onToggleTodo(todo.id)}
                className="flex-shrink-0"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    todo.completed
                      ? "bg-green-500 border-green-500 text-white"
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
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {todos.filter((t) => !t.completed).length} remaining
          </div>
          <Button variant="outline" onClick={onClearAll} size="sm">
            Clear All
          </Button>
        </div>
      )}

      {/* Storage Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Storage Size:</strong> {JSON.stringify(todos).length} bytes
          </p>
        </div>
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
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
