import React, { useState } from "react";
import TitleList from "./TitleList";

const json = require("./HelpTOC.json");

const {
  topLevelIds,
  entities: { pages, anchors },
} = json;

// const topLevelIds = json.topLevelIds;
// const pages  = json.entities.pages;

/* console.log(topLevelIds, pages); */

function App() {
  // return 123;
  const [name, setName] = useState("");
  const [nameValue, setNameValue] = useState("");
  function handleSearch(e) {
    setName(nameValue);
  }
  const [fontMenu, setFontMenu] = useState("");
  function fontMenuHandle(z) {
    /* if (z.target.className === "Anchor" || z.target.className === "anchors") {
      setFontMenu((prev) => prev);
    } else { */
    setFontMenu(z.target);
    /*  } */
    console.log(fontMenu);
  }
  return (
    <div className="wrap">
      <div className="menu" onClick={fontMenuHandle}>
        <TitleList
          pages={pages}
          topLevelIds={topLevelIds}
          anchors={anchors}
          name={name}
          fontMenu={fontMenu}
        />
      </div>
      <input
        type="text"
        className="name"
        placeholder="Название элемента"
        onChange={(e) => setNameValue(e.target.value)}
        value={nameValue}
      />
      <button type="button" className="searchButton" onClick={handleSearch}>
        Найти
      </button>
    </div>
  );
}
export default App;
