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
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Carregando tarefas...
      </div>
    );
  }

  const tarefasPendentes = tarefas.filter((t) => !t.concluido);
  const tarefasConcluidas = tarefas.filter((t) => t.concluido);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Suas Tarefas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* COLUNA PENDENTES */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
            ⏳ Tarefas Pendentes
          </h2>

          {tarefasPendentes.length === 0 && (
            <p className="text-gray-600">Nenhuma tarefa pendente.</p>
          )}

          <div className="flex flex-col gap-4">
            {tarefasPendentes.map((tarefa) => (
              <div
                key={tarefa.id}
                className="bg-white shadow-md border-l-4 border-yellow-500 p-4 rounded-xl"
              >
                <h3 className="text-xl font-bold">{tarefa.titulo}</h3>
                <p className="text-gray-700">{tarefa.descricao}</p>

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => marcarComoConcluida(tarefa.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                  >
                    Concluir
                  </button>

                  <button
                    onClick={() => abrirEditar(tarefa)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA CONCLUÍDAS */}
        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ✅ Tarefas Concluídas
          </h2>

          {tarefasConcluidas.length === 0 && (
            <p className="text-gray-600">Nenhuma tarefa concluída ainda.</p>
          )}

          <div className="flex flex-col gap-4">
            {tarefasConcluidas.map((tarefa) => (
              <div
                key={tarefa.id}
                className="bg-white shadow-md border-l-4 border-green-500 p-4 rounded-xl"
              >
                <h3 className="text-xl font-bold">{tarefa.titulo}</h3>
                <p className="text-gray-700">{tarefa.descricao}</p>

                <div className="mt-3 flex gap-3">
                  <span className="text-green-600 font-semibold">
                    ✔ Concluída
                  </span>

                  <button
                    onClick={() => abrirEditar(tarefa)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
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
              Editar Tarefa
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
            ></textarea>

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
