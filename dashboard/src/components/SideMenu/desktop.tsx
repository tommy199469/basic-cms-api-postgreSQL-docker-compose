import React from "react";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "./menus";

function DesktopMenu() {
  const router = useRouter();

  return (
    <div className="hidden md:relative md:block md:h-[95%]">
      <Menu
        mode="inline"
        selectedKeys={[router.pathname]}
        className="h-[80%] !border-r-0"
      >
        {routes.map((route: any) => (
          <Menu.Item
            key={route.path}
            icon={route.icon}
            className={
              router.pathname === route.path
                ? "bg-blue-500 text-white"
                : "text-black"
            }
          >
            <Link href={route.path}>{route.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default DesktopMenu;
