// "use client";
// import React, { useEffect, useState, useCallback } from 'react';
//
// interface CountdownProps {
//   initialDays: number;
// }
//
// const Countdown: React.FC<CountdownProps> = ({ initialDays }) => {
//   const calculateNewTargetDate = useCallback(() => {
//     const now = new Date();
//     now.setDate(now.getDate() + initialDays);
//     return now;
//   }, [initialDays]);
//
//   const getStoredTargetDate = () => {
//     if (typeof window !== 'undefined') {
//       const storedDate = localStorage.getItem('targetDate');
//       return storedDate ? new Date(storedDate) : null;
//     }
//     return null;
//   };
//
//   const [targetDate, setTargetDate] = useState<Date | null>(null);
//
//   useEffect(() => {
//     const storedDate = getStoredTargetDate();
//     if (storedDate) {
//       setTargetDate(storedDate);
//     } else {
//       const newTargetDate = calculateNewTargetDate();
//       setTargetDate(newTargetDate);
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('targetDate', newTargetDate.toString());
//       }
//     }
//   }, [calculateNewTargetDate]);
//
//   const calculateTimeLeft = (target: Date) => {
//     const now = new Date().getTime();
//     const timeRemaining = target.getTime() - now;
//
//     const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
//
//     return {
//       days: days.toString().padStart(2, "0"),
//       hours: hours.toString().padStart(2, "0"),
//       minutes: minutes.toString().padStart(2, "0"),
//       seconds: seconds.toString().padStart(2, "0")
//     };
//   };
//
//   const [timeLeft, setTimeLeft] = useState<{ days: string; hours: string; minutes: string; seconds: string }>({
//     days: "00",
//     hours: "00",
//     minutes: "00",
//     seconds: "00",
//   });
//
//   useEffect(() => {
//     if (targetDate) {
//       setTimeLeft(calculateTimeLeft(targetDate));
//     }
//   }, [targetDate]);
//
//   useEffect(() => {
//     if (!targetDate) return;
//
//     const interval = setInterval(() => {
//       setTimeLeft(calculateTimeLeft(targetDate));
//     }, 1000);
//
//     return () => clearInterval(interval);
//   }, [targetDate]);
//
//   const FlipClockUnit: React.FC<{ value: string; label: string }> = ({ value, label }) => {
//     const [prevValue, setPrevValue] = useState(value);
//     const [flip, setFlip] = useState(false);
//
//     useEffect(() => {
//       if (prevValue !== value) {
//         setFlip(true);
//         setTimeout(() => {
//           setFlip(false);
//           setPrevValue(value);
//         }, 600); // Match the duration of the flip animation
//       }
//     }, [value]);
//
//     return (
//       <div className="text-center">
//         <div className="flip-clock">
//           <span className={`flip-clock-card ${flip ? 'flip' : ''}`}>
//             <span className="flip-clock-card-front">{prevValue}</span>
//             <span className="flip-clock-card-back">{value}</span>
//           </span>
//         </div>
//         <div className="text-sm">{label}</div>
//       </div>
//     );
//   };
//
//   return (
//     <section>
//       <h1 className="uppercase text-lc-white">We&apos;re launching soon</h1>
//       <div className="flex space-x-4">
//         <FlipClockUnit value={timeLeft.days} label="Days" />
//         <FlipClockUnit value={timeLeft.hours} label="Hours" />
//         <FlipClockUnit value={timeLeft.minutes} label="Minutes" />
//         <FlipClockUnit value={timeLeft.seconds} label="Seconds" />
//       </div>
//     </section>
//   );
// };
//
// export default Countdown;

// "use client";
//
// import React, { useEffect, useState, useCallback, memo, useMemo } from "react";
// import { motion, useAnimationControls } from "framer-motion";
//
// interface CountdownProps {
//   initialDays: number;
// }
//
// const StaticCard = ({
//   position,
//   unit,
// }: {
//   position: "upper" | "lower";
//   unit: number | string;
// }) => {
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "50%",
//         overflow: "hidden",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: position === "upper" ? "flex-end" : "flex-start",
//         backgroundColor: position === "upper" ? "#12161C" : "#181c22",
//         borderBottom: position === "lower" ? "1px solid #0E1116" : "",
//       }}
//     >
//       <span
//         style={{
//           fontSize: "3rem",
//           fontWeight: "normal",
//           transform: position === "upper" ? "translateY(50%)" : "translateY(-50%)",
//           color: "white",
//         }}
//       >
//         {unit}
//       </span>
//     </div>
//   );
// };
//
// const AnimatedCard = memo(
//   ({
//     current,
//     previous,
//   }: {
//     current: number | string;
//     previous: number | string;
//   }) => {
//     const [displayUnit, setDisplayUnit] = useState(previous);
//     const controls = useAnimationControls();
//
//     useEffect(() => {
//       controls.start({
//         rotateX: [0, -180],
//         transition: { duration: 0.6, ease: "easeInOut" },
//       });
//       setDisplayUnit(previous);
//     }, [previous]);
//
//     return (
//       <motion.div
//         animate={controls}
//         style={{
//           position: "absolute",
//           left: 0,
//           width: "100%",
//           height: "50%",
//           overflow: "hidden",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "flex-end",
//           transformOrigin: "50% 100%",
//           transformStyle: "preserve-3d",
//           backgroundColor: "#12161C",
//           borderBottom: "1px solid #0E1116",
//         }}
//         onAnimationComplete={() => {
//           setDisplayUnit(current);
//           controls.set({ rotateX: 0 });
//         }}
//       >
//         <span
//           style={{
//             fontSize: "3rem",
//             fontWeight: "normal",
//             transform: "translateY(50%)",
//             color: "white",
//           }}
//         >
//           {displayUnit}
//         </span>
//       </motion.div>
//     );
//   }
// );
//
// const AnimatedCardBottom = ({
//   unit,
// }: {
//   unit: number | string;
// }) => {
//   const [displayUnit, setDisplayUnit] = useState(unit);
//   const controls = useAnimationControls();
//
//   useEffect(() => {
//     controls.start({
//       rotateX: [180, 0],
//       transition: { duration: 0.6, ease: "easeInOut" },
//     });
//     setDisplayUnit(unit);
//   }, [unit]);
//
//   return (
//     <motion.div
//       animate={controls}
//       style={{
//         position: "absolute",
//         left: 0,
//         width: "100%",
//         height: "50%",
//         overflow: "hidden",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         transformOrigin: "50% 0%",
//         transformStyle: "preserve-3d",
//         backgroundColor: "#181c22",
//         borderTop: "1px solid #0E1116",
//       }}
//     >
//       <span
//         style={{
//           fontSize: "3rem",
//           fontWeight: "normal",
//           transform: "translateY(-50%)",
//           color: "white",
//         }}
//       >
//         {displayUnit}
//       </span>
//     </motion.div>
//   );
// };
//
// const FlipContainer = ({
//   number,
//   title,
// }: {
//   number: number;
//   title: "days" | "hours" | "mins" | "secs";
// }) => {
//   const { current, previous } = useMemo(() => {
//     const currentDigit = number;
//     const previousDigit = number + 1;
//
//     const current =
//       currentDigit < 10
//         ? `0${currentDigit}`
//         : (title === "secs" || title === "mins") && currentDigit === 60
//           ? "00"
//           : currentDigit;
//     const previous =
//       previousDigit < 10
//         ? `0${previousDigit}`
//         : (title === "secs" || title === "mins") && previousDigit === 60
//           ? "00"
//           : previousDigit;
//
//     return { current, previous };
//   }, [number]);
//
//   return (
//     <div style={{ boxShadow: "0px 10px 10px -10px black", borderRadius: "6px" }}>
//       <div
//         style={{
//           display: "block",
//           position: "relative",
//           width: "140px",
//           height: "120px",
//           backgroundColor: "#12161C",
//           borderRadius: "6px",
//           perspective: "300px",
//           perspectiveOrigin: "50% 50%",
//         }}
//       >
//         <StaticCard position="upper" unit={current} />
//         <StaticCard position="lower" unit={previous} />
//         <AnimatedCard current={current} previous={previous} />
//         <AnimatedCardBottom unit={current} />
//       </div>
//       <div
//         style={{
//           padding: "10px 0",
//           backgroundColor: "#1d2127",
//           textAlign: "center",
//         }}
//       >
//         <span
//           style={{
//             fontSize: "0.75rem",
//             fontWeight: "lighter",
//             textTransform: "uppercase",
//             color: "white",
//           }}
//         >
//           {title}
//         </span>
//       </div>
//     </div>
//   );
// };
//
// const Countdown: React.FC<CountdownProps> = ({ initialDays }) => {
//   const calculateNewTargetDate = useCallback(() => {
//     const now = new Date();
//     now.setDate(now.getDate() + initialDays);
//     return now;
//   }, [initialDays]);
//
//   const getStoredTargetDate = () => {
//     if (typeof window !== "undefined") {
//       const storedDate = localStorage.getItem("targetDate");
//       return storedDate ? new Date(storedDate) : null;
//     }
//     return null;
//   };
//
//   const [targetDate, setTargetDate] = useState<Date | null>(null);
//
//   useEffect(() => {
//     const storedDate = getStoredTargetDate();
//     if (storedDate) {
//       setTargetDate(storedDate);
//     } else {
//       const newTargetDate = calculateNewTargetDate();
//       setTargetDate(newTargetDate);
//       if (typeof window !== "undefined") {
//         localStorage.setItem("targetDate", newTargetDate.toString());
//       }
//     }
//   }, [calculateNewTargetDate]);
//
//   const calculateTimeLeft = (target: Date) => {
//     const now = new Date().getTime();
//     const timeRemaining = target.getTime() - now;
//
//     const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
//     const hours = Math.floor(
//       (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     const minutes = Math.floor(
//       (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
//     );
//     const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
//
//     return {
//       days: days.toString().padStart(2, "0"),
//       hours: hours.toString().padStart(2, "0"),
//       minutes: minutes.toString().padStart(2, "0"),
//       seconds: seconds.toString().padStart(2, "0"),
//     };
//   };
//
//   const [timeLeft, setTimeLeft] = useState<{
//     days: string;
//     hours: string;
//     minutes: string;
//     seconds: string;
//   }>({
//     days: "00",
//     hours: "00",
//     minutes: "00",
//     seconds: "00",
//   });
//
//   useEffect(() => {
//     if (targetDate) {
//       setTimeLeft(calculateTimeLeft(targetDate));
//     }
//   }, [targetDate]);
//
//   useEffect(() => {
//     if (!targetDate) return;
//
//     const interval = setInterval(() => {
//       setTimeLeft(calculateTimeLeft(targetDate));
//     }, 1000);
//
//     return () => clearInterval(interval);
//   }, [targetDate]);
//
//   return (
//     <section>
//       <h1 className="uppercase text-lc-white">We&apos;re launching soon</h1>
//       <div className="flex space-x-4 overflow-hidden">
//         <FlipContainer number={parseInt(timeLeft.days)} title="days" />
//         <FlipContainer number={parseInt(timeLeft.hours)} title="hours" />
//         <FlipContainer number={parseInt(timeLeft.minutes)} title="mins" />
//         <FlipContainer number={parseInt(timeLeft.seconds)} title="secs" />
//       </div>
//     </section>
//   );
// };
//
// export default Countdown;
//
