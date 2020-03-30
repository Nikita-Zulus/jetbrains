import React, { useState } from "react";

export default function TitleList({ topLevelIds, pages }) {
  return (
    <ul className="TitleList">
      {topLevelIds
        .map(id => pages[id])
        .map(page => (
          <TitleItem page={page} pages={pages} />
        ))}
    </ul>
  );
}

function TitleItem({ page, pages }) {
  const [collapsed, setCollapsed] = useState(true);

  function toggleCollapsed(e) {
    setCollapsed(prev => !prev);
  }

  return (
    <li
      key={page.id}
      id={page.id}
      className="TitleList__item"
      style={{
        paddingLeft: `${page.level * 10}px`
      }}
    >
      <div className="TitleList__header" onClick={toggleCollapsed}>
        {page.pages && <div className="TitleList__CheckSqure"></div>}
        {page.title}
      </div>
      {!collapsed && page.pages && (
        <TitleList pages={pages} topLevelIds={page.pages} />
      )}
    </li>
  );
}
