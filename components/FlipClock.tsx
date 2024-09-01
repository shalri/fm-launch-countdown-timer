"use client";

import { useEffect, useState, useCallback } from "react";

interface FlipCardProps {
  initialDays: number;
}

export default function FlipClock({ initialDays }: FlipCardProps) {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const flip = useCallback((flipCard: Element | null, newNumber: string) => {
    if (!flipCard) return;

    const topHalf = flipCard.querySelector(".top");
    const startNumber = topHalf?.textContent || "00";
    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    if (topHalf && bottomHalf) {
      topHalf.textContent = startNumber;
      bottomHalf.textContent = startNumber;
      topFlip.textContent = startNumber;
      bottomFlip.textContent = newNumber;

      topFlip.addEventListener("animationend", () => {
        if (topHalf) topHalf.textContent = newNumber;
        topFlip.remove();
      });

      bottomFlip.addEventListener("animationend", () => {
        if (bottomHalf) bottomHalf.textContent = newNumber;
        bottomFlip.remove();
      });

      flipCard.append(topFlip, bottomFlip);
    }
  }, []);

  const flipAllCards = useCallback(
    (newTime: typeof time) => {
      flip(document.querySelector("[data-days]"), newTime.days);
      flip(document.querySelector("[data-hours]"), newTime.hours);
      flip(document.querySelector("[data-minutes]"), newTime.minutes);
      flip(document.querySelector("[data-seconds]"), newTime.seconds);
    },
    [flip],
  );

  useEffect(() => {
    let remainingSeconds = initialDays * 24 * 60 * 60;

    const updateCountdown = () => {
      if (remainingSeconds <= 0) {
        remainingSeconds = initialDays * 24 * 60 * 60;
      }

      remainingSeconds -= 1;

      localStorage.setItem("remainingTime", remainingSeconds.toString());

      const days = Math.floor(remainingSeconds / (24 * 60 * 60));
      const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      const seconds = remainingSeconds % 60;

      const newTime = {
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };

      flipAllCards(newTime);
      // setTime(newTime);
    };

    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("remainingTime");
      if (savedTime) {
        remainingSeconds = parseInt(savedTime);
      }

      const intervalId = setInterval(updateCountdown, 1000);

      return () => clearInterval(intervalId);
    }
  }, [initialDays, flipAllCards]);

  return (
    <div className="flip-clock flex flex-grow items-center justify-center gap-3 text-[3rem]">
      <div className="flip-clock-segment">
        <div className="flip-card" data-days>
          <div className="top">{time.days}</div>
          <div className="bottom">{time.days}</div>
        </div>
      </div>
      <div className="flip-clock-segment">
        <div className="flip-card" data-hours>
          <div className="top">{time.hours}</div>
          <div className="bottom">{time.hours}</div>
        </div>
      </div>
      <div className="flip-clock-segment">
        <div className="flip-card" data-minutes>
          <div className="top">{time.minutes}</div>
          <div className="bottom">{time.minutes}</div>
        </div>
      </div>
      <div className="flip-clock-segment">
        <div className="flip-card" data-seconds>
          <div className="top">{time.seconds}</div>
          <div className="bottom">{time.seconds}</div>
        </div>
      </div>
    </div>
  );
}
