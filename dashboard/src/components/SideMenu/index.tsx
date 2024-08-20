import React, { useState } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Mobile from "./mobile";
import Desktop from "./desktop";
function SidebarContent() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <div className="flex items-center justify-between md:bg-white text-white md:h-full md:block p-m">
      {/* Hamburger Menu for Mobile */}
      <Button
        className="md:hidden text-black bg-white"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      {/* Desktop */}
      <Desktop />

      {/* Mobile */}
      <Mobile visible={visible} closeDrawer={closeDrawer} />
    </div>
  );
}

export default SidebarContent;
