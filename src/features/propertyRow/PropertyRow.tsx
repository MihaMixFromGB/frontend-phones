import React from "react";

import { useAppSelector } from "../../app/hooks";
import {
  selectVisiblePhones,
  selectOnlyDifference,
} from "../phonesTable/phonesTableSlice";
import { Property, PropertyKey } from "./Property";

import "./PropertyRow.css";

export interface PropertyRowProps {
  property: PropertyKey;
}

export function PropertyRow({ property }: PropertyRowProps) {
  const phones = useAppSelector(selectVisiblePhones);
  const onlyDifference = useAppSelector(selectOnlyDifference);

  const propertyValues = phones.map((phone) => phone[property]);
  if (
    onlyDifference &&
    propertyValues.every((value) => value === propertyValues[0])
  ) {
    return <></>;
  }

  const propertyObjects = propertyValues.map(
    (value) => new Property(property, String(value))
  );

  const isBoolean = typeof propertyValues[0] === "boolean";

  return (
    <section className="properties_container">
      <div className="text properties_text_name">
        {propertyObjects[0].getName()}
      </div>
      {propertyObjects.map((property, i) =>
        isBoolean ? (
          getBooleanValue(property, i)
        ) : (
          <div className="text properties_text_value" key={i}>
            {property.getValue()}
          </div>
        )
      )}
    </section>
  );
}

function getBooleanValue(property: Property, key: number) {
  if (property.getValue() === "true") {
    return <img key={key} src="images/icon_yes.png" alt={property.getName()} />;
  }
  return <img key={key} src="images/icon_no.png" alt={property.getName()} />;
}
