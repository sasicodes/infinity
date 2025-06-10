import { type VariantProps, cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ButtonHTMLAttributes, forwardRef, memo } from "react";
import { tw } from "./tw";

const buttonVariants = cva(
  "flex items-center justify-center transition-all font-medium relative disabled:cursor-not-allowed overflow-hidden rounded-full text-sm shrink-0",
  {
    variants: {
      variant: {
        default: "bg-indigo-100 text-white text-indigo-500 disabled:opacity-80",
        secondary:
          "bg-neutral-200/50 hover:bg-neutral-200/80 disabled:bg-neutral-50",
        outline: "border-divider border disabled:opacity-80 hover:shadow-inner",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-600/60",
        ghost: "bg-transparent hover:bg-neutral-200/50 disabled:bg-neutral-50"
      },
      size: {
        default: "h-8 px-4 py-2",
        xs: "h-6 px-2.5 text-xs",
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-4",
        lg: "h-10 px-8",
        xl: "h-12 px-8",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, loading, disabled, ...props }, ref) => {
      return (
        <button
          ref={ref}
          className={tw(buttonVariants({ variant, size, className }))}
          disabled={loading || disabled}
          {...props}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              className="inline-flex flex-1 items-center justify-center space-x-1 whitespace-nowrap"
              key={loading ? "loading" : "idle"}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={loading || disabled ? {} : { scale: 0.95 }}
              exit={{ opacity: 0, y: 25, transition: { duration: 0.1 } }}
            >
              {loading ? <Loader className="size-4" /> : props.children}
            </motion.span>
          </AnimatePresence>
        </button>
      );
    }
  )
);

export { Button };
