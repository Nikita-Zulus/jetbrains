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
  const [name, setName] = useState("");
  const [fontMenu, setFontMenu] = useState("");
  function fontMenuHandle(z) {
    setFontMenu(z.target);
    console.log(fontMenu);
  }
  console.log("name", name);
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
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
    </div>
  );
}
export default App;
