import { useState } from "react";
import { API_ROAD } from "../api/road-info";
import { useNavigate } from "react-router-dom";

export function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Adicionado para controle de loading

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setIsSubmitting(true);

    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_ROAD}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        // Assume que 409 (Conflict) ou 400 (Bad Request) é um erro de email já cadastrado.
        const errorData = await response.json(); 
        const errorMessage = errorData.message || "Erro ao cadastrar. Tente outro email.";
        setErro(errorMessage);
        setIsSubmitting(false);
        return;
      }

      setSucesso("Cadastro realizado com sucesso! Redirecionando para o login...");
      
      // Redireciona para login após sucesso
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error("Erro:", error);
      setErro("Erro ao conectar com o servidor.");
    } finally {
      // O reset da flag isSubmitting só ocorrerá se o navigate não tiver sido executado
      // ou se houver um erro, mas é importante ter o reset aqui.
      if (!sucesso) { 
         setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/70 p-4 sm:p-6">
      <div className="bg-white shadow-2xl shadow-indigo-100/50 rounded-3xl p-8 md:p-10 w-full max-w-md border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
        
        {/* HEADER */}
        <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                {/* Ícone de Usuário/Registro */}
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5M15 19l4-4 4 4" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
                Crie sua Conta Gratuita
            </h1>
            <p className="text-slate-500 text-sm mt-1">
                Junte-se ao RoadToWork e comece sua jornada!
            </p>
        </div>

        <form onSubmit={handleCadastro} className="flex flex-col gap-5">

          {/* CAMPO NOME */}
          <input
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
          />

          {/* CAMPO EMAIL */}
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
          />

          {/* CAMPO SENHA */}
          <input
            type="password"
            placeholder="Crie uma senha forte"
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

          {/* FEEDBACK DE SUCESSO */}
          {sucesso && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {sucesso}
            </div>
          )}

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={isSubmitting || !!sucesso}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
             {isSubmitting ? (
                <>
                    {/* Spinner de Loading SVG */}
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registrando...
                </>
              ) : (
                "Cadastrar"
              )}
          </button>
        </form>

        {/* LINK PARA LOGIN */}
        <p className="text-center mt-6 text-slate-500 text-sm">
          Já tem conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer transition-colors"
          >
            Faça login
          </span>
        </p>
      </div>
    </div>
  );
}