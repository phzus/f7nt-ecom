"use client";
// Migrado de: snippets/product-variant-picker.liquid

import type { CartPandaVariant, CartPandaOption } from "@/types/cartpanda";

interface VariantSelectorProps {
  options: CartPandaOption[];
  variants: CartPandaVariant[];
  selectedVariantId: number;
  onVariantChange: (variantId: number) => void;
}

export default function VariantSelector({
  options,
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);

  if (options.length === 0 || (options.length === 1 && options[0].values.length <= 1)) {
    return null;
  }

  // Find variant by option values
  const getVariantForOptions = (
    optionIndex: number,
    value: string
  ): CartPandaVariant | undefined => {
    const currentOptions = [
      selectedVariant?.option1,
      selectedVariant?.option2,
      selectedVariant?.option3,
    ];
    currentOptions[optionIndex] = value;

    return variants.find(
      (v) =>
        (currentOptions[0] === null || v.option1 === currentOptions[0]) &&
        (currentOptions[1] === null || v.option2 === currentOptions[1]) &&
        (currentOptions[2] === null || v.option3 === currentOptions[2])
    );
  };

  const currentOptions = [
    selectedVariant?.option1,
    selectedVariant?.option2,
    selectedVariant?.option3,
  ];

  return (
    <div className="flex flex-col gap-4">
      {options.map((option, optionIndex) => (
        <div key={option.id}>
          <label className="block text-sm font-bold uppercase mb-2" style={{ letterSpacing: "0.6px", color: "#1a1a1a" }}>
            {option.name}:{" "}
            <span className="font-normal capitalize">
              {currentOptions[optionIndex]}
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const variant = getVariantForOptions(optionIndex, value);
              const isSelected = currentOptions[optionIndex] === value;
              const isAvailable = variant?.available !== false;

              return (
                <button
                  key={value}
                  onClick={() => {
                    if (variant && isAvailable) onVariantChange(variant.id);
                  }}
                  disabled={!isAvailable}
                  className={`
                    min-w-[44px] px-3 py-2 text-sm font-medium border transition-all duration-150
                    ${isSelected
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                    }
                    ${!isAvailable ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer"}
                  `}
                  aria-pressed={isSelected}
                  aria-label={`${option.name}: ${value}${!isAvailable ? " (unavailable)" : ""}`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
