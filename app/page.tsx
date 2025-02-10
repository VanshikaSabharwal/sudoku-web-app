import SudokuBoard from "../app/components/SudokuBoard";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="flex justify-center flex-col items-center min-h-screen bg-gray-100">
      <SudokuBoard />
      <Footer />
    </main>
  );
}

