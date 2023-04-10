import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setCountForShow,
  setOnlyDifference,
  setIdPhoneForChange,
} from "../phonesTable/phonesTableSlice";

import { PhoneBig } from "../phoneBig/PhoneBig";
import { HidePhones } from "../hidePhones/HidePhones";

import "./FilterBar.css";

import {
  selectRangeForShow,
  selectVisiblePhones,
  selectHidePhones,
  selectCountForShow,
} from "../phonesTable/phonesTableSlice";

export function FilterBar() {
  const rangeForShow = useAppSelector(selectRangeForShow);
  const activeCountForShow = useAppSelector(selectCountForShow);
  const visiblePhones = useAppSelector(selectVisiblePhones);
  const hidePhones = useAppSelector(selectHidePhones);

  const [showHidePhones, setShowHidePhones] = useState(false);

  const dispatch = useAppDispatch();

  const changedCountForShow = (e: MouseEvent<HTMLButtonElement>) => {
    const { count } = e.currentTarget.dataset;
    if (!count) return;
    const newCount = parseInt(count);
    if (!newCount || newCount === activeCountForShow) return;

    dispatch(setCountForShow(newCount));
  };

  const changedOnlyDifference = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    dispatch(setOnlyDifference(checked));
  };

  const onCompareClick = (
    e: MouseEvent<HTMLDivElement>,
    idForChange: string
  ) => {
    dispatch(setIdPhoneForChange(idForChange));

    const toolbarEl = document.getElementById("toolbar");
    if (!toolbarEl) return;
    const hidePhonesEl = document.getElementById("hidePhones");
    if (!hidePhonesEl) return;

    const { top, left } = e.currentTarget.getBoundingClientRect();

    const {
      top: topToolbar,
      left: leftToolbar,
      right: rightToolbar,
    } = toolbarEl.getBoundingClientRect();

    // const { width } = hidePhonesEl.getBoundingClientRect();
    const width = 421;

    // console.log(`top=${top}; left=${left}`);
    // console.log(`topToolbar=${topToolbar}; leftToolbar=${leftToolbar}`);
    // console.log(`width=${width}`);

    hidePhonesEl.style.top = top - topToolbar + "px";
    hidePhonesEl.style.left =
      (left - leftToolbar + width < rightToolbar
        ? left - leftToolbar
        : rightToolbar - width) + "px";
    hidePhonesEl.style.visibility = "visible";

    setShowHidePhones(true);
  };

  const onToolbarClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setShowHidePhones(false);
    }
  };

  const rangeItemsForShow = rangeForShow.map((item) => (
    <li
      key={item}
      className={
        item !== activeCountForShow
          ? "phonesTable__header__range__item"
          : "phonesTable__header__range__item_active"
      }
    >
      <button
        data-count={item}
        className={"text phonesTable_text"}
        onClick={changedCountForShow}
      >
        {item}
      </button>
    </li>
  ));

  const hasHide = hidePhones.length !== 0;
  const phones = visiblePhones.map((phone) => (
    <PhoneBig
      key={phone.id}
      id={phone.id}
      hasHide={hasHide}
      onCompareClick={onCompareClick}
    />
  ));

  return (
    <section className="container">
      <div className="phonesTable__header">
        <div>
          <h2 className="text phonesTable_header">Смартфоны</h2>
        </div>

        <div className="phonesTable__header__range">
          <p className="text phonesTable_text">Отобразить товары:</p>
          <ul className="phonesTable__header__range_list">
            {rangeItemsForShow}
          </ul>
        </div>
      </div>
      <div
        id="toolbar"
        className="phonesTable__phones"
        onClick={onToolbarClick}
      >
        <div className="phonesTable__difference text phonesTable_text">
          <input
            type="checkbox"
            id="difference"
            onChange={changedOnlyDifference}
          />
          <label htmlFor="difference">Показать различия</label>
        </div>
        {phones}
        <HidePhones show={showHidePhones} />
      </div>
    </section>
  );
}
