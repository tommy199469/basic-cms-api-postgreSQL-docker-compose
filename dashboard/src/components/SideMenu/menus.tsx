import { HomeOutlined, SettingFilled } from "@ant-design/icons";

export interface IRoute {
  path: string;
  icon: JSX.Element;
  name: string;
}

const routes: IRoute[] = [
  {
    path: "/result-form",
    icon: <SettingFilled />,
    name: "Create Scan Result",
  },
  {
    path: "/",
    icon: <HomeOutlined />,
    name: "Scan Result List",
  },
];

export { routes };
