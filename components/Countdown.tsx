"use client";
'use client';
import React, { useEffect, useState } from 'react';

function getTimeLeft(target: Date) {
  const now = new Date().getTime();
  const distance = target.getTime() - now;
  if (distance < 0) return null;
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
  };
}

export default function Countdown({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(new Date(deadline)));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(new Date(deadline)));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!timeLeft)
    return <div style={{ color: '#ff0', fontWeight: 700, fontSize: '1.2rem', background: '#111', borderRadius: 12, padding: '1rem 2rem', margin: '1.5rem 0', boxShadow: '0 2px 12px #ff08' }}>🔥 This deal is gone!</div>;

  return (
    <div style={{ background: 'rgba(0,0,0,0.85)', borderRadius: 14, padding: '1.2rem 2rem', margin: '1.5rem 0', color: '#ff0', fontWeight: 700, fontSize: '1.2rem', boxShadow: '0 2px 12px #ff08', textAlign: 'center', display: 'inline-block' }}>
      <p style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>🔥 Sale Ends In:</p>
      <div style={{ fontSize: '2rem', letterSpacing: '0.1em', marginTop: 6 }}>
        <span>{String(timeLeft.days).padStart(2, '0')}</span>d :
        <span>{String(timeLeft.hours).padStart(2, '0')}</span>h :
        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>m :
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>s
      </div>
    </div>
  );
}
