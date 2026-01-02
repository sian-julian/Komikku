import ComicCard from "./ComicCard";

export default function ComicList({ comics, setComics }) {
  if (comics.length === 0) {
    return <p className="text-center text-gray-500"></p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {comics.map((comic, index) => (
        <ComicCard
          key={index}
          comic={comic}
          index={index}
          comics={comics}
          setComics={setComics}
        />
      ))}
    </div>
  );
}
