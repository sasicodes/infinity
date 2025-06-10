import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import { tw } from "./tw";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuSubTrigger = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={tw(
      "flex cursor-default items-center rounded-lg px-2.5 py-1.5 text-sm outline-none focus:bg-gray-200 data-[state=open]:bg-gray-200",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-3.5" />
  </DropdownMenuPrimitive.SubTrigger>
));

const DropdownMenuSubContent = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, sideOffset = 5, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    sideOffset={sideOffset}
    className={tw(
      "data-[side=top]:origin-bottom-left",
      "data-[side=bottom]:origin-top-right",
      "data-[side=left]:origin-top-left",
      "data-[side=right]:origin-top-right",
      "data-[state=closed]:animate-close data-[state=open]:animate-open",
      "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-divider bg-[#171717] p-1 shadow-overlay",
      className
    )}
    {...props}
  />
));

const DropdownMenuContent = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 1, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={tw(
        "data-[side=top]:origin-bottom-left",
        "data-[side=bottom]:origin-top-right",
        "data-[side=left]:origin-top-left",
        "data-[side=right]:origin-top-right",
        "data-[state=closed]:animate-close data-[state=open]:animate-open",
        "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-divider bg-[#171717] p-1 shadow-overlay",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

const DropdownMenuItem = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    asDialogTrigger?: boolean;
  }
>(({ className, inset, asDialogTrigger, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={tw(
      "relative flex cursor-pointer items-center rounded-md px-2.5 py-1.5 text-[#e8e8e8] focus:bg-[#ffffff1a] focus:outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...(asDialogTrigger && { onSelect: (evt) => evt.preventDefault() })}
    {...props}
  />
));

const DropdownMenuLabel = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={tw(
      "px-2 py-1.5 font-medium text-gray-500 text-xs",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));

const DropdownMenuSeparator = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={tw("my-1 h-px bg-[#ffffff0d]", className)}
    {...props}
  />
));

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
};
