'use client'

import { Github, Mail, Download, ChevronDown} from 'lucide-react'
import Image from 'next/image'


export default function Hero() {
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }


  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
          <Image 
           src="/image.png" 
           alt="Profile" 
           width={128}
           height={128}
           className="rounded-full mx-auto mb-6 border-4 border-white shadow-2xl"
          />

          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I&apos;m <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Raouf</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Engineering student specializing in Cloud Computing and Cybersecurity
          </p>
          <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto">
            Passionate about security-focused low-level programming and system protection.  
            I also develop web apps to keep learning across tech fields.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
            <a
              href="/CV_Raouf_LAARBI.pdf"
              download="CV_Raouf_LAARBI.pdf"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-12">
            <a href="https://github.com/Bl4ckFlow" className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
              <Github className="w-6 h-6 text-black" />
            </a>
            <a href="mailto:raouflarbi352@gmail.com" className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
              <Mail className="w-6 h-6 text-black" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>
  )
}