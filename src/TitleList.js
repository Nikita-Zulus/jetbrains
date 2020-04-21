import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function TitleList({
  topLevelIds,
  pages,
  anchors,
  name,
  fontMenu,
}) {
  const [font, setFont] = useState(null);
  function fontHandle(y) {
    /*  if (y.target.className === "Anchor" || y.target.className === "anchors") {
      setFont((prev) => prev);
    } else { */
    setFont(y.target);
    /* } */
    console.log(y.target.className);
  }
  let entirePages = [];
  if (name !== "") {
    for (let key in pages) {
      if (pages[key].title === name) {
        entirePages.push(pages[key]);
        for (let k in pages) {
          if (pages[k].id === pages[key].parentId)
            entirePages.unshift(pages[k]);
        }
      }
    }
  }
  return (
    <ul className="TitleList" onClick={fontHandle}>
      {name === ""
        ? topLevelIds
            /* .filter((x) => (name === "" ? x : pages[x].title === name)) */
            .map((id) => pages[id])
            /*  .filter((x) => (name === "" ? x : x.title === name)) */
            .map((page) => (
              <TitleItem
                page={page}
                pages={pages}
                anchors={anchors}
                name={name}
                font={font}
                fontMenu={fontMenu}
              />
            ))
        : entirePages.map((page) => (
            <TitleItem
              page={page}
              pages={pages}
              anchors={anchors}
              /*  name={name} */
              font={font}
              fontMenu={fontMenu}
            />
          ))}
    </ul>
  );
}

function TitleItem({ page, pages, anchors, name, font, fontMenu }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [slectedTarget, setSelectedTarget] = useState(null);
  /* const [colored, setColored] = useState(null); */
  const [fontCompare, setFontCompare] = useState("");
  function toggleCollapsed(event) {
    if (event.target === slectedTarget) {
      return;
    } else {
      setCollapsed((prev) => !prev);
    }
  }
  /* function handleColor(x) {
    setColored(x);
  } */
  function handleWeight(x) {
    /* if (x.target.className === "Anchor" || x.target.className === "anchors") {
      setFontCompare((prev) => prev);
    } */
    setFontCompare(x.target);
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
          <div className="TitleAndAnchorNested" onClick={handleWeight}>
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
                /* className={
                page.id === colored && !collapsed
                  ? "TitleOnlyBold"
                  : "TitleOnly"
              } */
                /* className="TitleOnly" */
                className={
                  font === fontCompare && fontCompare === fontMenu
                    ? "TitleOnlyBold"
                    : "TitleOnly"
                }
                style={
                  page.pages === undefined
                    ? { marginLeft: "15.5px" }
                    : { marginLeft: "0px" }
                }
                /* onClick={() => handleColor(page.id)} */
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
        </div>
        {!collapsed && page.pages && (
          <TitleList
            pages={pages}
            topLevelIds={page.pages}
            anchors={anchors}
            name={name}
            font={font}
            fontMenu={fontMenu}
          />
        )}
      </li>
    </Router>
  );
}
