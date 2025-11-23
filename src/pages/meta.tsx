import { useEffect, useState } from "react";
import { API_ROAD } from "../api/road-info";
import { useAuth } from "../context/auth-context";
import type { Meta } from "../types/meta";

export function MetaPage() {
  const { user } = useAuth();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregarMeta() {
    if (!user?.id) return;

    try {
      const res = await fetch(`${API_ROAD}/metas/usuario?usuarioId=${user.id}`);
      const data: Meta = await res.json();
      setMeta(data);
    } catch (err) {
      console.error("Erro ao buscar meta:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarMeta();
  }, [user?.id]);

  // --- ESTADO DE CARREGAMENTO ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-slate-700">
        <svg className="animate-spin h-6 w-6 mr-3 text-indigo-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Buscando sua meta de aprendizado...
      </div>
    );
  }

  // --- NENHUMA META ENCONTRADA ---
  if (!meta) {
    return (
        <div className="max-w-2xl mx-auto mt-12 p-8 text-center bg-white shadow-xl rounded-3xl border border-slate-100">
            <p className="text-xl font-semibold text-slate-600">
                Nenhuma meta de atividades foi configurada para você.
            </p>
            <p className="text-slate-500 mt-2">
                Comece a adicionar tarefas para iniciar seu ciclo de progresso!
            </p>
        </div>
    );
  }

  // --- CÁLCULO DE PROGRESSO ---
  const progresso = (meta.atual / meta.metaTotal) * 100;
  // Garante que a barra não estoure o layout, mesmo se o valor for > 100
  const widthProgresso = progresso > 100 ? 100 : progresso;
  const isConcluida = progresso >= 100;
  const barraCor = isConcluida ? "bg-emerald-600 shadow-emerald-500/30" : "bg-indigo-600 shadow-indigo-500/30";
  const textoProgressoCor = isConcluida ? "text-emerald-700" : "text-indigo-700";

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
        <div className="max-w-2xl mx-auto mt-8 bg-white shadow-2xl shadow-slate-200/50 p-8 rounded-3xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">

            <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${isConcluida ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
                    {/* Ícone de progresso/troféu */}
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m18 0V9a2 2 0 00-2-2h-3l-2-2H9m12 12h-3a2 2 0 01-2-2v-3a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2zM7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900">
                    Meta de Atividades
                </h1>
            </div>

            <div className="text-center mb-8 border-b border-slate-100 pb-6">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                    Progresso Atual
                </p>
                <p className={`text-4xl font-extrabold mt-1 ${textoProgressoCor}`}>
                    {meta.atual} <span className="text-slate-400 font-normal">/</span> {meta.metaTotal}
                </p>
            </div>

            {/* BARRA DE PROGRESSO */}
            <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden shadow-inner relative">
                <div
                    className={`h-full transition-all duration-700 ease-out ${barraCor}`}
                    style={{ width: `${widthProgresso}%` }}
                >
                </div>
                 <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white mix-blend-difference">
                    {Math.round(progresso)}%
                </span>
            </div>

            {/* MENSAGEM DE STATUS */}
            {isConcluida ? (
                <div className="text-center mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-emerald-700 font-bold text-lg">
                         Meta Concluída!
                    </p>
                    {meta.dataConclusao && (
                        <p className="text-sm text-emerald-600 mt-1">
                            Você alcançou este marco em: <span className="font-semibold">{new Date(meta.dataConclusao).toLocaleDateString("pt-BR")}</span>
                        </p>
                    )}
                </div>
            ) : (
                 <div className="text-center mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    <p className="text-indigo-700 font-semibold text-base">
                        Continue adicionando e concluindo tarefas para subir de nível!
                    </p>
                </div>
            )}
        </div>
    </div>
  );
}