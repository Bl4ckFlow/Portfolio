'use client'

import { Mail, MapPin, Coffee } from 'lucide-react'

export default function Hero() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-blue-800 to-purple-400 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Work Together</h2>
        <p className="text-xl mb-12 text-blue-100">
          Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing together.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-blue-100">raouflarbi352@gmail.com</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold mb-2">Location</h3>
            <p className="text-blue-100">Paris, FR</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold mb-2">Coffee Chat</h3>
            <p className="text-blue-100">Always open!</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
          <form
            action="https://formspree.io/f/mqabgbya"
            method="POST"
            className="space-y-6"
          >
            {/* Honeypot to prevent spam bots */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-black-200 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-black-200 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-black-200 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <textarea
              rows={5}
              name="message"
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-black-200 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-white text-blue-600 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
