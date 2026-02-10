import { ITEM_IMAGES } from "../data/packs";
import breadImage from "../assets/bread.png";
import "./BreadCharacter.css";

export default function BreadCharacter({ character, size = "large" }) {
  const getItemImage = (itemId) => {
    return ITEM_IMAGES[itemId]?.img || null;
  };

  return (
    <div className={`bread bread-${size}`}>
      {/* Bread base image */}
      <img 
        src={breadImage} 
        alt="Bread base" 
        className="bread-base-image"
      />

      {/* Stacking layers */}
      <div className="bread-toppings">
        {character.spread && (
          <img 
            src={getItemImage(character.spread)}
            alt={character.spread}
            className="topping-image spread-image"
          />
        )}

        {character.jam && (
          <img 
            src={getItemImage(character.jam)}
            alt={character.jam}
            className="topping-image jam-image"
          />
        )}

        {character.meat && (
          <img 
            src={getItemImage(character.meat)}
            alt={character.meat}
            className="topping-image meat-image"
          />
        )}

        {character.mold && (
          <img 
            src={getItemImage(character.mold)}
            alt={character.mold}
            className="topping-image mold-image"
          />
        )}

        {character.mystery && (
          <img 
            src={getItemImage(character.mystery)}
            alt={character.mystery}
            className="topping-image mystery-image"
          />
        )}

        {character.veggie && (
          <img 
            src={getItemImage(character.veggie)}
            alt={character.veggie}
            className="topping-image veggie-image"
          />
        )}
      </div>
    </div>
  );
}
