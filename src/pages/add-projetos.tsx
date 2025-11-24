import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom"; // Manter o import, mas não usá-lo é uma opção, ou remover. Vou removê-lo.
import { API_ROAD } from "../api/road-info";

// Removendo o import de useNavigate, pois não será mais usado.
// import { useNavigate } from "react-router-dom"; 

export function AddProjetos() {
  const { user } = useAuth();
  // const navigate = useNavigate(); // Removido
  
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setIsSubmitting(true);

    if (!titulo || !descricao) {
      setErro("Preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    if (!user?.id) {
      setErro("Usuário não identificado. Por favor, faça login novamente.");
      setIsSubmitting(false);
      return;
    }

    const body = {
      usuario: user.id,
      titulo,
      descricao,
    };

    try {
      const resp = await fetch(`${API_ROAD}/projetos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        throw new Error("Erro ao criar projeto");
      }

      setSucesso("Projeto criado com sucesso!");
      setTitulo("");
      setDescricao("");

      // CÓDIGO REMOVIDO:
      // setTimeout(() => navigate("/projetos"), 1000); 
      // O projeto agora apenas exibe o sucesso e limpa o formulário.

    } catch (error) {
      setErro("Erro ao criar projeto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full min-h-screen pt-12 md:pt-20 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 w-full max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        
        {/* CABEÇALHO DO CARD */}
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                {/* Ícone de Pasta/Projeto */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Novo Projeto
                </h1>
                <p className="text-sm text-slate-500">Registre seu próximo projeto para o portfólio.</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

            {/* INPUT TÍTULO */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Título do Projeto</label>
                <input
                type="text"
                placeholder="Ex: Clone do Spotify com React e Tailwind"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
                />
            </div>

            {/* TEXTAREA DESCRIÇÃO */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Descrição</label>
                <textarea
                placeholder="Tecnologias utilizadas, funcionalidades principais e objetivo..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 min-h-[140px] resize-none"
                />
            </div>

            {/* FEEDBACK DE ERRO */}
            {erro && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {erro}
                </div>
            )}

            {/* FEEDBACK DE SUCESSO */}
            {sucesso && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {sucesso}
                </div>
            )}

            {/* BOTÃO DE SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 mt-2"
            >
              {isSubmitting ? (
                <>
                    {/* Spinner de Loading SVG */}
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando Projeto...
                </>
              ) : (
                "Criar Projeto"
              )}
            </button>
        </form>

      </div>
    </div>
  );
}