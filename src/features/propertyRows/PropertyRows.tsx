import React, { useState } from "react";

import { PropertyKey } from "../propertyRow/Property";
import { PropertyRow } from "../propertyRow/PropertyRow";

import "./PropertyRows.css";

export function PropertyRows() {
  const [properties] = useState(
    () =>
      [
        "producer",
        "releaseYear",
        "diagonal",
        "countryOfProducer",
        "storage",
        "frequency",
        "nfc",
        "esim",
        "wirelessCharging",
        "price",
      ] as PropertyKey[]
  );

  return (
    <section className="container">
      <div className="propertyTable_container">
        {properties.map((property, i) => (
          <PropertyRow key={i} property={property} />
        ))}
      </div>
    </section>
  );
}
