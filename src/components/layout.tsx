import { useState } from "react"; // Adicionei o useState
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
    setIsMenuOpen(false); // Fecha o menu ao sair
  }

  // Função auxiliar para fechar o menu ao clicar em um link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-20 font-sans antialiased">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-300 shadow-xl shadow-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LADO ESQUERDO: Logo ou Home (Link Principal) */}
            <div className="flex-shrink-0">
               <Link to="/" onClick={closeMenu} className="text-xl font-bold text-white tracking-tighter hover:text-indigo-400 transition-colors">
                 RoadToWork
               </Link>
            </div>

            {/* MENU DESKTOP (md:flex) - Escondido em mobile (hidden) */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/tarefas" className="hover:text-white transition-colors">Tarefas</Link>
              <Link to="/integrantes" className="hover:text-white transition-colors">Integrantes</Link>
              <Link to="/contato" className="hover:text-white transition-colors">Contato</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link>

              {/* Links Condicionais Desktop */}
              {user && (
                <>
                  <Link to="/add-tarefas" className="text-emerald-400 hover:text-emerald-300 hover:underline decoration-emerald-400/50 underline-offset-4 transition-all">Add Tarefa</Link>
                  <Link to="/projetos-pessoais" className="text-violet-400 hover:text-violet-300 hover:underline decoration-violet-400/50 underline-offset-4 transition-all">Projetos</Link>
                  <Link to="/add-projetos" className="text-emerald-400 hover:text-emerald-300 hover:underline decoration-emerald-400/50 underline-offset-4 transition-all">Add Projetos</Link>
                  <Link to="/meta" className="text-sky-400 hover:text-sky-300 hover:underline decoration-sky-400/50 underline-offset-4 transition-all">Meta</Link>
                  <Link to="/dashboard" className="text-amber-400 hover:text-amber-300 hover:underline decoration-amber-400/50 underline-offset-4 transition-all">Dashboard</Link>
                </>
              )}

              {!user && (
                <Link to="/cadastro" className="text-yellow-400 hover:text-yellow-300 font-semibold">Cadastro</Link>
              )}

              {/* Botão de Ação Desktop */}
              <div className="ml-4 pl-4 border-l border-slate-700">
                {user ? (
                  <button onClick={handleLogout} className="px-5 py-2 rounded-full text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all">
                    Sair
                  </button>
                ) : (
                  <Link to="/login" className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all">
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* BOTÃO HAMBURGUER (Visível apenas mobile) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none p-2"
              >
                {isMenuOpen ? (
                  // Ícone X (Fechar)
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Ícone Hamburger (Menu)
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 absolute w-full left-0 shadow-2xl animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              
              <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-white">Home</Link>
              <Link to="/tarefas" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-white">Tarefas</Link>
              <Link to="/integrantes" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-white">Integrantes</Link>
              <Link to="/contato" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-white">Contato</Link>
              <Link to="/faq" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-white">FAQ</Link>
              <Link to="/sobre" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-white">Sobre</Link>

              {user && (
                <div className="border-t border-slate-700 my-2 pt-2 space-y-2">
                    <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Área do Usuário</p>
                    <Link to="/add-tarefas" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 hover:bg-slate-700 hover:text-emerald-300">Adicionar Tarefa</Link>
                    <Link to="/projetos-pessoais" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-violet-400 hover:bg-slate-700 hover:text-violet-300">Projetos Pessoais</Link>
                    <Link to="/add-projetos" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 hover:bg-slate-700 hover:text-emerald-300">Adicionar Projetos</Link>
                    <Link to="/meta" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-sky-400 hover:bg-slate-700 hover:text-sky-300">Meta</Link>
                    <Link to="/dashboard" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-amber-400 hover:bg-slate-700 hover:text-amber-300">Dashboard</Link>
                </div>
              )}

              {!user && (
                <Link to="/cadastro" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-yellow-400 hover:bg-slate-700 hover:text-yellow-300">Cadastro</Link>
              )}

              <div className="pt-4 mt-2 border-t border-slate-700">
                {user ? (
                  <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300">
                    Sair do sistema
                  </button>
                ) : (
                  <Link to="/login" onClick={closeMenu} className="block w-full text-center px-3 py-3 rounded-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500">
                    Fazer Login
                  </Link>
                )}
              </div>

            </div>
          </div>
        )}
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-6 sm:p-8 fade-in">
        <Outlet />
      </main>
    </div>
  );
}