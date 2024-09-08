import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-bgPrimary  min-h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>

        <footer className="mt-auto">footer</footer>
      </div>
    </>
  );
}

export default App;
