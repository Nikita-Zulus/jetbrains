import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function TitleList({ topLevelIds, pages, anchors, name }) {
  return (
    <ul className="TitleList">
      {topLevelIds
        .map((id) => pages[id])
        .filter((x) => (name === "" ? x : x.title === name))
        .map((page) => (
          <TitleItem page={page} pages={pages} anchors={anchors} name={name} />
        ))}
    </ul>
  );
}

function TitleItem({ page, pages, anchors, name }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [slectedTarget, setSelectedTarget] = useState(null);
  const [colored, setColored] = useState(null);

  function toggleCollapsed(event) {
    if (event.target === slectedTarget) {
      return;
    }
    setCollapsed((prev) => !prev);
  }
  function handleColor(x) {
    setColored(x);
  }
  return (
    <Router>
      <li key={page.id} id={page.id} className="TitleList__item">
        <div
          className="TitleAndAnchor"
          style={
            page.id === selectedId
              ? {
                  backgroundColor: "#f0f0f0",
                  paddingLeft: `${page.level * 15}px`,
                }
              : {
                  backgroundColor: "#fafafa",
                  paddingLeft: `${page.level * 15}px`,
                }
          }
          onClick={toggleCollapsed}
          onMouseOver={() => setSelectedId(page.id)}
          onMouseOut={() => setSelectedId(null)}
        >
          <div className="TitleList__header">
            {page.pages && (
              <div
                className={
                  collapsed
                    ? "TitleList__CheckSqure__Rotate"
                    : "TitleList__CheckSqure"
                }
              ></div>
            )}
            <Link
              to={page.url}
              className={
                page.id === colored && !collapsed
                  ? "TitleOnlyBold"
                  : "TitleOnly"
              }
              style={
                page.pages === undefined
                  ? { marginLeft: "15.5px" }
                  : { marginLeft: "0px" }
              }
              onClick={() => handleColor(page.id)}
            >
              {page.title}
            </Link>
          </div>
          <div
            className="anchors"
            onMouseOver={(e) => setSelectedTarget(e.target)}
            onMouseOut={() => setSelectedTarget(null)}
          >
            {!collapsed &&
              page.anchors &&
              page.anchors.map((anchor) => (
                <Link
                  to={anchors[anchor].url + anchors[anchor].anchor}
                  className="Anchor"
                  style={{ paddingLeft: "40px" }}
                >
                  {anchors[anchor].title}
                </Link>
              ))}
          </div>
        </div>
        {!collapsed && page.pages && (
          <TitleList
            pages={pages}
            topLevelIds={page.pages}
            anchors={anchors}
            name={name}
          />
        )}
      </li>
    </Router>
  );
}
