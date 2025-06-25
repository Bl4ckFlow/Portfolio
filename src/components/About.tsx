'use client'

export default function About() {

  const skills = [
    { name: 'C/C++', level: 60, color: 'bg-purple-500' },
    { name: 'Web Development', level: 80, color: 'bg-blue-500' },
    { name: 'Python & Machine Learning', level: 55, color: 'bg-red-600' },
    { name: 'Linux & Linux Internals', level: 35, color: 'bg-green-500' },
    { name: 'Networking', level: 30, color: 'bg-yellow-500' },
    { name: 'SQL', level: 75, color: 'bg-green-600' }
  ]

  return (
    <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">About Me</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I&apos;m a passionate developer and cybersecurity enthusiast with 3 years of experience, dedicated to building secure and efficient solutions.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-700">My Story</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I began my journey at the Higher School of Artificial Intelligence in Algiers, and later continued my studies at ESILV in France, where I’ll be starting my 4th year in September 2025.
                I&apos;m currently interning at a law firm, De Pardieu Brocas Maffei, as a developer—building dashboards and fine-tuning LLMs to better handle legal document processing and improve their usability in a juridical context.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Outside of coding, I enjoy contributing to open-source projects, upping my skills, practicing MMA, playing video games, watching films, and spending time outdoors—especially hiking.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">7+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">2+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-8 text-black">Skills & Technologies</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-black">{skill.name}</span>
                      <span className="text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}