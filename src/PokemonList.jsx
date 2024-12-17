export default function PokemonList({ pokemon }) {
  return (
    <div className="w-[70%] md:max-w-[1000px] mx-auto my-8">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {pokemon.map((p) => (
          <li
            className="relative flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden aspect-square"
            key={p.name}
          >
            <img
              src={p.sprite}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              {p.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
