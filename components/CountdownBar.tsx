// components/CountdownBar.tsx
'use client';

export default function CountdownBar() {
  return (
    <div className="bg-red-600 text-white text-center py-2 px-4 text-sm md:text-base font-semibold tracking-wide animate-pulse">
      🔥 Limited Time — <span className="underline underline-offset-2">15% Off</span> All Custom Orders This Week! Use Code: <strong>STANDOUT15</strong>
    </div>
  );
}
