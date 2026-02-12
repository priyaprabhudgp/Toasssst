// Import mapping of item IDs to their corresponding image data
import { ITEM_IMAGES } from "../data/packs";

// Base bread image
import breadImage from "../assets/bread.png";

// Component-specific styling
import "./BreadCharacter.css";

/**
 * BreadCharacter Component
 * 
 * Renders a customizable bread character with layered toppings.
 * 
 * Props:
 * - character (object): Contains selected item IDs for each topping layer.
 *   Possible keys: spread, jam, meat, mold, mystery, veggie
 * - size (string): Controls overall bread size ("large" by default).
 */
export default function BreadCharacter({ character, size = "large" }) {

  /**
   * Returns the image path for a given item ID.
   * If the item does not exist in ITEM_IMAGES, returns null.
   */
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

      {/* Container that stacks toppings visually on top of the bread */}
      <div className="bread-toppings">

        {/* Spread layer (e.g., butter, peanut butter) */}
        {character.spread && (
          <img 
            src={getItemImage(character.spread)}
            alt={character.spread}
            className="topping-image spread-image"
          />
        )}

        {/* Jam layer */}
        {character.jam && (
          <img 
            src={getItemImage(character.jam)}
            alt={character.jam}
            className="topping-image jam-image"
          />
        )}

        {/* Meat layer */}
        {character.meat && (
          <img 
            src={getItemImage(character.meat)}
            alt={character.meat}
            className="topping-image meat-image"
          />
        )}

        {/* Mold layer (special/negative effect layer) */}
        {character.mold && (
          <img 
            src={getItemImage(character.mold)}
            alt={character.mold}
            className="topping-image mold-image"
          />
        )}

        {/* Mystery layer (hidden or rare item) */}
        {character.mystery && (
          <img 
            src={getItemImage(character.mystery)}
            alt={character.mystery}
            className="topping-image mystery-image"
          />
        )}

        {/* Vegetable layer */}
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
