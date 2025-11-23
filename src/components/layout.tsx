import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <nav className="bg-blue-700 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-8 text-lg font-semibold">
            <Link to="/">Home</Link>
            <Link to="/tarefas">Tarefas</Link>

            {/* ➕ Link correto para ADD-TAREFAS */}
            {user && (
              <Link to="/add-tarefas" className="text-green-300">
                Adicionar Tarefa
              </Link>
            )}

            {user && (
                <Link to="/projetos-pessoais" className="text-purple-300">
                    Projetos Pessoais
                </Link>
            )}

            {user && (
                <Link to="/add-projetos" className="text-green-300">
                    Adicionar Projetos
                </Link>
            )}

            {user && (
                <Link to="/meta" className="text-blue-300">
                    Meta
                </Link>
            )}

            {user && (
                <Link to="/dashboard" className="text-orange-300">
                    Dashboard
                </Link>
            )}

            {/* Mostrar "Cadastro" apenas quando NÃO estiver logado */}
            {!user && (
              <Link to="/cadastro" className="text-yellow-300">
                Cadastro
              </Link>
            )}
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition-all"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold transition-all"
            >
              Login
            </Link>
          )}

        </div>
      </nav>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
