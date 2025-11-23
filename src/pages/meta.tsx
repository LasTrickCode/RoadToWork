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

  if (loading) {
    return (
      <div className="text-lg font-semibold text-gray-700">
        Carregando meta...
      </div>
    );
  }

  if (!meta) {
    return <p className="text-gray-600">Nenhuma meta encontrada.</p>;
  }

  const progresso = (meta.atual / meta.metaTotal) * 100;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-2xl">

      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        Sua Meta
      </h1>

      {/* Valores totais */}
      <div className="text-center mb-6">
        <p className="text-xl font-semibold text-gray-800">
          Progresso: {meta.atual} / {meta.metaTotal}
        </p>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-700 ${
            progresso >= 100 ? "bg-green-600" : "bg-blue-600"
          }`}
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      {/* Se concluída, mostrar data */}
      {meta.concluida && meta.dataConclusao && (
        <p className="text-center mt-4 text-green-700 font-semibold">
          ✔ Meta concluída em{" "}
          {new Date(meta.dataConclusao).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
