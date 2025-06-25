'use client'

import { Github, ExternalLink} from 'lucide-react'

export default function Project() {

  const projects = [
    {
      id: 1,
      title: 'KernelScope',
      description: 'A system-level monitoring tool focused on process and memory protection, built with C/C++ and low-level security practices.',
      image: 'https://assets.cioinsight.com/uploads/2021/08/DRL-CME-6721-scaled.jpeg',
      tags: ['C/C++', 'Security', 'System'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 2,
      title: 'Password Manager',
      description: 'A secure password manager using AES-128 encryption, built in C++ with a focus on local file-based protection.',
      image: 'https://builtin.com/sites/www.builtin.com/files/styles/og/public/2022-06/lock-key-best-password-manager_7.png',
      tags: ['C/C++', 'AES128', 'Cryptography'],
      liveUrl: '#',
      githubUrl: 'https://github.com/Bl4ckFlow/passManager',
      featured: false
    },
    {
      id: 3,
      title: 'Ansii RSS Flux retrieval App',
      description: 'A Python app that fetches and parses RSS feeds, built for monitoring online updates and triggering custom alerts.',
      image: 'https://thumbs.dreamstime.com/b/flot-binaire-flux-d-information-20117342.jpg',
      tags: ['Python', 'RSS', 'Automation'],
      liveUrl: '#',
      githubUrl: 'https://github.com/Bl4ckFlow/pythonProject',
      featured: false
    },
    {
      id: 4,
      title: 'Stats DashBoard',
      description: 'An internal dashboard built during my internship to visualize ticketing and support statistics, streamlining assistance for legal staff.',
      image: 'https://images.bild.de/60befe97faf30300018c44e2/077f9aeeb2a020ccd92e0c4cdfc33e45,41072eaa?w=992',
      tags: ['Express.js', 'Next.js', 'MariaDb', 'Data Viz'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
    id: 5,
    title: 'PokeApp',
    description: 'A terminal-based Pokédex built in C++ using FTXUI, displaying and filtering Pokémon data loaded from CSV files.',
    image: 'https://bigitv.bigizone.co.il/wp-content/uploads/%D7%A4%D7%95%D7%A7%D7%99%D7%9E%D7%95%D7%9F-%D7%A1%D7%93%D7%A8%D7%94.jpg',
    tags: ['C++', 'FTXUI', 'CSV', 'Terminal App'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Bl4ckFlow/PokeApp',
    featured: false
    },
    {
    id: 6,
    title: 'Telecom Data Analysis',
    description: 'A statistical and machine learning analysis of telecom and internet data using clustering, regression, and forecasting models.',
    image: 'https://th.bing.com/th/id/OIP.mgHH6ydL-2qHm4-5OCfSJgHaEL?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2',
    tags: ['Python', 'Pandas', 'ML', 'Stats'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Bl4ckFlow/Analyse_de_donn-e',
    featured: false
    },
    {
    id: 7,
    title: 'Mini OS Emulator',
    description: 'A simple command-line OS simulation built in C++ with navigation, I/O, and shell-like behavior.',
    image: 'https://th.bing.com/th/id/OIP.s6Nc3hK98loPXP_D5GVxlwHaD4?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2',
    tags: ['C++', 'System Programming', 'Simulation'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Bl4ckFlow/OS',
    featured: false
    }
  ]


  return (
    <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for creating amazing digital experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={project.liveUrl} className="p-2 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a href={project.githubUrl} className="p-2 bg-white rounded-full hover:bg-gray-800 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

