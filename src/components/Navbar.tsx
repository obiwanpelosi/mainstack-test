import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdAnalytics,
  MdOutlineAnalytics,
  MdOutlineCardGiftcard,
  MdOutlineChat,
  MdOutlineSwitchAccount,
} from "react-icons/md";
import { GoBug, GoHome, GoHomeFill } from "react-icons/go";
import { GrAppsRounded } from "react-icons/gr";
import { PiNoteLight, PiUsersLight } from "react-icons/pi";
import { FaMoneyBills } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import mainstackLogo from "../assets/logo.svg";
import appsIcon from "../assets/apps-icon.svg";
import { useGetUserQuery } from "@/redux/user/user.service";
const Links = [
  {
    path: "/",
    label: "Home",
    icon: <GoHome className="w-5 h-5" />,
    activeIcon: <GoHomeFill className="w-5 h-5 text-white" />,
    type: "link",
    disabled: true,
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: <MdOutlineAnalytics className="w-5 h-5" />,
    activeIcon: <MdAnalytics className="w-5 h-5 text-white" />,
    type: "link",
    disabled: true,
  },
  {
    path: "",
    label: "Revenue",
    icon: <FaMoneyBills className="w-5 h-5" />,
    activeIcon: <FaMoneyBills className="w-5 h-5 text-white" />,
    type: "link",
    disabled: false,
  },
  {
    path: "/path",
    label: "CRM",
    icon: <PiUsersLight className="w-5 h-5" />,
    activeIcon: <PiUsersLight className="w-5 h-5 text-white" />,
    type: "link",
    disabled: true,
  },
  {
    path: "/apps",
    label: "Apps",
    icon: <img src={appsIcon} className="w-5 h-5" />,
    activeIcon: <img src={appsIcon} className="w-5 h-5" />,
    type: "dialogue",
    disabled: true,
  },
];
const Navigation = () => {
  const location = useLocation();
  const activeRoutesArray = useMemo(() => {
    return location.pathname.split("/");
  }, [location]);

  return (
    <nav className="hidden lg:block">
      <div className="flex items-center gap-2">
        {Links.map((link, index) => {
          const isActive = activeRoutesArray.includes(link.path);

          return (
            <Link
              key={index}
              to={link.path}
              className={`flex items-center text-base text-gray-400 gap-1 py-1 px-4 rounded-full transition-colors duration-200 
            ${isActive ? "text-white bg-black" : "bg-white text-[#56616B]"}
            ${
              link.disabled
                ? "pointer-events-none"
                : "hover:text-white! hover:bg-black!"
            }`}
              onClick={(e) => link.disabled && e.preventDefault()}
            >
              {isActive ? link.activeIcon : link.icon}
              <span className="font-semibold">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
const Navbar = () => {
  const { data } = useGetUserQuery(null);
  const [isOpen, setOpen] = useState(false);
  function toggleOpen() {
    setOpen((prev) => !prev);
  }
  return (
    <header className="flex bg-white px-4 fixed top-0 pt-2 z-10 left-0mx-auto w-full">
      <div className="flex bg-white rounded-full shadow-lg h-[64px] px-4 w-[95%] mx-auto items-center justify-between">
        <div>
          <img src={mainstackLogo} alt="mainstack-logo" />
        </div>
        <Navigation />
        <div className="flex items-center gap-4">
          <AiOutlineBell className="w-5 h-5 text-gray-400" />
          <MdOutlineChat className="w-5 h-5 text-gray-400" />
          <button
            className="flex items-center gap-2 bg-gray-50 rounded-full p-1 h-[40px]"
            type="button"
            onClick={toggleOpen}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-[#5C6670] to-[#131316] text-sm">
              {data
                ? `${data.first_name[0].toUpperCase()}${data.last_name[0].toUpperCase()}`
                : null}
            </div>
            <div className="pr-2 relative cursor-pointer">
              <RxHamburgerMenu className="w-5 h-5 text-gray-400" />
              {isOpen && (
                <div className="absolute top-8 -right-4 mt-2 border border-[#D0D5DD] bg-[#FFF] shadow-md! rounded-xl z-50 transition-all duration-300 ease-out p-4 w-64 lg:w-80 space-y-6 transform origin-top-right scale-100 opacity-100 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-[#5C6670] to-[#131316] text-sm">
                      {data
                        ? `${data.first_name[0].toUpperCase()}${data.last_name[0].toUpperCase()}`
                        : null}
                    </div>
                    <div>
                      <p className="text-sm text-left font-bold">
                        {data ? `${data.first_name}${data.last_name}` : null}
                      </p>
                      <p className="text-xs text-left">{data?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <IoSettingsOutline className="text-sm" />
                      <p className="text-sm font-semibold">Settings</p>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <PiNoteLight className="text-sm" />
                      <p className="text-sm font-semibold">Purchase History</p>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <MdOutlineCardGiftcard className="text-sm" />
                      <p className="text-sm font-semibold">Refer and Earn</p>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <GrAppsRounded className="text-sm" />
                      <p className="text-sm font-semibold">Integrations</p>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <GoBug className="text-sm" />
                      <p className="text-sm font-semibold">Report Bug</p>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <MdOutlineSwitchAccount className="text-sm" />
                      <p className="text-sm font-semibold">Switch Account</p>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                      <IoLogOutOutline className="text-sm" />
                      <p className="text-sm font-semibold">Sign Out</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
