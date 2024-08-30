// "use client";
//
// import { useEffect, useState } from "react";
//
// interface FlipCardProps {
//   initialDays: number
// }
//
// export default function FlipClock({ initialDays }: FlipCardProps) {
//   const [time, setTime] = useState({
//     // daysTens: Math.floor(initialDays / 10),
//     // daysOnes: initialDays % 10,
//     daysTens: 0,
//     daysOnes: 0,
//     hoursTens: 0,
//     hoursOnes: 0,
//     minutesTens: 0,
//     minutesOnes: 0,
//     secondsTens: 0,
//     secondsOnes: 0,
//   });
//
//   useEffect(() => {
//     let remainingSeconds = initialDays * 24 * 60 * 60;
//
//     if (typeof window !== "undefined") {
//       const savedTime = localStorage.getItem("remainingTime");
//       if (savedTime) {
//         remainingSeconds = parseInt(savedTime);
//       }
//
//       const intervalId = setInterval(() => {
//         if (remainingSeconds <= 0) {
//           clearInterval(intervalId);
//           return;
//         }
//
//         remainingSeconds -= 1;
//
//         // Save the remaining time to localStorage
//         localStorage.setItem("remainingTime", remainingSeconds.toString());
//
//         const days = Math.floor(remainingSeconds / (24 * 60 * 60));
//         const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
//         const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
//         const seconds = remainingSeconds % 60;
//
//         const newTime = {
//           daysTens: Math.floor(days / 10),
//           daysOnes: days % 10,
//           hoursTens: Math.floor(hours / 10),
//           hoursOnes: hours % 10,
//           minutesTens: Math.floor(minutes / 10),
//           minutesOnes: minutes % 10,
//           secondsTens: Math.floor(seconds / 10),
//           secondsOnes: seconds % 10,
//         };
//
//         flipAllCards(newTime);
//         // setTime(newTime);
//       }, 1000);
//
//       return () => clearInterval(intervalId);
//     }
//   }, [initialDays, flipAllCards]);
//
//   const flipAllCards = (newTime: typeof time) => {
//     flip(document.querySelector("[data-days-tens]"), newTime.daysTens);
//     flip(document.querySelector("[data-days-ones]"), newTime.daysOnes);
//     flip(document.querySelector("[data-hours-tens]"), newTime.hoursTens);
//     flip(document.querySelector("[data-hours-ones]"), newTime.hoursOnes);
//     flip(document.querySelector("[data-minutes-tens]"), newTime.minutesTens);
//     flip(document.querySelector("[data-minutes-ones]"), newTime.minutesOnes);
//     flip(document.querySelector("[data-seconds-tens]"), newTime.secondsTens);
//     flip(document.querySelector("[data-seconds-ones]"), newTime.secondsOnes);
//   };
//
//   const flip = (flipCard: Element | null, newNumber: number) => {
//     if (!flipCard) return;
//
//     const topHalf = flipCard.querySelector(".top");
//     const startNumber = parseInt(topHalf?.textContent || "0");
//     if (newNumber === startNumber) return;
//
//     const bottomHalf = flipCard.querySelector(".bottom");
//     const topFlip = document.createElement("div");
//     topFlip.classList.add("top-flip");
//     const bottomFlip = document.createElement("div");
//     bottomFlip.classList.add("bottom-flip");
//
//     if (topHalf && bottomHalf) {
//       topHalf.textContent = startNumber.toString();
//       bottomHalf.textContent = startNumber.toString();
//       topFlip.textContent = startNumber.toString();
//       bottomFlip.textContent = newNumber.toString();
//
//       topFlip.addEventListener("animationend", () => {
//         if (topHalf) topHalf.textContent = newNumber.toString();
//         topFlip.remove();
//       });
//
//       bottomFlip.addEventListener("animationend", () => {
//         if (bottomHalf) bottomHalf.textContent = newNumber.toString();
//         bottomFlip.remove();
//
//         // Only update the time state after the animation completes
//         // setTime((prevTime) => ({ ...prevTime, [flipCard.dataset.type]: newNumber }));
//       });
//
//       flipCard.append(topFlip, bottomFlip);
//     }
//   };
//
//
//   return (
//     <div className="flip-clock flex flex-grow itmes-center justify-center text-[3rem] gap-3">
//       <div className="flip-clock-segment">
//         <div className="flip-card" data-days-tens>
//           <div className="top">{time.daysTens}</div>
//           <div className="bottom">{time.daysTens}</div>
//         </div>
//         <div className="flip-card" data-days-ones>
//           <div className="top">{time.daysOnes}</div>
//           <div className="bottom">{time.daysOnes}</div>
//         </div>
//       </div>
//       <div className="flip-clock-segment">
//         <div className="flip-card" data-hours-tens>
//           <div className="top">{time.hoursTens}</div>
//           <div className="bottom">{time.hoursTens}</div>
//         </div>
//         <div className="flip-card" data-hours-ones>
//           <div className="top">{time.hoursOnes}</div>
//           <div className="bottom">{time.hoursOnes}</div>
//         </div>
//       </div>
//       <div className="flip-clock-segment">
//         <div className="flip-card" data-minutes-tens>
//           <div className="top">{time.minutesTens}</div>
//           <div className="bottom">{time.minutesTens}</div>
//         </div>
//         <div className="flip-card" data-minutes-ones>
//           <div className="top">{time.minutesOnes}</div>
//           <div className="bottom">{time.minutesOnes}</div>
//         </div>
//       </div>
//       <div className="flip-clock-segment">
//         <div className="flip-card" data-seconds-tens>
//           <div className="top">{time.secondsTens}</div>
//           <div className="bottom">{time.secondsTens}</div>
//         </div>
//         <div className="flip-card" data-seconds-ones>
//           <div className="top">{time.secondsOnes}</div>
//           <div className="bottom">{time.secondsOnes}</div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client";

import { useEffect, useState, useCallback } from "react";

interface FlipCardProps {
  initialDays: number
}

export default function FlipClock({ initialDays }: FlipCardProps) {
  const [time, setTime] = useState({
    daysTens: 0,
    daysOnes: 0,
    hoursTens: 0,
    hoursOnes: 0,
    minutesTens: 0,
    minutesOnes: 0,
    secondsTens: 0,
    secondsOnes: 0,
  });

  const flip = useCallback((flipCard: Element | null, newNumber: number) => {
    if (!flipCard) return;

    const topHalf = flipCard.querySelector(".top");
    const startNumber = parseInt(topHalf?.textContent || "0");
    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    if (topHalf && bottomHalf) {
      topHalf.textContent = startNumber.toString();
      bottomHalf.textContent = startNumber.toString();
      topFlip.textContent = startNumber.toString();
      bottomFlip.textContent = newNumber.toString();

      topFlip.addEventListener("animationend", () => {
        if (topHalf) topHalf.textContent = newNumber.toString();
        topFlip.remove();
      });

      bottomFlip.addEventListener("animationend", () => {
        if (bottomHalf) bottomHalf.textContent = newNumber.toString();
        bottomFlip.remove();
      });

      flipCard.append(topFlip, bottomFlip);
    }
  }, []);

  const flipAllCards = useCallback((newTime: typeof time) => {
    flip(document.querySelector("[data-days-tens]"), newTime.daysTens);
    flip(document.querySelector("[data-days-ones]"), newTime.daysOnes);
    flip(document.querySelector("[data-hours-tens]"), newTime.hoursTens);
    flip(document.querySelector("[data-hours-ones]"), newTime.hoursOnes);
    flip(document.querySelector("[data-minutes-tens]"), newTime.minutesTens);
    flip(document.querySelector("[data-minutes-ones]"), newTime.minutesOnes);
    flip(document.querySelector("[data-seconds-tens]"), newTime.secondsTens);
    flip(document.querySelector("[data-seconds-ones]"), newTime.secondsOnes);
  }, [flip]);

  useEffect(() => {
    let remainingSeconds = initialDays * 24 * 60 * 60;

    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("remainingTime");
      if (savedTime) {
        remainingSeconds = parseInt(savedTime);
      }

      const intervalId = setInterval(() => {
        if (remainingSeconds <= 0) {
          clearInterval(intervalId);
          return;
        }

        remainingSeconds -= 1;

        localStorage.setItem("remainingTime", remainingSeconds.toString());

        const days = Math.floor(remainingSeconds / (24 * 60 * 60));
        const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
        const seconds = remainingSeconds % 60;

        const newTime = {
          daysTens: Math.floor(days / 10),
          daysOnes: days % 10,
          hoursTens: Math.floor(hours / 10),
          hoursOnes: hours % 10,
          minutesTens: Math.floor(minutes / 10),
          minutesOnes: minutes % 10,
          secondsTens: Math.floor(seconds / 10),
          secondsOnes: seconds % 10,
        };

        flipAllCards(newTime);
        // setTime(newTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [initialDays, flipAllCards]);

  return (
    <div className="flip-clock flex flex-grow items-center justify-center text-[3rem] gap-3">
      <div className="flip-clock-segment">
        <div className="flip-card" data-days-tens>
          <div className="top">{time.daysTens}</div>
          <div className="bottom">{time.daysTens}</div>
        </div>
        <div className="flip-card" data-days-ones>
          <div className="top">{time.daysOnes}</div>
          <div className="bottom">{time.daysOnes}</div>
        </div>
      </div>
      <div className="flip-clock-segment">
        <div className="flip-card" data-hours-tens>
          <div className="top">{time.hoursTens}</div>
          <div className="bottom">{time.hoursTens}</div>
        </div>
        <div className="flip-card" data-hours-ones>
          <div className="top">{time.hoursOnes}</div>
          <div className="bottom">{time.hoursOnes}</div>
        </div>
      </div>
      <div className="flip-clock-segment">
        <div className="flip-card" data-minutes-tens>
          <div className="top">{time.minutesTens}</div>
          <div className="bottom">{time.minutesTens}</div>
        </div>
        <div className="flip-card" data-minutes-ones>
          <div className="top">{time.minutesOnes}</div>
          <div className="bottom">{time.minutesOnes}</div>
        </div>
      </div>
      <div className="flip-clock-segment">
        <div className="flip-card" data-seconds-tens>
          <div className="top">{time.secondsTens}</div>
          <div className="bottom">{time.secondsTens}</div>
        </div>
        <div className="flip-card" data-seconds-ones>
          <div className="top">{time.secondsOnes}</div>
          <div className="bottom">{time.secondsOnes}</div>
        </div>
      </div>
    </div>
  )
}
