'use client'

import { Calendar, Award } from 'lucide-react'

export default function Experience() {

  const experiences = [
    {
      company: 'De Pardieu Brocas Maffei',
      position: 'Software Engineering Internship',
      duration: '10/2024 - Present',
      description: 'Developing internal tools for legal data visualization and fine-tuning LLMs for legal document processing.',
      achievements: ['Created a legal dashboard using Next and NodeJs', 'Enhanced LLM usability for legal text classification']
    },
    {
      company: 'De Pardieu Brocas Maffei',
      position: 'Trainee',
      duration: '07/2024 - 09/2024',
      description: 'Worked on data visualization using Power BI and automated tasks through Python scripting to support legal and operational workflows.',
      achievements: ['Created interactive dashboards for monitoring key metrics', 'Developed Python scripts to automate data processing tasks', 'Improved data accessibility and reporting efficiency for the team']
    },
  ]

  return (
    <section id="experience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional journey and the amazing teams I&apos;ve worked with.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start gap-8">
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}