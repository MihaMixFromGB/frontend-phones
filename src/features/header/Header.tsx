import React from "react";

import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="container header_container">
        <div className="header_caption text">Каталог</div>
        <nav className="header__nav">
          <div className="header__nav_item text text_uppercase">Сравнение</div>
          <div className="header__nav_lk">
            <p className="header__nav_item text">Личный кабинет</p>
            <img src="images/lk.png" alt="user_lk" />
          </div>
        </nav>
      </div>
    </header>
  );
}
