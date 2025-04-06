import React, { useState, useRef, useEffect } from "react";
import { Checkbox } from "@headlessui/react";
import { PiCaretDown } from "react-icons/pi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface OptionType {
  label: string;
  value: string;
}

interface RadioDropdownProps {
  options: OptionType[];
  onChange?: (selectedOptions: OptionType[]) => void;
  defaultSelectedOptions?: OptionType[];
  className?: string;
}
const RadioDropdown: React.FC<RadioDropdownProps> = ({
  options,
  onChange,
  defaultSelectedOptions = [],
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>(
    defaultSelectedOptions
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOptions(defaultSelectedOptions);
  }, [defaultSelectedOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: OptionType, e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    let newSelectedOptions: OptionType[];

    const isSelected = selectedOptions.some(
      (item) => item.value === option.value
    );

    if (isSelected) {
      newSelectedOptions = selectedOptions.filter(
        (item) => item.value !== option.value
      );
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(newSelectedOptions);

    if (onChange) {
      onChange(newSelectedOptions);
    }
  };

  const isOptionSelected = (option: OptionType): boolean => {
    return selectedOptions.some((item) => item.value === option.value);
  };

  return (
    <div className={twMerge("w-full max-w-md", className)} ref={dropdownRef}>
      <div className="relative">
        <button
          data-testid="radio-dropdown-button"
          onClick={toggleDropdown}
          className={`w-full flex justify-between items-center px-4 py-3 transition-colors ${
            isOpen ? "bg-white" : "bg-gray-100"
          } border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
        >
          <span className="w-[calc(100%-1.25rem)] text-left truncate whitespace-nowrap overflow-ellipsis">
            {selectedOptions.map((option) => option.label).join(", ")}
          </span>
          <PiCaretDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer space-x-2"
                onClick={(e) => handleOptionClick(option, e)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Checkbox
                  data-testid="checkbox-input"
                  checked={isOptionSelected(option)}
                  className="group size-5 rounded-md bg-white p-1 ring-1 ring-gray-400 ring-inset data-[checked]:bg-black data-[checked]:ring-black"
                >
                  <IoCheckmarkSharp className="hidden size-3 text-white group-data-[checked]:block" />
                </Checkbox>

                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioDropdown;
