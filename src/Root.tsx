import { Outlet, ScrollRestoration } from 'react-router-dom';
import Aos from 'aos';
import { useEffect } from 'react';
import Navbar from './components/layout/Shared/NavBar/NavBar';
import Footer from './components/layout/Shared/Footer/Footer';

// AOS.init({
//   duration: 1000,
// });

const Root = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto text-center text-black dark:text-amber-500 font-fira">
        <ScrollRestoration />
        <Navbar />
        <div className="min-h-[calc(100vh-490px)] mt-20">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Root;
