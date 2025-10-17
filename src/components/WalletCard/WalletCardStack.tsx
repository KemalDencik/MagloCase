import React, { useRef, useState, useEffect } from "react";
import { CardDto } from "@/api/models";
import { defaultWalletTheme, walletThemes } from "@/constant/walletThemes";
import { Wifi } from "lucide-react";

export const WalletCardStack: React.FC<{ cards: CardDto[] }> = ({ cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const baseWidth = 354;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const containerWidth = el.offsetWidth;
      const newScale = Math.min(containerWidth / baseWidth, 1);
      setScale(newScale);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!cards?.length) return <div>No cards</div>;

  const sortedCards = [...cards].sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
  );

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div
        className="relative"
        style={{
          width: `${baseWidth * scale}px`,
          height: `${359 * scale}px`,
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      >
        {sortedCards.map((card, index) => {
          const isTop = index !== 0;
          const top = (isTop ? 187 : 37) * scale;
          const left = (isTop ? 15 : 0) * scale;
          const width = (isTop ? 324 : 354) * scale;
          const height = (isTop ? 172 : 210) * scale;

          const theme =
            walletThemes[card.color as keyof typeof walletThemes] ||
            defaultWalletTheme;

          const networkLogo =
            card.network?.toLowerCase() === "visa"
              ? "/assets/cards/visa.svg"
              : card.network?.toLowerCase().includes("master")
              ? "/assets/cards/mastercard.svg"
              : undefined;

          return (
            <div
              key={card.id}
              className={`absolute rounded-[15px] shadow-lg transition-all ${
                isTop ? "backdrop-blur-md bg-white/60" : ""
              }`}
              style={{
                top,
                left,
                width,
                height,
                background: isTop ? undefined : theme.background,
                color: theme.textColor,
                border: theme.border,
                zIndex: isTop ? 10 : 5,
              }}
            >
              <div className="relative h-full px-6 pt-6 pb-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-sm leading-tight">{card.bank}</span>
                  <div
                    className="rounded-md"
                    style={{
                      width: 38 * scale,
                      height: 28 * scale,
                      backgroundColor: theme.chipColor,
                    }}
                  />
                </div>

                <div className="mt-[-24px]">
                  <span
                    className="tracking-widest font-medium block"
                    style={{ fontSize: 17 * scale }}
                  >
                    {card.cardNumber}
                  </span>
                </div>

                <div
                  className="flex justify-between items-center mt-2"
                  style={{ fontSize: 12 * scale }}
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {String(card.expiryMonth).padStart(2, "0")}/
                      {String(card.expiryYear).slice(-2)}
                    </span>
                    <Wifi
                      className="w-5 h-5 opacity-60"
                      style={{ transform: "rotate(90deg)" }}
                    />
                  </div>

                  {networkLogo && (
                    <img
                      src={networkLogo}
                      alt={card.network}
                      className="absolute bottom-4 right-6 opacity-90"
                      style={{
                        width: 50 * scale,
                        height: "auto",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
