import React, { Component } from 'react';
import { Character } from '../resources/Character.interface';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
}

class CharacterCard extends Component<CharacterCardProps> {
  render() {
    const {
      character: { name, status, species, gender, image },
    } = this.props;
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
}

export default CharacterCard;
