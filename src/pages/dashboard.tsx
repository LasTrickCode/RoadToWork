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
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-slate-700">
        <svg className="animate-spin h-6 w-6 mr-3 text-indigo-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Carregando seu Dashboard...
      </div>
    );
  }

  const progressoMeta = (dados.metaAtual / dados.metaTotal) * 100;
  const widthProgresso = progressoMeta > 100 ? 100 : progressoMeta;
  const isMetaConcluida = progressoMeta >= 100;

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center bg-slate-50/50">
        
      {/* CABEÇALHO */}
      <div className="max-w-4xl w-full mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Dashboard de Progresso
        </h1>
        <p className="text-lg text-slate-500 mt-1">
            Visão geral de suas metas e conquistas.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">

        {/* META */}
        <div className={`bg-white shadow-xl rounded-3xl p-8 border border-slate-100 ${isMetaConcluida ? 'border-emerald-200' : 'border-indigo-200'}`}>
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span className={`text-3xl ${isMetaConcluida ? 'text-emerald-600' : 'text-indigo-600'}`}>
                    {isMetaConcluida ? '' : ''}
                </span>
                Progresso da Meta
            </h2>
            <p className="text-xl font-bold text-slate-700">
                {Math.round(progressoMeta)}%
            </p>
          </div>

          {/* BARRA DE PROGRESSO */}
          <div className="w-full bg-slate-200 h-8 rounded-full overflow-hidden shadow-inner relative">
            <div
              className={`h-full transition-all duration-700 ease-out 
                ${isMetaConcluida 
                    ? "bg-emerald-600 shadow-lg shadow-emerald-500/40" 
                    : "bg-indigo-600 shadow-lg shadow-indigo-500/40"
                }`}
              style={{ width: `${widthProgresso}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white mix-blend-difference">
                 {dados.metaAtual} / {dados.metaTotal}
            </span>
          </div>

          {dados.metaConcluida && (
            <p className="text-emerald-600 font-bold mt-4 text-center">
                 Parabéns, a meta foi concluída!
            </p>
          )}
        </div>

        {/* ESTATÍSTICAS (CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TAREFAS */}
          <div className="bg-white shadow-xl rounded-3xl p-8 border border-slate-100 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Tarefas Concluídas
                </h3>
                <span className="text-amber-500 text-3xl"></span>
            </div>
            
            <p className="text-4xl font-extrabold text-amber-600 mt-2">
              {dados.tarefasConcluidas}
            </p>
            <p className="text-sm text-slate-500 mt-1">
                Total de atividades finalizadas.
            </p>
          </div>

          {/* PROJETOS */}
          <div className="bg-white shadow-xl rounded-3xl p-8 border border-slate-100 hover:border-violet-300 transition-colors">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Projetos Finalizados
                </h3>
                <span className="text-violet-500 text-3xl"></span>
            </div>
            
            <p className="text-4xl font-extrabold text-violet-600 mt-2">
              {dados.projetosConcluidos}
            </p>
            <p className="text-sm text-slate-500 mt-1">
                Projetos prontos para o seu portfólio.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}