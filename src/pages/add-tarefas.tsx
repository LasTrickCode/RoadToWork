import { useState } from "react";
import { API_ROAD } from "../api/road-info";
import { useAuth } from "../context/auth-context";

interface AddTarefaProps {
  onCreated?: () => void;
}

export function AddTarefa({ onCreated }: AddTarefaProps) {
  const { user } = useAuth();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!titulo || !descricao) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_ROAD}/tarefas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: user?.id,
          titulo,
          descricao,
          concluido: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar tarefa.");
      }

      // limpar inputs
      setTitulo("");
      setDescricao("");

      // avisar o pai para recarregar a lista
      if (onCreated) onCreated();
    } catch (err) {
      setErro("Ocorreu um erro ao tentar salvar a tarefa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 w-full max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-500">
      
      {/* CABEÇALHO DO CARD */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            {/* Ícone de + */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-slate-800">
            Criar Nova Tarefa
            </h2>
            <p className="text-sm text-slate-500">Defina sua próxima meta de estudo.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* INPUT TÍTULO */}
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Título</label>
            <input
            type="text"
            placeholder="Ex: Estudar Hooks do React"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
            />
        </div>

        {/* TEXTAREA DESCRIÇÃO */}
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Descrição</label>
            <textarea
            placeholder="Detalhe o que precisa ser feito..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 min-h-[120px] resize-none"
            />
        </div>

        {/* FEEDBACK DE ERRO */}
        {erro && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {erro}
            </div>
        )}

        {/* BOTÃO DE SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 mt-2"
        >
          {loading ? (
            <>
                {/* Spinner de Loading SVG */}
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
            </>
          ) : (
            "Adicionar Tarefa"
          )}
        </button>
      </form>
    </div>
  );
}