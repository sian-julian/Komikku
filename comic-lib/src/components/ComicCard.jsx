import React from 'react';

export default function ComicCard({ comic, index, setComics, comics, setEditingIndex }) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    title: '',
    author: '',
    genre: '',
    type: '',
    status: '',
    rating: '',
    cover: ''
  });

  const handleDelete = () => {
    const updatedComics = comics.filter((_, i) => i !== index);
    setComics(updatedComics);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setEditForm({
      title: comic.title || '',
      author: comic.author || '',
      genre: comic.genre || '',
      type: comic.type || '',
      status: comic.status || '',
      rating: comic.rating || '',
      cover: comic.cover || ''
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedComics = comics.map((c, i) => i === index ? { ...editForm } : c);
    setComics(updatedComics);
    setShowEditModal(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, cover: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="relative group">
        {/* Main Card Container */}
        <div className="bg-white border-6 border-black shadow-xl transform transition-all hover:scale-105 hover:rotate-1 overflow-hidden">
          
          {/* Cover Image Section */}
          <div className="relative h-64 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden border-b-6 border-black">
            <img
              src={comic.cover || "https://via.placeholder.com/400x200?text=No+Image"}
              alt={comic.title}
              className="w-full h-full object-cover"
            />
            
            {/* Rating Badge - Top Right */}
            {comic.rating && (
              <div className="absolute top-2 right-2 bg-yellow-400 border-3 border-black px-3 py-1 font-black text-lg transform rotate-3 shadow-lg">
                ⭐ {comic.rating}
              </div>
            )}
            
            {/* Type Badge - Top Left */}
            <div className="absolute top-2 left-2 bg-purple-600 text-white border-3 border-black px-3 py-1 font-bold text-sm uppercase transform -rotate-3 shadow-lg">
              {comic.type}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-white">
            {/* Title */}
            <h3 className="text-xl font-black uppercase text-gray-900 mb-2 line-clamp-2" 
                style={{textShadow: '2px 2px 0px rgba(255,200,0,0.3)'}}>
              {comic.title}
            </h3>
            
            {/* Info Grid */}
            <div className="space-y-1 mb-4">
              <p className="text-sm font-bold text-gray-700">
                <span className="text-blue-600">✍️</span> {comic.author}
              </p>
              {comic.genre && (
                <p className="text-sm font-bold text-gray-700">
                  <span className="text-green-600">🎭</span> {comic.genre}
                </p>
              )}
            </div>

            {/* Status Badge */}
            <div className={`inline-block px-3 py-1 border-2 border-black font-bold text-xs uppercase transform -rotate-1 ${
              comic.status === 'Ongoing' ? 'bg-green-400' : 'bg-blue-400'
            }`}>
              {comic.status === 'Ongoing' ? '📖 Ongoing' : '✅ Completed'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-gray-100 border-t-4 border-black flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 border-3 border-black transform transition-all hover:scale-105 uppercase text-sm"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 border-3 border-black transform transition-all hover:scale-105 uppercase text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Comic Burst Decoration - Shows on Hover */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 border-3 border-black rounded-full flex items-center justify-center font-black text-lg transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          💥
        </div>
      </div>

      {/* Edit Modal - Comic Style */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 animate-fadeIn overflow-y-auto">
          <div 
          className="fixed inset-0 bg-black bg-opacity-70 h-full w-full"
          onClick={() => setShowEditModal(false)}
          ></div>

          
          {/* Modal Content */}
          <div className="relative z-10 animate-slideDown my-10 w-full max-w-2xl">
            <div className="bg-white border-8 border-black shadow-2xl max-w-2xl w-full transform rotate-1">
              {/* Edit Badge */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 border-4 border-black px-8 py-2 font-black text-white uppercase text-lg -rotate-2 shadow-lg">
                ✏️ Edit Comic
              </div>
              
              {/* Decorative Stars */}
              <div className="absolute -top-3 -left-3 text-4xl animate-spin-slow">⭐</div>
              <div className="absolute -top-3 -right-3 text-4xl animate-spin-slow-reverse">💫</div>
              
              {/* Form Content */}
              <div className="p-8 pt-12 bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 space-y-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-black uppercase text-gray-900 mb-2 transform -rotate-1">📚 Comic Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white transform hover:scale-102 transition-transform"
                    placeholder="Enter comic title..."
                  />
                </div>

                {/* Author Input */}
                <div>
                  <label className="block text-sm font-black uppercase text-gray-900 mb-2 transform rotate-1">✍️ Author Name</label>
                  <input
                    type="text"
                    value={editForm.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-blue-400 bg-white transform hover:scale-102 transition-transform"
                    placeholder="Enter author name..."
                  />
                </div>

                {/* Genre and Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase text-gray-900 mb-2 transform -rotate-1">🎭 Genre</label>
                    <input
                      type="text"
                      value={editForm.genre}
                      onChange={(e) => handleInputChange('genre', e.target.value)}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-green-400 bg-white transform hover:scale-102 transition-transform"
                      placeholder="e.g., Superhero"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase text-gray-900 mb-2 transform rotate-1">📖 Type</label>
                    <select
                      value={editForm.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-purple-400 bg-white transform hover:scale-102 transition-transform"
                    >
                      <option value="">Select Type</option>
                      <option value="Manga">Manga</option>
                      <option value="Manhwa">Manhwa</option>
                      <option value="Comic">Comic</option>
                      <option value="Webtoon">Webtoon</option>
                    </select>
                  </div>
                </div>

                {/* Status & Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase text-gray-900 mb-2 transform -rotate-1">📊 Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-green-400 bg-white transform hover:scale-102 transition-transform"
                    >
                      <option value="">Select Status</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase text-gray-900 mb-2 transform rotate-1">⭐ Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={editForm.rating}
                      onChange={(e) => handleInputChange('rating', e.target.value)}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white transform hover:scale-102 transition-transform"
                      placeholder="0-10"
                    />
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-black uppercase text-gray-900 mb-2 transform -rotate-1">🖼️ Upload Cover Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id={`cover-upload-${index}`} // unique per card
                    />
                    <label
                      htmlFor={`cover-upload-${index}`}
                      className="block w-full px-4 py-3 border-4 border-black font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white cursor-pointer transform hover:scale-102 transition-all uppercase"
                    >
                      📁 Choose Image File
                    </label>
                  </div>
                  {editForm.cover && (
                    <div className="mt-3 border-4 border-black p-2 bg-gray-100 relative">
                      <img 
                        src={editForm.cover} 
                        alt="Preview" 
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => handleInputChange('cover', '')}
                        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-black px-3 py-2 border-3 border-black shadow-lg transform hover:scale-110 transition-all"
                        type="button"
                      >
                        ❌
                      </button>
                      <div className="absolute bottom-4 left-4 bg-green-500 border-3 border-black px-3 py-1 font-bold text-white text-xs uppercase shadow-lg">
                        ✅ Image Uploaded
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t-4 border-black border-dashed">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-black py-4 px-6 border-4 border-black transform transition-all hover:scale-105 hover:-rotate-1 uppercase text-lg shadow-lg"
                  >
                    ❌ Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-4 px-6 border-4 border-black transform transition-all hover:scale-105 hover:rotate-1 uppercase text-lg shadow-lg"
                  >
                    💾 Save Changes
                  </button>
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-yellow-400 border-4 border-black transform rotate-45"></div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-pink-400 border-4 border-black rounded-full flex items-center justify-center font-black text-2xl">
                💥
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Comic Style */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-60"
            onClick={() => setShowDeleteModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 animate-scaleIn">
            <div className="bg-white border-8 border-black shadow-2xl max-w-md w-full transform -rotate-1">
              {/* Warning Badge */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-red-600 border-4 border-black px-6 py-2 font-black text-white uppercase text-sm rotate-3 shadow-lg">
                ⚠️ Warning!
              </div>
              
              {/* Content */}
              <div className="p-8 pt-10 bg-gradient-to-br from-yellow-50 to-red-50">
                <div className="text-center mb-6">
                  <div className="text-7xl mb-4 animate-bounce">💥</div>
                  <h3 className="text-3xl font-black uppercase text-gray-900 mb-3" 
                      style={{textShadow: '2px 2px 0px rgba(255,0,0,0.3)'}}>
                    Delete Comic?
                  </h3>
                  <p className="text-lg font-bold text-gray-700">
                    Are you sure you want to delete<br/>
                    <span className="text-red-600">"{comic.title}"</span>?
                  </p>
                  <p className="text-sm font-bold text-gray-600 mt-2">
                    This action cannot be undone! 🚨
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-black py-3 px-4 border-4 border-black transform transition-all hover:scale-105 uppercase shadow-lg"
                  >
                    ❌ Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 border-4 border-black transform transition-all hover:scale-105 uppercase shadow-lg"
                  >
                    💣 Delete
                  </button>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 border-4 border-black transform rotate-45"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8) rotate(-5deg); opacity: 0; }
          to { transform: scale(1) rotate(-1deg); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-50px) rotate(-2deg); opacity: 0; }
          to { transform: translateY(0) rotate(1deg); opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spinSlow 3s linear infinite reverse;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </>
  );
}
