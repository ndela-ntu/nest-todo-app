import { isArray } from "util";
import CreateTodoForm from "../components/ui/create-todo-form";
import Navbar from "../components/ui/navbar";
import { getTodos } from "../lib/api";
import { requireAuth } from "../lib/auth";
import TodoItem from "../components/ui/todo-item";

export default async function DashboardPage() {
  const user = await requireAuth();
  const todos = await getTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2"></p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Todo
          </h2>
          <CreateTodoForm />
        </div>

        {Array.isArray(todos) ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Todos</h2>
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No todos yet. Add one above!
              </p>
            ) : (
              <div className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <h2>{`Error: ${todos.message}`}</h2>
        )}
      </div>
    </div>
  );
}
