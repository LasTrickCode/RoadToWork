import { Link } from "react-router-dom";

export function FAQ() {
  const faqData = [
    {
      question: "O que é o RoadToWork?",
      answer:
        "O RoadToWork é uma plataforma focada em ajudar estudantes e desenvolvedores a organizar sua rotina de estudos. Nosso objetivo é transformar a disciplina diária em progresso visual, ajudando você a focar no que realmente importa.",
    },
    {
      question: "Como funciona a Meta de 40 atividades?",
      answer:
        "Para gamificar seu aprendizado, criamos uma meta padrão. A cada tarefa que você conclui (seja estudar um tema ou praticar código), sua barra de progresso avança. O objetivo é manter a constância até completar o ciclo.",
    },
    {
      question: "Posso adicionar meus Projetos Pessoais?",
      answer:
        "Com certeza! Além das tarefas diárias, incentivamos que você registre seus projetos. Eles servem como um portfólio futuro para mostrar sua evolução técnica para recrutadores ou para a comunidade.",
    },
    {
      question: "O aplicativo serve apenas para programação?",
      answer:
        "Embora o foco seja a área de tecnologia (devido aos recursos de portfólio e GitHub), você pode utilizar o sistema de tarefas para organizar estudos de qualquer disciplina ou faculdade.",
    },
    {
      question: "Preciso pagar para usar?",
      answer:
        "Não. O RoadToWork foi desenvolvido como uma ferramenta de apoio à comunidade de estudantes, sendo totalmente gratuito para uso pessoal.",
    },
    {
      question: "Como posso entrar em contato com a equipe?",
      answer:
        "Você pode acessar nossa página de 'Contato' ou 'Integrantes' para ver quem desenvolveu o projeto e encontrar nossos links para o GitHub e e-mail.",
    },
  ];

  return (
    <div className="w-full min-h-[80vh] py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* HEADER DA SEÇÃO */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-2">
          Tira-Dúvidas
        </h2>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Perguntas Frequentes
        </h1>
        <p className="text-slate-500 text-lg">
          Entenda como a plataforma ajuda você a alcançar o próximo nível nos seus estudos.
        </p>
      </div>

      {/* GRID DE PERGUNTAS */}
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              {/* Ícone Q (Question) */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                ?
              </div>
              
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-indigo-700 transition-colors">
                  {item.question}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER DE AJUDA */}
      <div className="mt-16 text-center bg-white border border-slate-200 p-8 rounded-3xl max-w-3xl mx-auto shadow-lg shadow-slate-200/50">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Ainda tem dúvidas?
        </h3>
        <p className="text-slate-500 mb-6">
          Se você não encontrou a resposta que procurava, fale diretamente com nosso time.
        </p>
        <Link to="/contato">
          <button className="px-8 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            Entrar em Contato
          </button>
        </Link>
      </div>

    </div>
  );
}