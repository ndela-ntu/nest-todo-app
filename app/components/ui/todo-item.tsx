"use client";

import {
  deleteTodoAction,
  toggleIsComplete,
  updateTodoAction,
} from "@/app/lib/actions/todos";
import { Todo } from "@/app/lib/api";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  showUser?: boolean;
}

export default function TodoItem({ todo, showUser = false }: TodoItemProps) {
  const [name, setName] = useState<string>(todo.name);
  const [description, setDescription] = useState<string>(todo.description ?? '');
  const [isComplete, setIsComplete] = useState<boolean>(todo.isComplete);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleSaveUpdate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('isComplete', isComplete.toString());

    await updateTodoAction(todo.id, formData);
    setIsUpdating(false);
  }

  const handleUpdatingToggle = () => {
    setIsUpdating(isUpdating ? false : true);
  };

  const handleToggleIsComplete = async (isComplete: boolean) => {
    await toggleIsComplete(todo.id, isComplete);
  };

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
        onChange={(e) => {
          setIsComplete(e.target.checked);
          handleToggleIsComplete(e.target.checked);
        }}
        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
      />
      <div className="flex flex-col flex-1 space-y-2">
        {isUpdating ? (
          <input
            type="text"
            placeholder="Todo name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="p-0 px-3 border border-gray-300 rounded-lg focus:outline-non focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-gray-600"
          />
        ) : (
          <h3
            className={`font-medium ${
              todo.isComplete ? "line-through text-gray-500" : "text-gray-700"
            }`}
          >
            {todo.name}
          </h3>
        )}
        {isUpdating ? (
          <textarea
          value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Todo name"
            className="p-0 px-3 border border-gray-300 rounded-lg focus:outline-non focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-gray-600"
          />
        ) : (
          todo.description && (
            <p
              className={`text-sm ${
                todo.isComplete ? "line-through text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )
        )}
        {showUser && todo.user && (
          <p className="text-xs text-gray-500 mt-1">
            By: {todo.user.name} ({todo.user.email})
          </p>
        )}
      </div>
      {isUpdating ? (
        <div className="space-x-2.5">
          <button onClick={handleSaveUpdate} className="text-blue-600 hover:text-blue-800 text-sm font-medium rounded-xl bg-blue-200 p-3 border border-blue-500">
            Save
          </button>
          <button
            onClick={handleUpdatingToggle}
            className="text-red-600 hover:text-red-800 text-sm font-medium rounded-xl bg-red-200 p-3 border border-red-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-x-2.5">
          <button
            onClick={handleUpdatingToggle}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium rounded-xl bg-blue-200 p-3 border border-blue-500"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium rounded-xl bg-red-200 p-3 border border-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
