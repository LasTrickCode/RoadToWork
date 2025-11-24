import { Link } from "react-router-dom";

export function Integrantes() {
  // Dados dos integrantes 
  const members = [
    {
      name: "Richard Emiliano",
      rm: "562245",
      photoUrl: "https://media.licdn.com/dms/image/v2/D4D03AQFjEV1M6ssljQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710510171753?e=1765411200&v=beta&t=RxNKa-upVWho8OTBVo5Mks9-Hxp6VJE3HG2C-uEzy7E", 
      github: "https://github.com/RichardXIII",
      linkedin: "https://www.linkedin.com/in/richardemilianorodrigues/", 
      repo: "https://github.com/LasTrickCode/NotifMais/tree/main", 
    },
    {
      name: "Daniel Almeida",
      rm: "563045",
      photoUrl: "https://media.licdn.com/dms/image/v2/D5603AQHgcq05M-idVw/profile-displayphoto-shrink_200_200/B56ZbrIeJ2H4AY-/0/1747701589728?e=1765411200&v=beta&t=lciiL5bSx0DrmeSuAeT9K1qYaI_nKJ3DagrAM0Tm-hs", 
      github: "https://github.com/dnl-alm",
      linkedin: "https://www.linkedin.com/in/daniel-fonseca-de-almeida-b12741366/", 
    },
    {
      name: "Pedro Almeida",
      rm: "563466",
      photoUrl: "https://media.licdn.com/dms/image/v2/D4D03AQE4jkvDi2d9xg/profile-displayphoto-shrink_200_200/B4DZbrKn3RH8AY-/0/1747702153438?e=1765411200&v=beta&t=XzMdSdGE6hzDJM2nBahbw-58wtg_1Dt_6Byur_4UvKs", 
      github: "https://github.com/PedroF1205",
      linkedin: "https://www.linkedin.com/in/pedro-fonseca-de-almeida-5b6019367/", 
    },
  ];

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* CABEÇALHO */}
      <div className="text-center mb-16 space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-widest uppercase border border-indigo-100">
          Turma 1TDSPV
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Nossa Equipe
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto text-lg">
          Desenvolvedores dedicados construindo soluções através de código e colaboração.
        </p>
      </div>

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6">
        {members.map((member) => (
          <div
            key={member.rm}
            className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-100"
          >
           
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 -z-10" />

            {/*FOTO */}
            <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <img 
                    src={member.photoUrl} 
                    alt={`Foto de ${member.name}`} 
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
            </div>

            {/* INFORMAÇÕES */}
            <h2 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-700 transition-colors">
              {member.name}
            </h2>
            <p className="text-sm font-medium text-slate-400 mb-8 bg-slate-100 px-3 py-1 rounded-full">
              RM: {member.rm}
            </p>

            {/* BOTÕES */}
            <div className="w-full mt-auto space-y-3">
               
               {member.linkedin && (
                <Link
                  to={member.linkedin}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-[#0A66C2] hover:bg-[#084A97] shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                >
                  
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.565-4 0v5.604h-3v-11h3v1.765c1.395-2.586 7-2.762 7 2.453v6.782z" />
                  </svg>
                  Perfil LinkedIn
                </Link>
              )}
              
              
              <Link
                to={member.github}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all active:scale-95"
              >
                {/* Ícone do GitHub SVG */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Perfil GitHub
              </Link>

              
              {member.repo && (
                <Link
                  to={member.repo}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Ver Repositório
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}