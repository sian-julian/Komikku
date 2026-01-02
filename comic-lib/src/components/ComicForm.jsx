import { useState, useEffect } from "react";

export default function ComicForm({ comics = [], setComics, editingIndex = null, setEditingIndex }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("Manga");
  const [status, setStatus] = useState("Ongoing");
  const [rating, setRating] = useState("");
  const [cover, setCover] = useState("");

  useEffect(() => {
    if (editingIndex !== null && comics[editingIndex]) {
      const comic = comics[editingIndex];
      setTitle(comic.title);
      setAuthor(comic.author);
      setGenre(comic.genre);
      setType(comic.type);
      setStatus(comic.status);
      setRating(comic.rating);
      setCover(comic.cover);
    }
  }, [editingIndex, comics]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !rating || !cover) {
      alert("⚠️ Please fill all fields before submitting!");
      return;
    }

    const newComic = { title, author, genre, type, status, rating, cover };

    if (editingIndex !== null) {
      const updatedComics = [...comics];
      updatedComics[editingIndex] = newComic;
      setComics(updatedComics);
      setEditingIndex(null);
    } else {
      setComics([...comics, newComic]);
    }

    setTitle(""); setAuthor(""); setGenre(""); setType("Manga");
    setStatus("Ongoing"); setRating(""); setCover("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-50 to-blue-100 py-8 px-4">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className="max-w-4xl mx-auto">
        <div className="relative mb-8">
          <div className="bg-yellow-400 border-4 border-black p-6 relative transform -rotate-1 shadow-xl">
            <div className="absolute -top-3 -left-3 bg-red-600 text-white font-black text-sm px-3 py-1 border-2 border-black transform rotate-3 shadow-md">
              {editingIndex !== null ? "EDIT MODE!" : "NEW ENTRY!"}
            </div>
            <h2 className="text-5xl font-black text-center uppercase tracking-wider relative">
              <span className="text-red-600" style={{textShadow: '3px 3px 0px rgba(0,0,0,1)'}}>
                {editingIndex !== null ? "Edit Comic" : "Add Comic"}
              </span>
            </h2>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 border-4 border-black transform rotate-45"></div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white border-8 border-black shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }}></div>

            <div className="relative p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="relative group">
                  <div className="absolute -top-2 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide border-2 border-black transform -rotate-2 z-10">
                    Title
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border-4 border-black px-4 py-3 text-lg font-bold uppercase focus:outline-none focus:border-red-600 transition-all bg-white shadow-md"
                    required
                    placeholder="ENTER TITLE..."
                  />
                </div>

                {/* Author */}
                <div className="relative group">
                  <div className="absolute -top-2 left-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide border-2 border-black transform rotate-2 z-10">
                    Author
                  </div>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border-4 border-black px-4 py-3 text-lg font-bold uppercase focus:outline-none focus:border-blue-600 transition-all bg-white shadow-md"
                    required
                    placeholder="AUTHOR NAME..."
                  />
                </div>

                {/* Genre */}
                <div className="relative group">
                  <div className="absolute -top-2 left-0 bg-green-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide border-2 border-black transform -rotate-1 z-10">
                    Genre
                  </div>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full border-4 border-black px-4 py-3 text-lg font-bold uppercase focus:outline-none focus:border-green-600 transition-all bg-white shadow-md"
                    placeholder="ACTION, FANTASY..."
                  />
                </div>

                {/* Type */}
                <div className="relative group">
                  <div className="absolute -top-2 left-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide border-2 border-black transform rotate-1 z-10">
                    Type
                  </div>
                  <div className="relative">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full border-4 border-black px-4 py-3 pr-12 text-lg font-bold uppercase focus:outline-none focus:border-purple-600 transition-all bg-white shadow-md appearance-none cursor-pointer"
                    >
                      <option>Manga</option>
                      <option>Manhwa</option>
                      <option>Donghuwa</option>
                      <option>DC Comics</option>
                    <option>Marvel</option>
                    </select>
                    {/* Dropdown Arrow Icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none bg-purple-600 border-2 border-black p-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="relative group">
                  <div className="absolute -top-2 left-0 bg-orange-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide border-2 border-black transform -rotate-2 z-10">
                    Status
                  </div>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border-4 border-black px-4 py-3 pr-12 text-lg font-bold uppercase focus:outline-none focus:border-orange-600 transition-all bg-white shadow-md appearance-none cursor-pointer"
                    >
                      <option>Ongoing</option>
                      <option>Completed</option>
                    </select>
                    {/* Dropdown Arrow Icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none bg-orange-600 border-2 border-black p-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="relative group">
                  <div className="absolute -top-2 left-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 uppercase tracking-wide border-2 border-black transform rotate-2 z-10">
                    Rating
                  </div>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full border-4 border-black px-4 py-3 text-lg font-bold uppercase focus:outline-none focus:border-yellow-500 transition-all bg-white shadow-md"
                    placeholder="0-10"
                  />
                </div>

                {/* Cover URL */}
                <div className="relative group md:col-span-2">
                  <div className="absolute -top-2 left-0 bg-pink-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide border-2 border-black transform -rotate-1 z-10">
                    Cover Image
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCover(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="w-full border-4 border-black px-4 py-3 text-lg font-bold focus:outline-none transition-all bg-white shadow-md cursor-pointer flex items-center justify-center gap-3 hover:bg-pink-50 hover:border-pink-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="uppercase">
                        {cover ? "📸 Image Uploaded!" : "📁 Upload Cover Image"}
                      </span>
                    </label>
                  </div>
                  {cover && (
                    <div className="mt-3 relative">
                      <img src={cover} alt="Preview" className="w-32 h-32 object-cover border-4 border-black shadow-md" />
                      <button
                        type="button"
                        onClick={() => setCover("")}
                        className="absolute -top-2 -right-2 bg-red-600 text-white font-bold px-2 py-1 border-2 border-black rounded-full text-xs hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-10 relative">
                <button onClick={handleSubmit} className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 transform scale-110 opacity-50 blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-2xl uppercase px-12 py-4 border-4 border-black transform transition-all hover:scale-105 hover:rotate-1 shadow-lg">
                    <div className="absolute -top-1 -left-1 w-full h-full bg-yellow-400 -z-10"></div>
                    {editingIndex !== null ? "💥 Update!" : "⚡ Add Comic!"}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 border-4 border-black transform rotate-12 flex items-center justify-center font-black text-3xl shadow-lg">
            💫
          </div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 border-4 border-black transform -rotate-12 flex items-center justify-center font-black text-2xl shadow-lg">
            ⭐
          </div>
        </div>
      </div>
    </div>
  );
}
