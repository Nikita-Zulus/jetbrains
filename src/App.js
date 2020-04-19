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
  return (
    <div className="wrap">
      <div className="menu">
        <TitleList
          pages={pages}
          topLevelIds={topLevelIds}
          anchors={anchors}
          name={name}
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
