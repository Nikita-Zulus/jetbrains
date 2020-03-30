import React from "react";
import TitleList from "./TitleList";

const json = require("./HelpTOC.json");

const {
  topLevelIds,
  entities: { pages }
} = json;

// const topLevelIds = json.topLevelIds;
// const pages  = json.entities.pages;

console.log(topLevelIds, pages);

function App() {
  // return 123;
  return (
    <div>
      <div className="menu">
        <TitleList pages={pages} topLevelIds={topLevelIds} />
      </div>
    </div>
  );
}
export default App;
