import { Link, useLoaderData } from "react-router-dom";

type Card = {
  id: number;
  image: string;
};

const CardsPage = () => {
  const cards: Card[] = useLoaderData() as Card[];

  if (!Array.isArray(cards)) {
    return <p>Erreur: les données des cartes ne sont pas disponibles.</p>;
  }

  return (
    <div className="bg-gray-800 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Link
              to={`/cards/${card.id}`}
              key={card.id}
              className="card bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={card.image}
                alt={`Carte ${card.id}`}
                className="w-full h-auto object-cover"
              />
            </Link>
          ))
        ) : (
          <p>Aucune carte à afficher.</p>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
