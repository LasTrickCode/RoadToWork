import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { API_ROAD } from "../api/road-info";

export function AddProjetos() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!titulo || !descricao) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!user?.id) {
      setErro("Usuário não identificado.");
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

      setTimeout(() => navigate("/projetos"), 1000);

    } catch (error) {
      setErro("Erro ao criar projeto. Tente novamente.");
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-2xl">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Adicionar Projeto
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Título do projeto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-3 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {erro && <p className="text-red-600 font-semibold">{erro}</p>}
        {sucesso && <p className="text-green-600 font-semibold">{sucesso}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold"
        >
          Criar Projeto
        </button>
      </form>

    </div>
  );
}
