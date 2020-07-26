import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function TitleList({
  topLevelIds,
  pages,
  anchors,
  name,
  fontMenu,
  /* collapsed, */
}) {
  const [font, setFont] = useState(null);
  function fontHandle(y) {
    setFont(y.target);
    console.log(y.target.className);
  }
  let entirePages = [];
  if (name !== "") {
    let lowerCase = name.toLowerCase();
    for (let key in pages) {
      let titleOfPage = pages[key].title.toLowerCase();
      if (titleOfPage.includes(lowerCase)) {
        entirePages.push(pages[key]);
        /* for (let k in pages) {
          if (pages[k].id === pages[key].parentId) {
            entirePages.unshift(pages[k]);
          }
        } */
      }
    }
  }
  return (
    <ul
      key={topLevelIds}
      className="TitleList"
      onClick={fontHandle}
      /*  style={{ maxHeight: collapsed ? 0 : 1000 }} */
    >
      {name === ""
        ? topLevelIds
            .map((id) => pages[id])
            .map((page) => (
              <TitleItem
                page={page}
                pages={pages}
                anchors={anchors}
                name={name}
                font={font}
                fontMenu={fontMenu}
                key={page.id}
              />
            ))
        : entirePages.map((page) => (
            <TitleItem
              page={page}
              pages={pages}
              anchors={anchors}
              name={name}
              font={font}
              fontMenu={fontMenu}
              key={page.id}
            />
          ))}
    </ul>
  );
}

function TitleItem({ page, pages, anchors, name, font, fontMenu }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [slectedTarget, setSelectedTarget] = useState(null);
  const [fontCompare, setFontCompare] = useState("");
  function toggleCollapsed(event) {
    if (event.target === slectedTarget) {
      return;
    } else {
      setCollapsed((prev) => !prev);
    }
  }
  function handleWeight(x) {
    setFontCompare(x.target);
  }
  return (
    <Router key={page.id}>
      <li /* key={page.id} */ id={page.id} className="TitleList__item">
        <div
          /* key={page.id} */
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
          <div
            /* key={page.id} */
            className="TitleAndAnchorNested"
            onClick={handleWeight}
          >
            <div /* key={page.id} */ className="TitleList__header">
              {page.pages && (
                <div
                  /* key={page.id} */
                  className={
                    collapsed
                      ? "TitleList__CheckSqure__Rotate"
                      : "TitleList__CheckSqure"
                  }
                ></div>
              )}
              {page.url !== undefined ? (
                <Link
                  /* key={page.id} */
                  to={page.url}
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
                >
                  {page.title}
                </Link>
              ) : (
                <span
                  /* key={page.id} */
                  to={page.url}
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
                >
                  {page.title}
                </span>
              )}
            </div>
            <div
              /* key={page.id} */
              className="anchors"
              onMouseOver={(e) => setSelectedTarget(e.target)}
              onMouseOut={() => setSelectedTarget(null)}
            >
              {
                /* false && */ !collapsed &&
                  page.anchors &&
                  page.anchors.map((anchor) => (
                    <Link
                      key={anchors[anchor].id}
                      to={anchors[anchor].url + anchors[anchor].anchor}
                      className="Anchor"
                      style={{ paddingLeft: "40px" }}
                    >
                      {anchors[anchor].title}
                    </Link>
                  ))
              }
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
            /* collapsed={collapsed} */
          />
        )}
      </li>
    </Router>
  );
}
