import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Data } from "../../index";

import { TYPE } from "../../constants";
interface Props {
  addBlock: ({ type, text, layout }: Data) => void;
}

export default function Header({ addBlock }: Props) {
  const handleAddBlock = (e: any) => {
    const type = e.key;
    addBlock({
      type,
      layout: {
        x: 0,
        y: 0,
        w: 3,
        h: 2,
      },
    });
  };

  const handleExport = () => {};

  const menu = (
    <Menu
      onClick={handleAddBlock}
      items={[
        {
          label: "普通文本",
          key: TYPE.P,
        },
        {
          label: <h1>一级标题</h1>,
          key: TYPE.H1,
        },
        {
          label: <h2>二级标题</h2>,
          key: TYPE.H2,
        },
        {
          label: <h3>三级标题</h3>,
          key: TYPE.H3,
        },
      ]}
    />
  );

  return (
    <header>
      <Dropdown overlay={menu}>
        <Button>
          <Space>
            添加区块
            <DownOutlined className="leading-4" />
          </Space>
        </Button>
      </Dropdown>
      <Button onClick={handleExport}>导出</Button>
    </header>
  );
}
