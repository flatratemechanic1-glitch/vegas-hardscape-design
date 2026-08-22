"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"

import { cn } from "@/lib/utils"

function NavigationMenu(props: NavigationMenuPrimitive.Root.Props) {
  return <NavigationMenuPrimitive.Root data-slot="navigation-menu" {...props} />
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex items-center gap-5 2xl:gap-7", className)}
      {...props}
    />
  )
}

function NavigationMenuItem(props: NavigationMenuPrimitive.Item.Props) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "text-xs font-medium tracking-[0.1em] whitespace-nowrap uppercase transition-colors hover:text-accent",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium tracking-[0.1em] whitespace-nowrap uppercase transition-colors hover:text-accent data-[popup-open]:text-accent",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-3 transition-transform duration-200 data-[popup-open]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("flex min-w-40 flex-col gap-0.5 p-1.5", className)}
      {...props}
    />
  )
}

function NavigationMenuPortal(props: NavigationMenuPrimitive.Portal.Props) {
  return <NavigationMenuPrimitive.Portal data-slot="navigation-menu-portal" {...props} />
}

function NavigationMenuPositioner({
  className,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Positioner
      data-slot="navigation-menu-positioner"
      sideOffset={10}
      align="start"
      className={cn("z-50 origin-(--transform-origin) outline-none", className)}
      {...props}
    />
  )
}

function NavigationMenuPopup({ className, ...props }: NavigationMenuPrimitive.Popup.Props) {
  return (
    <NavigationMenuPrimitive.Popup
      data-slot="navigation-menu-popup"
      className={cn(
        "h-(--popup-height) w-(--popup-width) rounded-lg border border-border bg-card text-card-foreground shadow-md outline-none transition-[transform,opacity,width,height] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport(props: NavigationMenuPrimitive.Viewport.Props) {
  return <NavigationMenuPrimitive.Viewport data-slot="navigation-menu-viewport" {...props} />
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport,
}
