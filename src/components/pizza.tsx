import React, { useState } from "react";
import { Check } from "lucide-react";
import { PizzaDetails } from "./pizza-details";

type Flavor = {
  name: string;
  color: string;
};

const FLAVORS: Flavor[] = [
  { name: "Mussarela", color: "#FCD464" },
  { name: "Calabresa", color: "#ff8215" },
  { name: "Margherita", color: "#E9D9AF" },
  { name: "4 Queijos", color: "#F1A025" },
  { name: "Portuguesa", color: "#F4C165" },
];

const PizzaApp: React.FC = () => {
  const [selectedFlavors, setSelectedFlavors] = useState<Flavor[]>([]);
  const [highlightedFlavor, setHighlightedFlavor] = useState<string | null>(
    null
  );

  const toggleFlavor = (flavor: Flavor) => {
    setSelectedFlavors((prev) => {
      const isSelected = prev.some((f) => f.name === flavor.name);
      if (isSelected) {
        return prev.filter((f) => f.name !== flavor.name);
      } else if (prev.length < 4) {
        return [...prev, flavor];
      }
      return prev;
    });
  };

  const PizzaSlice: React.FC<{
    flavor: Flavor;
    startAngle: number;
    endAngle: number;
    isHighlighted: boolean;
  }> = ({ flavor, startAngle, endAngle, isHighlighted }) => {
    const start = polarToCartesian(50, 50, 45, startAngle);
    const end = polarToCartesian(50, 50, 45, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
      "M",
      50,
      50,
      "L",
      start.x,
      start.y,
      "A",
      45,
      45,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
      "Z",
    ].join(" ");

    return (
      <path
        d={d}
        fill={flavor.color}
        stroke={isHighlighted ? "white" : "none"}
        strokeWidth={isHighlighted ? 2 : 0}
        onClick={() => setHighlightedFlavor(flavor.name)}
      />
    );
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const renderPizza = () => {
    if (selectedFlavors.length === 0 || selectedFlavors.length < 2) {
      return <circle cx="50" cy="50" r="45" fill="#FCD464" />;
    } else {
      const sliceAngle = 360 / selectedFlavors.length;
      return (
        <>
          {selectedFlavors.map((flavor, index) => (
            <PizzaSlice
              key={flavor.name}
              flavor={flavor}
              startAngle={index * sliceAngle}
              endAngle={(index + 1) * sliceAngle}
              isHighlighted={highlightedFlavor === flavor.name}
            />
          ))}

          {selectedFlavors.map((flavor, index) => {
            const midAngle =
              (index * sliceAngle + (index + 1) * sliceAngle) / 2;
            const textPos = polarToCartesian(50, 53, 25, midAngle);

            return (
              <text
                key={`text-${flavor.name}`}
                x={textPos.x}
                y={textPos.y}
                fill="black"
                fontSize="6"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="flavor-text"
              >
                {flavor.name}
              </text>
            );
          })}
        </>
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-8">
      <div className="flex gap-8">
        <div className="bg-[#F59424] relative rounded-full h-64 w-64 flex items-center justify-center">
          <PizzaDetails />
          <svg viewBox="0 0 100 100" className="w-64 h-64">
            {renderPizza()}
          </svg>
        </div>
        <div className="bg-white rounded-lg p-4 w-64">
          <h2 className="text-xl font-bold mb-4">Sabores</h2>
          <ul>
            {FLAVORS.map((flavor) => (
              <li
                key={flavor.name}
                className={`flex items-center justify-between p-2 cursor-pointer ${
                  highlightedFlavor === flavor.name ? "bg-blue-100" : ""
                }`}
                onClick={() => toggleFlavor(flavor)}
                onMouseEnter={() => setHighlightedFlavor(flavor.name)}
                onMouseLeave={() => setHighlightedFlavor(null)}
              >
                <span>{flavor.name}</span>
                {selectedFlavors.some((f) => f.name === flavor.name) && (
                  <Check className="text-green-500" size={20} />
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Sabores selecionados: {selectedFlavors.length}/4
          </p>
        </div>
      </div>
    </div>
  );
};

export default PizzaApp;
