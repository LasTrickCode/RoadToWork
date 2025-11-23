export function Sobre() {
  return (
    <div className="w-full min-h-[80vh] py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* CONTAINER CENTRALIZADO DE LEITURA */}
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* CABEÇALHO / HERO */}
        <div className="text-center space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-widest uppercase border border-indigo-100">
            Nossa História
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Mais que uma lista de tarefas, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              um parceiro de evolução.
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            O RoadToWork nasceu de uma necessidade real: transformar a caótica rotina de estudos em um caminho claro, visual e recompensador.
          </p>
        </div>

        {/* BLOCA DE TEXTO PRINCIPAL */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Por que criamos este projeto?
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
            <p>
              Sabemos que a jornada de aprendizado, especialmente em tecnologia, pode ser solitária e confusa. São muitos links, tutoriais e ideias de projetos que acabam se perdendo em anotações soltas.
            </p>
            <p>
              O objetivo do <strong className="text-indigo-600">RoadToWork</strong> não é apenas "marcar um X" em uma tarefa. É permitir que você visualize o seu progresso macro. É ver aquela barra de porcentagem subir e sentir que, dia após dia, você está construindo sua carreira.
            </p>
            <p>
              Queremos que este seja o lugar onde você organiza sua mente para que possa focar no que realmente importa: <span className="underline decoration-indigo-300 decoration-2 underline-offset-2">aprender e codar.</span>
            </p>
          </div>
        </div>

        {/* OS 3 PILARES (GRID) */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* CARD 1 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-4">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Organização</h3>
            <p className="text-sm text-slate-600">
              Centralize suas metas e pare de perder tempo procurando o que estudar a seguir.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-violet-200 transition-colors">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-violet-600 mb-4">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Constância</h3>
            <p className="text-sm text-slate-600">
              Acompanhe seu "streak" de tarefas. A regularidade vence a intensidade.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 mb-4">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Resultados</h3>
            <p className="text-sm text-slate-600">
              Transforme tarefas concluídas em um portfólio de projetos para mostrar ao mercado.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}