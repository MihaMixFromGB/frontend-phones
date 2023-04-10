import React, { ChangeEvent, MouseEvent, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectHidePhones } from "../phonesTable/phonesTableSlice";
import { changePhone } from "../phonesTable/phonesTableSlice";

import "./HidePhones.css";

export interface HidePhonesProps {
  show: boolean;
}

export function HidePhones({ show }: HidePhonesProps) {
  const hidePhones = useAppSelector(selectHidePhones);

  const [searchName, setSearchName] = useState("");
  const [phonesList, setPhonesList] = useState(hidePhones);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const dispatch = useAppDispatch();

  const onChange = (e: MouseEvent<HTMLElement>) => {
    const { id: idChange } = e.currentTarget.dataset;
    if (!idChange) return;

    dispatch(changePhone(idChange));
  };

  useEffect(() => {
    if (!searchName) {
      setPhonesList(hidePhones);
      return;
    }
    const filteredList = hidePhones.filter((phone) =>
      phone.name.includes(searchName)
    );
    setPhonesList(filteredList);
  }, [searchName, hidePhones]);

  const renderedPhones = phonesList.map((phone) => (
    <div key={phone.id} className="hidePhone_container">
      <button className="hidePhone__btn" data-id={phone.id} onClick={onChange}>
        <img src="/images/icon_change.png" alt="change" />
      </button>
      <div className="hidePhone__img">
        <img src={phone.icon} alt={phone.name} />
      </div>
      <p className="text hidePhone__label">{phone.name}</p>
    </div>
  ));

  return (
    <div
      id="hidePhones"
      className={`hidePhones_container ${
        show ? "hidePhones_show" : "hidePhones_hide"
      }`}
    >
      <input
        className="hidePhones__input text"
        placeholder="Поиск"
        value={searchName}
        onChange={onChangeSearchName}
      />
      <div className="hidePhones__list">{renderedPhones}</div>
    </div>
  );
}
