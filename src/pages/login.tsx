import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Adicionado para controle de loading

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setIsSubmitting(true);

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      setIsSubmitting(false);
      return;
    }

    const ok = await login(email, senha);

    if (!ok) {
      setErro("Email ou senha incorretos.");
      setIsSubmitting(false);
      return;
    }

    // Redireciona após sucesso
    navigate("/");
    setIsSubmitting(false); // Embora o navigate saia do componente, é bom resetar por segurança
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/70 p-4 sm:p-6">
      <div className="bg-white shadow-2xl shadow-indigo-100/50 rounded-3xl p-8 md:p-10 w-full max-w-md border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
        
        {/* HEADER */}
        <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                {/* Ícone de Cadeado/Login */}
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
                Acesso à Plataforma
            </h1>
            <p className="text-slate-500 text-sm mt-1">
                Entre com suas credenciais.
            </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          
          {/* INPUT EMAIL */}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
          />

          {/* INPUT SENHA */}
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
          />

          {/* FEEDBACK DE ERRO */}
          {erro && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {erro}
            </div>
          )}

          {/* BOTÃO DE SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isSubmitting ? (
                <>
                    {/* Spinner de Loading SVG */}
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Autenticando...
                </>
              ) : (
                "Entrar"
              )}
          </button>

          
          {/* LINK DE CADASTRO */}
          <p className="text-center text-slate-500 mt-2 text-sm">
            Ainda não tem conta?{" "}
            <Link
              to="/cadastro"
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              Crie uma gratuitamente
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}