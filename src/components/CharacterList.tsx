import { Character } from '../resources/Character.interface';

import CharacterCard from './CharacterCard';

import './CharacterList.css';

interface CharacterListProps {
  data: Character[];
}

function CharacterList({ data }: CharacterListProps) {
  return (
    <section className="cards">
      {data.map((item: Character) => (
        <CharacterCard key={item.id} character={item} />
      ))}
    </section>
  );
}

export default CharacterList;
