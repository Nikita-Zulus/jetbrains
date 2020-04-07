import React, { useState } from "react";

export default function TitleList({ topLevelIds, pages, anchors }) {
  return (
    <ul className="TitleList">
      {topLevelIds
        .map((id) => pages[id])
        .map((page) => (
          <TitleItem page={page} pages={pages} anchors={anchors} />
        ))}
    </ul>
  );
}

function TitleItem({ page, pages, anchors }) {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  console.log(selectedId);
  function toggleCollapsed() {
    setCollapsed((prev) => !prev);
  }

  return (
    <li key={page.id} id={page.id} className="TitleList__item">
      <div
        className="TitleAndAnchor"
        style={
          !collapsed || page.id === selectedId
            ? { backgroundColor: "#f0f0f0" }
            : { backgroundColor: "#fafafa" }
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
          <div
            className="TitleOnly"
            style={
              page.pages === undefined
                ? { marginLeft: "15px" }
                : { marginLeft: "0px" }
            }
          >
            <div
              style={
                !collapsed ? { fontWeight: "bold" } : { fontWeight: "normal" }
              }
            >
              {page.title}
            </div>
          </div>
        </div>
        <div className="anchors">
          {!collapsed &&
            page.anchors &&
            page.anchors.map((anchor) => (
              <a
                href={page.href + anchor}
                className="Anchor"
                style={{ paddingLeft: "15px" }}
              >
                {anchors[anchor].title}
              </a>
            ))}
        </div>
      </div>
      {!collapsed && page.pages && (
        <TitleList pages={pages} topLevelIds={page.pages} anchors={anchors} />
      )}
    </li>
  );
}
