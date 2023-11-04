import { Character } from '../resources/Character.interface';

import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  const { name, status, species, gender, image } = character;

  return (
    <div className="card">
      <img src={image} alt={name} className="card__image" />
      <div className="card__description">
        <p>Name: {name}</p>
        <p className="card__status">Status: {status}</p>
        <p>Species: {species}</p>
        <p>Gender: {gender}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
