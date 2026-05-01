import React from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/outline'; // Importa el icono de Heroicons

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#e9d5ff] via-[#fbcfe8] to-[#bfdbfe] border-t border-white/40 mt-10 pt-6 pb-8 text-center">
      <div className="container mx-auto px-4">
        {/* Enlaces a redes sociales */}
        <div className="flex justify-center gap-4 mb-4">

          {/* GitHub */}
          <a
            href="https://github.com/sorayapg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-purple-500 hover:text-purple-700 hover:bg-white/60 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
            aria-label="GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.83 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.916.831.092-.647.359-1.083.654-1.33-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.681-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.865c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.379.202 2.398.099 2.651.64.693 1.029 1.59 1.029 2.681 0 3.84-2.334 4.69-4.56 4.948.365.372.674.922.674 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.597.687.488C21.137 20.197 24 16.42 24 12.017 24 6.484 19.522 2 14 2z" clipRule="evenodd" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/soraya-povedano/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-blue-500 hover:text-blue-600 hover:bg-white/60 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.286-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* CodePen */}
          <a
            href="https://codepen.io/Soraya-Povedano-Gallardo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-pink-500 hover:text-pink-600 hover:bg-white/60 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
            aria-label="CodePen"
          >
            <CodeBracketIcon className="h-6 w-6" />
          </a>

        </div>

        {/* Texto de derechos de autor */}
        <p className="text-sm text-purple-700/70">
          &copy; {new Date().getFullYear()} Soraya Povedano Gallardo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
