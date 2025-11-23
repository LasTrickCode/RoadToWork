import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const ok = await login(email, senha);

    if (!ok) {
      setErro("Email ou senha incorretos.");
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Login do Usuário
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {erro && (
            <p className="text-red-600 font-semibold text-center">{erro}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Entrar
          </button>

          
          <p className="text-center text-gray-600 mt-2">
            Ainda não tem conta?{" "}
            <Link
              to="/cadastro"
              className="text-blue-600 font-semibold hover:underline"
            >
              Criar conta
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
