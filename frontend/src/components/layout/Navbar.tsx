import { Lock, LogIn, LogOut, LucideShoppingBasket, Menu, UserRoundPlus, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import SvgLogo from "../svg/SVGLOGO";
import { useCartStore } from "../../store/useCartStore";

const Navbar: React.FC = (): React.JSX.Element => {
    const { user, logout } = useAuthStore();
    const { cart } = useCartStore();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    async function handleLogout() {
        await logout();
        toast.success('User logged out successfully');
    }
    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }
    const isAdmin: boolean = user?.role === 'admin';
    return (
        <>
        {/* Navbar */}
        <div className="flex justify-between items-center w-full h-[60px] px-[1.5rem] pt-[5px] bg-gray-900 border-b border-emerald-800">
            {/* Logo */}
            <h1 className="text-xl text-emerald-400 font-bold cursor-pointer">
                <Link to="/" className="flex items-center"><SvgLogo /></Link>
            </h1>
            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 justify-end">
            <ul className="space-x-4 capitalize text-center flex items-center">
                <li className="text-gray-300 cursor-pointer hover:text-white transition-all duration-200">
                <Link to="/" >Home</Link>
                </li>
                {user ? (
                    <>
                        <li className="text-gray-300 cursor-pointer hover:text-white transition-all duration-200">
                        <Link to="/cart" className="flex gap-1 relative">
                            <LucideShoppingBasket /> cart <span className={` ${cart.length > 0 ? 'block' : 'hidden'} absolute -left-[14px] -top-[10px] bg-emerald-700 rounded-full text-white text-sm w-5 h-5 flex justify-center items-center`}>{cart.length}</span>
                        </Link>
                        </li>
                        {isAdmin && (
                        <li>
                            <Link
                            to="/secret-dashboard"
                            className="relative flex items-center bg-emerald-700 hover:bg-emerald-600 transition-colors duration-300 delay-100 cursor-pointer text-white px-3 py-2 rounded"
                            >
                            <Lock className=' mr-1' size={18} />
                            Dashboard
                            </Link>
                        </li>
                        )}
                        <li onClick={handleLogout}>
                            <button title="Logout" className="text items-center bg-gray-700 hover:bg-gray-600 cursor-pointer px-3 py-2 rounded-md transition-all duration-300">
                                <LogOut />
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                            to="/signup"
                            className="relative flex items-center bg-emerald-700 hover:bg-emerald-600 transition-colors duration-300 delay-100 cursor-pointer text-white px-3 py-2 rounded text-sm"
                            >
                            <UserRoundPlus className=' mr-1' size={18} />
                            Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link
                            to="/login"
                            className="relative text-sm  flex items-center bg-gray-700 hover:bg-gray-600 transition-colors duration-300 delay-100 cursor-pointer text-white px-3 py-2 rounded"
                            >
                            <LogIn className=' mr-1' size={18} />
                            Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            </div>

            {/* Mobile Menu Button (Burger Icon) */}
            <button
            className="md:hidden text-white transition-transform duration-300 hover:scale-110"
            onClick={toggleMenu}
            >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {/* Mobile Menu (Slide Down Animation) */}
        <div
            className={`md:hidden bg-gray-900 border-t border-emerald-800 p-4 transition-transform duration-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 hidden"
            }`}
        >
            <ul className="flex flex-col space-y-3 capitalize">
            {user ? (
                <>
                    <li className="text-gray-300 cursor-pointer hover:text-white transition-all duration-300 text-center">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-gray-300 cursor-pointer hover:text-white transition-all duration-300">
                        <Link to="/cart" className="flex gap-1 justify-center relative">
                            <LucideShoppingBasket /> cart <span className="absolute left-[38%] -top-[13px] bg-emerald-700 rounded-full text-white text-sm w-5 h-5 flex justify-center items-center">{cart.length}</span>
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                        <Link
                            to="/secret-dashboard"
                            className="flex justify-center items-center gap-1 bg-emerald-700 hover:bg-emerald-600 transition-colors duration-300 delay-100 cursor-pointer text-white px-3 py-1 rounded"
                        >
                            <Lock className=' mr-1' size={18} />
                            Dashboard
                        </Link>
                        </li>
                    )}
                    <li onClick={handleLogout}>
                        <button className="flex justify-center items-center bg-gray-700 hover:bg-gray-600 cursor-pointer px-3 py-2 rounded-md w-full transition-all duration-300">
                            <LogOut />
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className="text-gray-300 cursor-pointer hover:text-white transition-all duration-300">
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                            <Link
                            to="/signup"
                            className="relative flex items-center bg-emerald-700 hover:bg-emerald-600 transition-colors duration-300 delay-100 cursor-pointer text-white px-3 py-1 rounded text-sm"
                            >
                            <UserRoundPlus className=' mr-1' size={18} />
                            Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link
                            to="/login"
                            className="relative text-sm  flex items-center bg-gray-700 hover:bg-gray-600 transition-colors duration-300 delay-100 cursor-pointer text-white px-3 py-1 rounded"
                            >
                            <LogIn className=' mr-1' size={18} />
                            Login
                            </Link>
                        </li>
                </>
            ) }
            </ul>
        </div>
        </>
    );
};

export default Navbar;
