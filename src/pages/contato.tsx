import { Link } from "react-router-dom";

export function Contato() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 animate-in fade-in zoom-in duration-500">
      
      {/* CARD CENTRAL */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 max-w-lg w-full text-center">
        
        {/* Ícone de destaque no topo */}
        <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Fale Conosco
        </h1>
        
        <p className="text-slate-500 mb-10 leading-relaxed">
          Tem alguma dúvida, sugestão ou quer colaborar com o projeto? 
          Entre em contato através dos canais abaixo.
        </p>

        <div className="space-y-4">
          
          {/* BOTÃO DE EMAIL (Click to Mail) */}
          <a 
            href="mailto:richardemiliano9@gmail.com"
            className="group flex items-center p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
               {/* Ícone Email */}
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email para contato</p>
              <p className="text-slate-800 font-medium break-all group-hover:text-indigo-700 transition-colors">
                richardemiliano9@gmail.com
              </p>
            </div>
          </a>

          {/* DIVISÓRIA COM TEXTO */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-400">ou visite nosso Hub</span>
            </div>
          </div>

          {/* LINK PARA GITHUB (LasTrickCode) */}
          <Link
            to="https://github.com/LasTrickCode"
            target="_blank"
            className="block w-full"
          >
            <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/20 transform hover:-translate-y-1 transition-all duration-300">
              {/* Ícone Github Branco */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                 <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub LasTrickCode
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}