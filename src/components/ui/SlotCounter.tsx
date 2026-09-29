import React from 'react';

interface SlotColumnProps {
  digit: number;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function SlotColumn({ digit }: SlotColumnProps) {
  // Each digit is 2.5rem (40px) tall
  const translateY = -(digit * 40);

  return (
    <div className="relative h-[40px] w-[20px] md:w-[24px] overflow-hidden inline-block text-center font-mono font-bold text-2xl md:text-3xl text-cyan-400 select-none">
      <div
        className="transition-transform duration-500 ease-out flex flex-col items-center"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {DIGITS.map((num) => (
          <div key={num} className="h-[40px] leading-[40px] flex items-center justify-center">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SlotCounterProps {
  value: number;
  padLength?: number;
  suffix?: string;
}

export const SlotCounter: React.FC<SlotCounterProps> = ({
  value,
  padLength = 1,
  suffix = '',
}) => {
  const numStr = Math.max(0, Math.round(value)).toString();
  const padded = padLength > 1 ? numStr.padStart(padLength, '0') : numStr;
  const digits = padded.split('').map((char) => parseInt(char, 10) || 0);

  return (
    <div className="flex items-center tracking-tighter bg-navy-950/80 px-4 py-1.5 rounded-2xl border border-cyan-400/30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)]">
      {digits.map((d, idx) => (
        <SlotColumn key={idx} digit={d} />
      ))}
      {suffix && (
        <span className="font-mono text-xl md:text-2xl font-bold text-cyan-400 ml-1">
          {suffix}
        </span>
      )}
    </div>
  );
};
