// Importing necessary icons and components from external libraries
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link, 
  useLocation, 
  useNavigate, 
  useSearchParams
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate(); // Hook for programmatically navigating to different routes
  const location = useLocation(); // Hook to access the current route location
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to handle query parameters

  // Function to handle navigation when clicking on menu items
  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters"); // Clear any existing filters from session storage
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id], // Set category filter for non-home, non-product, non-search items
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter)); // Save the current filter to session storage

    // Update the URL or navigate to the appropriate path based on menu item and current filter
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`) // Set the query parameter for category
        )
      : navigate(getCurrentMenuItem.path); // Navigate to the specified path
  }

  // Rendering menu items
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)} // Trigger navigation when the menu item is clicked
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth); // Access the logged-in user's data from the Redux store
  const { cartItems } = useSelector((state) => state.shopCart); // Access the cart items from the Redux store
  const [openCartSheet, setOpenCartSheet] = useState(false); // State to handle the visibility of the cart sheet
  const navigate = useNavigate(); // Hook for programmatically navigating to different routes
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Function to handle user logout
  function handleLogout() {
    dispatch(logoutUser()); // Dispatch the logout action to the Redux store
  }

  // Fetch the cart items when the component mounts or when `dispatch` changes
  useEffect(() => {
    dispatch(fetchCartItems(user?.id)); // Dispatch the action to fetch the cart items based on the user's ID
  }, [dispatch]);

  // Debugging/logging cart items
  console.log(cartItems, "sangam");

  // Rendering the right-side content in the header (cart and user account dropdown)
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)} // Open the cart sheet when the button is clicked
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" /> {/* Cart icon */}
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0} {/* Display the number of items in the cart */}
          </span>
          <span className="sr-only">User cart</span> {/* Screen reader text */}
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet} // Close the cart sheet when the cart wrapper is used
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items // Display the cart items if available
              : []
          }
        />
      </Sheet>

      {/* User dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()} {/* Display the first letter of the user's name */}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" /> {/* Account icon */}
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}> {/* Trigger logout when clicked */}
            <LogOut className="mr-2 h-4 w-4" /> {/* Logout icon */}
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth); // Access the authentication status from the Redux store

  // Rendering the header for the shopping page
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2"> {/* Link to the home page */}
          <HousePlug className="h-6 w-6" /> {/* Home icon */}
          <span className="font-bold text-green-500">Dermadelight</span> {/* Logo text */}
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden"> {/* Toggle button for the menu on mobile */}
              <Menu className="h-6 w-6" /> {/* Menu icon */}
              <span className="sr-only">Toggle header menu</span> {/* Screen reader text */}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems /> {/* Render menu items */}
            <HeaderRightContent /> {/* Render right content (cart and user dropdown) */}
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block"> {/* Menu items visible on larger screens */}
          <MenuItems />
        </div>

        <div className="hidden lg:block"> {/* Right content visible on larger screens */}
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
