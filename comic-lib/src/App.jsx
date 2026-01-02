import { useState } from "react";
import ComicForm from "./components/ComicForm";
import ComicList from "./components/ComicList";
import ComicCard from "./components/ComicCard";



export default function App() {
  const [comics, setComics] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-50 to-blue-100 relative overflow-hidden p-6">
      {/* Background Comic Halftone Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Decorative Comic Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-red-500 border-4 border-black rounded-full transform rotate-12 opacity-20"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500 border-4 border-black transform -rotate-12 opacity-20"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-400 border-4 border-black transform rotate-45 opacity-20"></div>

      <div className="relative z-10">
        {/* Main Header - Comic Style */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="relative">
            <div className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 border-8 border-black p-8 transform -rotate-1 shadow-2xl">
              <div className="absolute -top-4 -left-4 bg-yellow-400 border-4 border-black px-4 py-2 font-black text-sm uppercase transform rotate-6 shadow-lg">
                Est. 2025
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-center uppercase tracking-wider text-white relative">
                <span style={{textShadow: '4px 4px 0px rgba(0,0,0,1), 8px 8px 0px rgba(255,200,0,0.5)'}}>
                  Komikku
                </span>
              </h1>
              <p className="text-center text-yellow-300 font-bold text-xl mt-4 uppercase tracking-wide">
                🦸 Your Ultimate Collection! 📚
              </p>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-yellow-400 border-4 border-black transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Comic Form */}
        <ComicForm
          comics={comics}
          setComics={setComics}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
        />

        {/* Comic List */}
        <ComicList
          comics={comics}
          setComics={setComics}
          setEditingIndex={setEditingIndex}
        />

        {/* Comics Grid - Comic Style */}
        <div className="mt-10">
          {comics.length > 0 && (
            <div className="mb-8 text-center">
              <div className="inline-block bg-purple-600 text-white border-4 border-black px-6 py-3 transform -rotate-1 shadow-lg">
                <h2 className="text-3xl font-black uppercase">
                  📖 My Collection ({comics.length})
                </h2>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comics.map((comic, index) => (
              <ComicCard
                key={index}
                comic={comic}
                index={index}
                setComics={setComics}
                comics={comics}
                setEditingIndex={setEditingIndex} // ✅ Pass this
              />
            ))}
          </div>

          {/* Empty State */}
          {comics.length === 0 && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border-6 border-black p-12 text-center transform rotate-1 shadow-xl">
                <div className="text-8xl mb-4">📚</div>
                <h3 className="text-3xl font-black uppercase text-gray-800 mb-4">
                  No Comics Yet!
                </h3>
                <p className="text-lg font-bold text-gray-600">
                  Add your first comic above to start your collection! 🚀
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
