import { useState } from "react";
import BreadCharacter from "../components/BreadCharacter";
import InventoryCupboard from "../components/InventoryCupboard";
import coinIcon from "../assets/coin.png";
import "./CharacterPage.css";

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function CharacterPage({ character, inventory, coins, onUpdateCharacter }) {
  const [tempCharacter, setTempCharacter] = useState(character);
  const [saved, setSaved] = useState(false);

  const handleEquipItem = (newCharacter) => {
    setTempCharacter(newCharacter);
  };

  const handleSave = () => {
    onUpdateCharacter(tempCharacter);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setTempCharacter(character);
  };

  return (
    <div className="characterPageContentOnly">
      <div className="characterPageHeader">
        <h1 className="characterPageTitle">Customize Your Toast</h1>

        <div className="coinBox">
          <img className="coinIcon" src={coinIcon} alt="Coin icon" />
          <div className="coinText">{formatNumber(coins)}</div>
        </div>
      </div>

      <section className="characterPanel">
        <div className="characterPreviewSection">
          <div className="previewContainer">
            <BreadCharacter character={tempCharacter} size="small" />
          </div>

          <div className="previewControls">
            <button className="saveButton" onClick={handleSave}>
              {saved ? "✓ Saved!" : "Save Customization"}
            </button>
            <button className="resetButton" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <InventoryCupboard
          inventory={inventory}
          character={tempCharacter}
          onEquipItem={handleEquipItem}
        />
      </section>
    </div>
  );
}

export default CharacterPage;
