import { useEffect, useState } from "react";
import { API_ROAD } from "../api/road-info";
import { useAuth } from "../context/auth-context";
import type { DashboardData } from "../types/dashboard";

export function Dashboard() {
  const { user } = useAuth();
  const [dados, setDados] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarDashboard() {
    try {
      const res = await fetch(`${API_ROAD}/dashboard/${user?.id}`);
      const data: DashboardData = await res.json();
      setDados(data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, [user?.id]);

  if (loading || !dados) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Carregando Dashboard...
      </div>
    );
  }

  const progressoMeta = (dados.metaAtual / dados.metaTotal) * 100;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Dashboard</h1>

      <div className="w-full max-w-4xl space-y-8">

        {/* PROGRESSO DA META */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Progresso da Meta
          </h2>

          <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progressoMeta}%` }}
            ></div>
          </div>

          <p className="mt-2 text-gray-700 font-medium">
            {dados.metaAtual} / {dados.metaTotal}
          </p>

          {dados.metaConcluida && (
            <p className="text-green-600 font-bold mt-2">🎉 Meta concluída!</p>
          )}
        </div>

        {/* ESTATÍSTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TAREFAS */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tarefas Concluídas
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {dados.tarefasConcluidas}
            </p>
          </div>

          {/* PROJETOS */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-purple-600">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Projetos Concluídos
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {dados.projetosConcluidos}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
