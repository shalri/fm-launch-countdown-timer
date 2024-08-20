"use client";
import { useEffect, useState } from "react";

interface CountdownProps {
  initialDays: number;
}

export default function Countdown({ initialDays }: CountdownProps) {
  const calculateNewTargetDate = (initialDays: number) => {
    const now = new Date();
    now.setDate(now.getDate() + initialDays);
    return now
  }

  const [targetDate, setTargetDate] = useState(calculateNewTargetDate(initialDays));
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeRemaining = targetDate.getTime() - now;

      if (timeRemaining <= 0) {
        setTargetDate(calculateNewTargetDate(initialDays)); // Reset countdown
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate, initialDays]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-lg font-bold uppercase text-lc-white">We&apos;re Launching Soon</h1>
      <div className="">{timeLeft.days} DAYS</div>
      <div className="">{timeLeft.hours} HOURS</div>
      <div className="">{timeLeft.minutes} MINUTES</div>
      <div className="">{timeLeft.seconds} SECONDS</div>

    </div>
  );
}
