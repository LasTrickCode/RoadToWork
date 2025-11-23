export function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
          Bem-vindo ao RoadMap Study
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          O <span className="font-semibold text-blue-600">RoadMap Study</span> é uma
          plataforma criada para ajudar você a melhorar sua organização pessoal e sua
          rotina de estudos. Nosso objetivo é oferecer uma forma simples, visual e
          motivadora de acompanhar o seu progresso e manter o foco nas suas metas.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-3">
          🎯 Metas de Estudo
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Ao criar sua conta, você automaticamente recebe uma meta padrão de{" "}
          <span className="font-bold">40 atividades</span>.  
          Cada tarefa concluída aumenta seu progresso, permitindo que você visualize
          a sua evolução por meio de uma barra de progresso clara e objetiva.
          <br />
          A ideia é tornar seus estudos mais organizados e motivadores.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-3">
          📁 Projetos Pessoais
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Além das tarefas, você também pode criar{" "}
          <span className="font-semibold">projetos pessoais</span>.  
          Eles servem como uma forma de documentar ideias, registrar avanços e,
          principalmente, construir um <span className="font-bold">portfólio no futuro</span>.
          <br />
          Estudar e praticar geram resultados — e seus projetos podem se transformar em
          conquistas reais para mostrar ao mundo.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-3">
          🚀 Nosso Propósito
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Queremos fornecer uma ferramenta prática para ajudar você a ter mais
          disciplina, foco e organização.  
          Seja para estudar, aprender algo novo ou desenvolver projetos pessoais,
          estamos aqui para apoiar sua jornada.
        </p>

        <div className="mt-10 flex justify-center">
          <span className="text-sm text-gray-500">
            💡 Organize-se, estude e evolua — um passo de cada vez.
          </span>
        </div>
      </div>
    </div>
  );
}
