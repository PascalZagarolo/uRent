'use client'

import React, { useState, useEffect } from 'react';

const Countdown: React.FC<{ targetDate: Date }> = ({ targetDate }) => {

  

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div className='flex gap-x-2 text-2xl font-medium'>
      {//@ts-ignore
      timeLeft.days !== undefined && (
        <div>
          <span>{//@ts-ignore
          formatTime(timeLeft.days)}</span> Tage{' '}
        </div>
      )}
      <div >
        <span>{//@ts-ignore
        formatTime(timeLeft.hours)}</span>:
        <span>{//@ts-ignore
        formatTime(timeLeft.minutes)}</span>:
        <span>{//@ts-ignore
        formatTime(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};

export default Countdown;