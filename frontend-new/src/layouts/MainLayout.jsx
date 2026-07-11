import { Outlet } from "react-router-dom";
import Footer from "../modules/shared/components/Footer";
import Navbar from "../modules/shared/components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-7">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;