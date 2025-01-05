export default function PokemonList({ pokemon }) {
  return (
    <div className="w-[56%] md:w-[66%] lg:max-w-[1000px] mx-auto my-8">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map((p) => (
          <li
            className="relative flex items-center justify-center bg-background-2 bg-center bg-cover rounded-lg overflow-hidden aspect-square"
            key={p.name}
          >
            <img
              src={p.sprite}
              alt={p.name}
              className="absolute  w-full h-full object-cover"
            />
            <span className="absolute bottom-0 w-full text-white text-[0.65rem] capitalize md:text-[1rem] bg-gray-800 bg-opacity-50 px-2 py-1">
              {p.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
