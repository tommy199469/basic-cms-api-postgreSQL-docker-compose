import React from "react";
import { Menu, Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "./menus";

interface IMobile {
  closeDrawer: () => void;
  visible: boolean;
}

const Mobile = ({ closeDrawer, visible }: IMobile) => {
  const router = useRouter();

  return (
    <Drawer
      title="Menu"
      placement="left"
      closable={true}
      onClose={closeDrawer}
      visible={visible}
      bodyStyle={{ padding: 0 }}
      className="md:hidden"
    >
      <Menu
        mode="inline"
        selectedKeys={[router.pathname]}
        className="h-full border-r-0"
        onClick={closeDrawer}
      >
        {routes.map((route) => (
          <Menu.Item
            key={route.path}
            icon={route.icon}
            className={
              router.pathname === route.path
                ? "bg-blue-500 text-white"
                : "text-black"
            }
          >
            <Link href={route.path} passHref>
              {route.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Drawer>
  );
};

export default Mobile;
