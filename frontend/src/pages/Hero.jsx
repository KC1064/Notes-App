import React from "react";
import { FileText, Edit3, Pin, Trash2, Search, Github } from "lucide-react";

export default function Hero() {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Create Notes",
      description:
        "Effortlessly create and organize your thoughts with our intuitive note creation system.",
    },
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Update Notes",
      description:
        "Seamlessly edit and modify your notes with real-time updates and auto-save functionality.",
    },
    {
      icon: <Pin className="w-8 h-8" />,
      title: "Pin Notes",
      description:
        "Keep your most important notes at the top with our smart pinning feature.",
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Delete Notes",
      description:
        "Safely remove unwanted notes with confirmation prompts to prevent accidental deletions.",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Search Notes",
      description:
        "Quickly find any note with our powerful search functionality across all your content.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                NoteVault
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-3xl pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent leading-tight">
              Your Digital Mind Palace
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Capture, organize, and access your thoughts instantly. NoteVault
              transforms the way you manage your ideas with intelligent features
              and seamless synchronization.
            </p>
            <div className="mt-12">
              <a href="/signup" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl text-white">
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your notes efficiently and
              effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group hover:scale-105"
              >
                <div className="text-purple-500 mb-4 group-hover:text-pink-500 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0 text-gray-600">
              <span>Made with</span>
              <span className="text-red-500 text-xl">♥</span>
              <span>by</span>
              <span className="font-semibold text-purple-600">KC1064</span>
            </div>
            <a
              href="https://github.com/KC1064"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
