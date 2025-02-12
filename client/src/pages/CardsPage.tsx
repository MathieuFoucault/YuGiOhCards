import { useLoaderData } from "react-router-dom";

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
    <div>
      <h1>Liste des Cartes</h1>
      <div className="cards-container">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.image} alt={`Carte ${card.id}`} />
              <h2>{`Carte ${card.id}`}</h2>
            </div>
          ))
        ) : (
          <p>Aucune carte à afficher.</p>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
