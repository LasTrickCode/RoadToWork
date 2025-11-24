import { useEffect, useState } from "react";
import type { ProjetoPessoal } from "../types/projeto-pessoal";
import { useAuth } from "../context/auth-context";
import { API_ROAD } from "../api/road-info";
// Link foi removido pois não é mais utilizado.

export function ProjetosPessoais() {
  const [projetos, setProjetos] = useState<ProjetoPessoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // --- ESTADO DO MODAL DE EDIÇÃO ---
  const [editando, setEditando] = useState<ProjetoPessoal | null>(null);
  const [tituloEdit, setTituloEdit] = useState("");
  const [descricaoEdit, setDescricaoEdit] = useState("");

  async function fetchProjetos() {
    if (!user?.id) return;
    try {
      const res = await fetch(
        `${API_ROAD}/projetos/usuario?usuarioId=${user.id}`
      );
      const data = await res.json();
      setProjetos(data);
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjetos();
  }, [user?.id]);

  // ➤ CONCLUIR PROJETO
  async function concluirProjeto(id: number) {
    try {
      const resp = await fetch(`${API_ROAD}/projetos/${id}/concluir`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concluido: true }),
      });
      if (!resp.ok) {
        const text = await resp.text();
        console.error("Erro ao concluir (server):", resp.status, text);
        return;
      }
      fetchProjetos();
    } catch (err) {
      console.error("Erro ao concluir projeto:", err);
    }
  }

  // ➤ EXCLUIR PROJETO
  async function excluirProjeto(id: number) {
    const confirmar = confirm("Tem certeza que deseja excluir este projeto?");
    if (!confirmar) return;
    try {
      await fetch(`${API_ROAD}/projetos/${id}`, { method: "DELETE" });
      setProjetos((prev) => prev.filter((proj) => proj.id !== id));
    } catch (err) {
      console.error("Erro ao excluir projeto:", err);
    }
  }

  // ➤ ABRIR MODAL PARA EDITAR
  function abrirEditar(projeto: ProjetoPessoal) {
    setEditando(projeto);
    setTituloEdit(projeto.titulo);
    setDescricaoEdit(projeto.descricao);
  }

  // ➤ SALVAR EDIÇÃO
  async function salvarEdicao() {
    if (!editando) return;
    try {
      await fetch(`${API_ROAD}/projetos/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: tituloEdit,
          descricao: descricaoEdit,
        }),
      });
      setEditando(null);
      fetchProjetos();
    } catch (err) {
      console.error("Erro ao editar projeto:", err);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-slate-700">
        <svg className="animate-spin h-6 w-6 mr-3 text-indigo-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Carregando seus projetos...
      </div>
    );

  const projetosPendentes = projetos.filter((p) => !p.concluido);
  const projetosConcluidos = projetos.filter((p) => p.concluido);

  // Componente Reutilizável para o Card de Projeto
  const ProjetoCard = ({ projeto }: { projeto: ProjetoPessoal }) => {
    const isConcluido = projeto.concluido;
    const baseColor = isConcluido ? "emerald" : "amber";
    const statusIcon = isConcluido ? "" : "";

    return (
      <div
        key={projeto.id}
        className={`bg-white shadow-xl shadow-slate-100 p-6 rounded-2xl border border-l-4 border-${baseColor}-400 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}
      >
        <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{statusIcon}</span>
            <h3 className="text-xl font-bold text-slate-800">{projeto.titulo}</h3>
        </div>

        <p className="text-slate-600 text-sm">{projeto.descricao}</p>

        {isConcluido && (
          <p className="mt-2 text-sm text-emerald-600 font-semibold">
            ✔ Concluído em:{" "}
            {projeto.dataConclusao
              ? new Date(projeto.dataConclusao).toLocaleDateString("pt-BR")
              : "—"}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex gap-3">
            {!isConcluido && (
                <button
                    onClick={() => concluirProjeto(projeto.id)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-all shadow-md"
                >
                    Concluir
                </button>
            )}
            <button
                onClick={() => abrirEditar(projeto)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md"
            >
                Editar
            </button>
            <button
                onClick={() => excluirProjeto(projeto.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition-all shadow-md"
            >
                Excluir
            </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
        
      {/* CABEÇALHO CENTRALIZADO */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Meus Projetos
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">

        {/* COLUNA PENDENTES */}
        <div>
          <h2 className="text-2xl font-semibold text-amber-600 mb-6 flex items-center gap-2">
            <span className="text-3xl"></span> Pendentes
          </h2>

          {projetosPendentes.length === 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-100 text-slate-500 shadow-sm">
                Nenhum projeto pendente. Que tal adicionar um novo para começar?
            </div>
          )}

          <div className="flex flex-col gap-6">
            {projetosPendentes.map((projeto) => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </div>

        {/* COLUNA CONCLUÍDOS */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-600 mb-6 flex items-center gap-2">
            <span className="text-3xl"></span> Concluídos
          </h2>

          {projetosConcluidos.length === 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-100 text-slate-500 shadow-sm">
                Nenhum projeto concluído ainda. Continue o bom trabalho!
            </div>
          )}

          <div className="flex flex-col gap-6">
            {projetosConcluidos.map((projeto) => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </div>

      </div>

      {/* --- MODAL DE EDIÇÃO --- */}
      {editando && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-in fade-in">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-3">
              Editar Projeto: {editando.titulo}
            </h2>

            <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 ml-1">Título</label>
                <input
                type="text"
                value={tituloEdit}
                onChange={(e) => setTituloEdit(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200"
                placeholder="Novo Título"
                />

                <label className="text-sm font-semibold text-slate-700 ml-1">Descrição</label>
                <textarea
                value={descricaoEdit}
                onChange={(e) => setDescricaoEdit(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 resize-none"
                rows={4}
                placeholder="Nova Descrição"
                />
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setEditando(null)}
                className="px-6 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={salvarEdicao}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/30"
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