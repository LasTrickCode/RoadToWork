import { useEffect, useState } from "react";
import { API_ROAD } from "../api/road-info";
import { useAuth } from "../context/auth-context";
import type { Tarefa } from "../types/tarefa";

export function Tarefas() {
  const { user } = useAuth();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);

  const usuarioId = user?.id;

  // --- ESTADO DO MODAL DE EDIÇÃO ---
  const [editando, setEditando] = useState<Tarefa | null>(null);
  const [tituloEdit, setTituloEdit] = useState("");
  const [descricaoEdit, setDescricaoEdit] = useState("");

  async function carregarTarefas() {
    if (!usuarioId) return;

    try {
      const res = await fetch(`${API_ROAD}/tarefas?usuarioId=${usuarioId}`);
      const data: Tarefa[] = await res.json();
      setTarefas(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, [usuarioId]);

  // --- MARCAR COMO CONCLUÍDA ---
  async function marcarComoConcluida(id: number) {
    try {
      await fetch(`${API_ROAD}/tarefas/${id}/concluir`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concluido: true }),
      });

      carregarTarefas();
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
    }
  }

  // --- EXCLUIR TAREFA ---
  async function excluirTarefa(id: number) {
    const confirmar = confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirmar) return;

    try {
      await fetch(`${API_ROAD}/tarefas/${id}`, {
        method: "DELETE",
      });

      carregarTarefas();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  }

  // --- ABRIR O MODAL DE EDIÇÃO ---
  function abrirEditar(tarefa: Tarefa) {
    setEditando(tarefa);
    setTituloEdit(tarefa.titulo);
    setDescricaoEdit(tarefa.descricao);
  }

  // --- SALVAR EDIÇÃO ---
  async function salvarEdicao() {
    if (!editando) return;

    try {
      await fetch(`${API_ROAD}/tarefas/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: tituloEdit,
          descricao: descricaoEdit,
        }),
      });

      setEditando(null);
      carregarTarefas();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p className="text-slate-500 font-medium animate-pulse">Carregando suas tarefas...</p>
      </div>
    );
  }

  const tarefasPendentes = tarefas.filter((t) => !t.concluido);
  const tarefasConcluidas = tarefas.filter((t) => t.concluido);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER DA PÁGINA */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Gerenciamento de Tarefas
        </h1>
        <p className="mt-2 text-slate-500">
          Organize seu dia, foque no que importa e acompanhe suas vitórias.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* COLUNA PENDENTES */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
            <h2 className="text-xl font-bold text-slate-800">
              Pendentes <span className="text-sm font-medium text-slate-400 ml-2">({tarefasPendentes.length})</span>
            </h2>
          </div>

          {tarefasPendentes.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <p className="text-slate-400 font-medium">Você está livre! Nenhuma tarefa pendente.</p>
            </div>
          )}

          <div className="space-y-4">
            {tarefasPendentes.map((tarefa) => (
              <div
                key={tarefa.id}
                className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Linha colorida lateral (sutil) */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-l-2xl"></div>

                <div className="pl-3">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{tarefa.titulo}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{tarefa.descricao}</p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-50">
                        <button
                            onClick={() => marcarComoConcluida(tarefa.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Concluir
                        </button>

                        <button
                            onClick={() => abrirEditar(tarefa)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Editar
                        </button>

                        <button
                            onClick={() => excluirTarefa(tarefa.id)}
                            className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Excluir"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA CONCLUÍDAS */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
             <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
            <h2 className="text-xl font-bold text-slate-800">
              Concluídas <span className="text-sm font-medium text-slate-400 ml-2">({tarefasConcluidas.length})</span>
            </h2>
          </div>

          {tarefasConcluidas.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <p className="text-slate-400 font-medium">Nenhuma tarefa finalizada ainda.</p>
            </div>
          )}

          <div className="space-y-4">
            {tarefasConcluidas.map((tarefa) => (
              <div
                key={tarefa.id}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 opacity-75 hover:opacity-100 transition-opacity"
              >
                 <div className="flex items-start justify-between">
                    <div>
                         {/* Título riscado para indicar conclusão */}
                        <h3 className="text-lg font-bold text-slate-600 line-through decoration-emerald-500/50 mb-1">{tarefa.titulo}</h3>
                        <p className="text-slate-500 text-sm mb-4">{tarefa.descricao}</p>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                        Feito
                    </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50 justify-end">
                  <button
                    onClick={() => abrirEditar(tarefa)}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 px-2 py-1 hover:bg-indigo-50 rounded transition-colors"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
                    className="text-xs font-medium text-red-500 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- MODAL DE EDIÇÃO --- */}
      {editando && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                Editar Tarefa
                </h2>
                <button onClick={() => setEditando(null)} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Título</label>
                    <input
                        type="text"
                        value={tituloEdit}
                        onChange={(e) => setTituloEdit(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-700"
                        placeholder="Ex: Estudar React"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição</label>
                    <textarea
                        value={descricaoEdit}
                        onChange={(e) => setDescricaoEdit(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-700 min-h-[120px]"
                        rows={4}
                        placeholder="Detalhes da tarefa..."
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => setEditando(null)}
                className="px-5 py-2.5 bg-slate-100 text-slate-600 font-medium rounded-full hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={salvarEdicao}
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}