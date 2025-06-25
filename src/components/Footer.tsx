'use client'

import { 
  Github, Mail, Heart
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">
              BlackFlow.dev
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/Bl4ckFlow" className="hover:text-blue-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>

              <a href="mailto:raouflarbi352@gmail.com" className="hover:text-blue-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BlackFlow.dev Made with <Heart className="w-4 h-4 inline text-red-500" /> and lots of coffee.</p>
          </div>
        </div>
      </footer>
  )
}