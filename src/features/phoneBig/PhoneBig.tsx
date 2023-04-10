import React, { MouseEvent } from "react";

import { useAppSelector } from "../../app/hooks";
import { selectPhone } from "../phonesTable/phonesTableSlice";

import "./PhoneBig.css";

export interface PhoneBigProps {
  id: string;
  hasHide: boolean;
  onCompareClick: (e: MouseEvent<HTMLDivElement>, idPhone: string) => void;
}

export function PhoneBig({ id, hasHide, onCompareClick }: PhoneBigProps) {
  const phone = useAppSelector((state) => selectPhone(state, id));
  if (!phone) return null;

  const { name, photo } = phone;

  return (
    <article className="phone_container">
      <div className="phone_item">
        <div>
          <img src={photo} alt={name} />
          {hasHide && (
            <div
              className="phone_item_compare"
              onClick={(e) => onCompareClick(e, id)}
            >
              <img src="images/icon_compare.png" alt="add to compare" />
            </div>
          )}
        </div>
        <p className="text phone_item_text">{name}</p>
      </div>
    </article>
  );
}
