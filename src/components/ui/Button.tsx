import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineLoading } from "react-icons/ai";
import { Button as HeadlessButton } from "@headlessui/react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover border-primary",
  secondary: "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-50",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 border-transparent",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-7 py-3 text-lg",
};

const baseStyles =
  "inline-flex items-center justify-center font-semibold border rounded-full transition-all duration-150 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

type VariantType = keyof typeof variants;
type SizeType = keyof typeof sizes;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: VariantType;
  size?: SizeType;
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const classes = twMerge(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <HeadlessButton className={classes} disabled={isLoading} {...props}>
      {isLoading ? (
        <AiOutlineLoading className="animate-spin mr-2 h-5 w-5" />
      ) : (
        children
      )}
    </HeadlessButton>
  );
};
