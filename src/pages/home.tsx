export function Home() {
  return (
    // Removi 'min-h-screen' pois o Layout já cuida da altura total.
    // Centralizei o card e adicionei uma animação de entrada (fade-in).
    <div className="flex items-center justify-center w-full animate-in fade-in zoom-in duration-500">
      
      {/* CARD PRINCIPAL: Branco, sombra suave colorida e borda sutil */}
      <div className="bg-white shadow-2xl shadow-slate-200/60 border border-slate-100 rounded-3xl p-8 md:p-12 max-w-3xl w-full">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Bem-vindo ao{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              RoadToWork
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Uma plataforma desenhada para transformar sua organização pessoal e rotina de estudos em uma experiência <span className="font-semibold text-slate-900">simples, visual e motivadora</span>.
          </p>
        </div>

        {/* DIVISÓRIA SUTIL */}
        <hr className="border-slate-100 mb-10" />

        <div className="space-y-10">
          
          {/* SEÇÃO: METAS DE ESTUDO */}
          <div className="group">
            <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
              {/* Ícone decorativo simples usando SVG inline */}
              <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Metas de Estudo
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Ao criar sua conta, iniciamos sua jornada com uma meta padrão de{" "}
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">40 atividades</span>.
              Cada tarefa concluída preenche sua barra de progresso, oferecendo uma visualização clara da sua evolução.
              A ideia é tornar cada passo visível e recompensador.
            </p>
          </div>

          {/* SEÇÃO: PROJETOS PESSOAIS */}
          <div className="group">
            <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2 group-hover:text-violet-600 transition-colors">
              <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Projetos Pessoais
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Além das tarefas do dia a dia, documente seus{" "}
              <span className="font-semibold text-slate-900">grandes projetos</span>.
              Registre ideias e avanços para construir um{" "}
              <span className="font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">portfólio de futuro</span>.
              Seus estudos de hoje são as conquistas que você mostrará ao mundo amanhã.
            </p>
          </div>

          {/* SEÇÃO: PROPÓSITO */}
          <div className="group">
            <h2 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2 group-hover:text-emerald-600 transition-colors">
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Nosso Propósito
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Disciplina, foco e organização. Seja aprendendo uma nova tecnologia ou estruturando sua vida,
              estamos aqui para apoiar sua jornada rumo ao profissional que você deseja ser.
            </p>
          </div>

        </div>

        {/* FOOTER DO CARD */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-500">
            Organize-se, estude e evolua — um passo de cada vez.
            <p>a</p>
          </span>
        </div>

      </div>
    </div>
  );
}