"use client";

import { Language, languages } from "@/Utils/language";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/Redux/languageSlice";
import { useAppSelector } from "@/Redux/hook";
import Link from "next/link";

const NavTop = () => {
  const dispatch = useDispatch();
  // const { t, i18n } = useTranslation();
  const currentLanguage = useAppSelector(
    (state) => state.language.selectedLanguage
  );

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (language: Language) => {
    dispatch(setLanguage(language));
    // i18n.changeLanguage(language.code.substring(0, 2));
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsLanguageDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   const langCode = currentLanguage.code.substring(0, 2);
  //   if (i18n.language !== langCode) {
  //     i18n.changeLanguage(langCode);
  //   }
  // }, [currentLanguage.code, i18n]);

  const getLangShort = (code: string) => {
    switch (code) {
      case "en_US":
        return "EN";
      case "vi_VN":
        return "VI";
      case "zh_CN":
        return "CN";
      default:
        return "EN";
    }
  };

  return (
    <div className="bg-gray-900 text-white text-xs py-2">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center md:justify-between items-center">
        <div className="mb-2 md:mb-0">discountMessage</div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">careers</span>
          <Link href="/Blog" className="hidden sm:inline">
            Blog
          </Link>
          <span className="hidden sm:inline">buyerProtection</span>
          <div className="relative">
            <button
              className="flex items-center space-x-1 focus:outline-none"
              onClick={toggleLanguageDropdown}
            >
              <Image
                src={currentLanguage.icon}
                width={20}
                height={15}
                alt={currentLanguage.name}
                className="rounded-sm"
              />
              <span>{getLangShort(currentLanguage.code)}</span>
            </button>
            {isLanguageDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-md z-10"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex items-center space-x-2"
                    onClick={() => handleLanguageChange(lang)}
                  >
                    <Image
                      src={lang.icon}
                      width={20}
                      height={15}
                      alt={lang.name}
                      className="rounded-sm"
                    />
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTop;
