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
      setErro("Preencha todos os campos.");
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
          usuario: user?.id,    // <- pega o ID do usuário logado
          titulo,
          descricao,
          concluido: false,     // <- sempre envia false
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
      setErro("Erro ao salvar tarefa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">

      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Adicionar Nova Tarefa
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Título da tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Descrição da tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 w-full h-28 focus:ring-2 focus:ring-blue-500"
        />

        {erro && <p className="text-red-600 text-center">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Adicionar Tarefa"}
        </button>

      </form>
    </div>
  );
}
