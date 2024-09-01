// import Header from "../components/Header";
import FlipClock from "@/components/FlipClock";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <main className="flex flex-grow flex-col items-center justify-center p-24">
        {/* <Countdown initialDays={10} /> */}
        <FlipClock initialDays={10} />
      </main>
      <Footer />
    </>
  );
}
