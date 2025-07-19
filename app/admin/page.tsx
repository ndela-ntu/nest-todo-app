import Navbar from "../components/ui/navbar";
import TodoItem from "../components/ui/todo-item";
import { getTodos, getUsers } from "../lib/api";
import { requireAdmin } from "../lib/auth";

export default async function AdminPage() {
  const user = await requireAdmin();
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  let todosMessage: string | null = null;
  let completedTodos: number | null = null;
  let totalTodos: number | null = null;

  let totalUsers: number | null = null;
  let usersMessage: string | null = null;

  if (Array.isArray(todos)) {
    completedTodos = todos.filter((todo) => todo.isComplete).length;
    totalTodos = todos.length;
  } else {
    todosMessage = todos.message;
  }

  if (Array.isArray(users)) {
    totalUsers = users.length;
  } else {
    usersMessage = users.message;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users and todos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            {totalUsers !== null ? (
              <p className="text-3xl font-bold text-blue-0600 mt-2">
                {totalUsers}
              </p>
            ) : (
              <p className="text-red-600">{usersMessage}</p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Todos</h3>
            {totalTodos !== null ? (
              <p className="text-3xl font-bold text-blue-0600 mt-2">
                {totalTodos}
              </p>
            ) : (
              <p className="text-red-600">{todosMessage}</p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Completed Todos</h3>
            {completedTodos !== null ? (
              <p className="text-3xl font-bold text-blue-0600 mt-2">
                {completedTodos}
              </p>
            ) : (
              <p className="text-red-600">{todosMessage}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Users</h2>
            </div>
            <div className="p-6">
              {Array.isArray(users) ? (
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === "ADMIN"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600">{usersMessage}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">All Todos</h2>
            </div>
            <div className="p-6">
              {Array.isArray(todos) ? (
                todos.length === 0 ? (
                  <p className="text-gray-500 text-center">No todos found</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {todos.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} showUser />
                    ))}
                  </div>
                )
              ) : (
                <p className="text-red-500">{todosMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
