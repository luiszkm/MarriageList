
import { FaGithub } from "react-icons/fa";


export function Footer (){


  return (
    <footer className="  border-t w-full h-10 ">
   <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
   <small>Todos os direitos reservado</small>
      <span className="flex items-center gap-2 text-xs">Luis soares V.0.5
      <a href="https://github.com/luiszkm"
      target="_blank"
      >
      <FaGithub />
      </a>
      </span>
   </div>

    </footer>
  )
}