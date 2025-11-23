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

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(`${API_ROAD}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        setErro("Erro ao cadastrar. Tente outro email.");
        return;
      }

      setSucesso("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error("Erro:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Criar Conta
        </h1>

        <form onSubmit={handleCadastro} className="flex flex-col gap-4">

          {/* CAMPO NOME */}
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* CAMPO EMAIL */}
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* CAMPO SENHA */}
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* ERRO */}
          {erro && <p className="text-red-600 font-semibold text-center">{erro}</p>}

          {/* SUCESSO */}
          {sucesso && <p className="text-green-600 font-semibold text-center">{sucesso}</p>}

          {/* BOTÃO */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
          >
            Cadastrar
          </button>
        </form>

        {/* LINK PARA LOGIN */}
        <p className="text-center mt-4 text-gray-600">
          Já tem conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Faça login
          </span>
        </p>
      </div>
    </div>
  );
}
