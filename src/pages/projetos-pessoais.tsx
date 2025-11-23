import { useEffect, useState } from "react";
import type { ProjetoPessoal } from "../types/projeto-pessoal";
import { useAuth } from "../context/auth-context";
import { API_ROAD } from "../api/road-info";

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
      // opcional: ver a resposta para debug
      const text = await resp.text();
      console.error("Erro ao concluir (server):", resp.status, text);
      return;
    }

    // atualizar lista após sucesso
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
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Carregando projetos...
      </div>
    );

  const projetosPendentes = projetos.filter((p) => !p.concluido);
  const projetosConcluidos = projetos.filter((p) => p.concluido);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Projetos Pessoais</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* COLUNA PENDENTES */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
            ⏳ Projetos Pendentes
          </h2>

          {projetosPendentes.length === 0 && (
            <p className="text-gray-600">Nenhum projeto pendente.</p>
          )}

          <div className="flex flex-col gap-4">
            {projetosPendentes.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-white shadow-md border-l-4 border-yellow-500 p-4 rounded-xl"
              >
                <h3 className="text-xl font-bold">{projeto.titulo}</h3>
                <p className="text-gray-700">{projeto.descricao}</p>

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => concluirProjeto(projeto.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                  >
                    Concluir
                  </button>

                  <button
                    onClick={() => abrirEditar(projeto)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirProjeto(projeto.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA CONCLUÍDOS */}
        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ✅ Projetos Concluídos
          </h2>

          {projetosConcluidos.length === 0 && (
            <p className="text-gray-600">Nenhum projeto concluído ainda.</p>
          )}

          <div className="flex flex-col gap-4">
            {projetosConcluidos.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-white shadow-md border-l-4 border-green-500 p-4 rounded-xl"
              >
                <h3 className="text-xl font-bold">{projeto.titulo}</h3>
                <p className="text-gray-700">{projeto.descricao}</p>

                <p className="mt-2 text-green-600 font-semibold">
                  ✔ Concluído em:{" "}
                  {projeto.dataConclusao
                    ? new Date(projeto.dataConclusao).toLocaleDateString()
                    : "—"}
                </p>

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => abrirEditar(projeto)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirProjeto(projeto.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Editar Projeto
            </h2>

            <input
              type="text"
              value={tituloEdit}
              onChange={(e) => setTituloEdit(e.target.value)}
              className="border w-full p-2 rounded-lg mb-3"
              placeholder="Título"
            />

            <textarea
              value={descricaoEdit}
              onChange={(e) => setDescricaoEdit(e.target.value)}
              className="border w-full p-2 rounded-lg mb-3"
              rows={4}
              placeholder="Descrição"
            />

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setEditando(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                onClick={salvarEdicao}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
