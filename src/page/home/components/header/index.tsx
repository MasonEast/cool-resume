import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { EnhanceLayout } from "../../index";

interface Props {
  setLayouts: (value: React.SetStateAction<EnhanceLayout[]>) => void;
}

export default function Header({ setLayouts }: Props) {
  const handleAddBlock = () => {
    // setLayouts((layouts) => [
    //   ...layouts,
    //   { i: String(layouts.length), x: 0, y: 0, w: 3, h: 2 },
    // ]);
  };

  const menu = (
    <Menu
      onClick={handleAddBlock}
      items={[
        {
          label: "普通文本",
          key: "1",
        },
        {
          label: <h1>一级标题</h1>,
          key: "2",
        },
        {
          label: <h2>二级标题</h2>,
          key: "3",
        },
        {
          label: <h3>三级标题</h3>,
          key: "4",
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
    </header>
  );
}
