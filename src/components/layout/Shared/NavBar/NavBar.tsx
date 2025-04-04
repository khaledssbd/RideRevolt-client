import ModeToggle from '@/components/mode-toggle';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProfileDropdown from '../../ProfileDropdown';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/features/auth/authSlice';
import { Tooltip } from 'react-tooltip';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const handleLogin = () => {
    navigate('/login');
  };

  const navItems = [
    {
      name: 'All Products',
      link: '/all-products',
    },

    {
      name: 'Dashboard',
      link: '/dashboard',
    },

    {
      name: 'About Us',
      link: '/about-us',
    },
  ];

  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-transparent/80 backdrop-blur">
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative h-16 md:h-20">
          {/* <!-- Menu & Small Device for Small Device--> */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Drawer>
              {/* <!-- Menu for Small Device--> */}
              <DrawerTrigger asChild>
                <Button
                  variant="default"
                  className="bg-transparent text-black dark:text-amber-500"
                >
                  <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="text-black dark:text-amber-500">
                <div className="mx-auto w-full">
                  <DrawerHeader>
                    <DrawerTitle className="sr-only">Menu</DrawerTitle>
                    <DrawerDescription className="sr-only">
                      Nav Items.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex justify-end items-start mr-2">
                    <DrawerClose asChild>
                      <Button variant="outline">
                        <svg
                          className="block size-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    </DrawerClose>
                  </div>

                  <div className="p-4">
                    {/* NavItems for Small Device */}
                    <div className="pb-3 flex flex-col justify-center items-end gap-2">
                      {navItems.map(item => (
                        <NavLink
                          key={item.name}
                          to={item.link}
                          className={({ isActive }) =>
                            isActive
                              ? 'rounded-md border border-black text-amber-500 dark:text-white  dark:border-amber-500 px-3 py-2 text-sm font-medium'
                              : 'rounded-md border border-transparent px-3 py-2 text-sm font-medium hover:bg-amber-500 hover:text-black'
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* NavItems for Large Device */}
          <div className="flex justify-between items-center h-full ml-8">
            {/* logo */}
            <div className="flex shrink-0 items-center">
              <Link to="/" className="">
                <Button variant="link" className="cursor-pointer">
                  <img
                    className="w-20 md:w-28 rounded-lg mt-5"
                    src="/RideRevolt.png"
                    alt="RideRevolt"
                    data-tooltip-id="RideRevolt"
                    data-tooltip-content="RideRevolt"
                    data-tooltip-place="right"
                  />
                  <Tooltip id="RideRevolt" />
                </Button>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6 text-black dark:text-amber-500">
              <div className="flex space-x-2 md:space-x-4">
                {navItems.map(item => (
                  <NavLink
                    key={item.name}
                    to={item.link}
                    className={({ isActive }) =>
                      isActive
                        ? 'rounded-md border-2 dark:border border-yellow-500 dark:border-white px-2 py-2 text-sm md:text-base font-medium'
                        : 'px-2 py-2 text-sm md:text-base font-medium hover:bg-amber-500 rounded-md hover:text-black'
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-6">
              <ModeToggle />

              {/* <!-- Profile dropdown --> */}
              {user ? (
                <ProfileDropdown user={user} />
              ) : (
                <Button
                  variant="default"
                  onClick={handleLogin}
                  className="block px-4 py-2 text-sm font-medium text-black mx-auto"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
