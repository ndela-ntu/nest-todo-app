'use client';

import { deleteTodoAction, updateTodoAction } from "@/app/lib/actions/todos";
import { Todo } from "@/app/lib/api";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  showUser?: boolean;
}

export default function TodoItem({ todo, showUser = false }: TodoItemProps) {
  const [name, setName] = useState<string>(todo.name);
  const [description, setDescription] = useState<string>(
    todo.description ?? ""
  );
  const [isComplete, setIsComplete] = useState<boolean>(todo.isComplete);

//   const handleToggle = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("isComplete", isComplete.toString());

//     await updateTodoAction(todo.id, formData);
//   };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      await deleteTodoAction(todo.id);
    }
  };

  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow border">
      <input
        type="checkbox"
        checked={isComplete}
        disabled
        //onChange={handleToggle}
        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
      />
      <div className="flex-1">
        <h3
          className={`font-medium ${
            isComplete ? "line-through text-gray-500" : "text-gray-700"
          }`}
        >
          {todo.name}
        </h3>
        {todo.description && (
          <p
            className={`text-sm ${
              isComplete ? "line-through text-gray-400" : "text-gray-600"
            }`}
          >
            {todo.description}
          </p>
        )}
        {showUser && todo.user && (
          <p className="text-xs text-gray-500 mt-1">
            By: {todo.user.name} ({todo.user.email})
          </p>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}
