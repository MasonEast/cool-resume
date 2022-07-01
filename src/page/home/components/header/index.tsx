import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import html2pdf from "html2pdf.js";
import { Data } from "../../index";

import { TYPE, CONSTANTS } from "../../constants";
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

  const handleAddDvider = () => {
    addBlock({
      text: <p style={{ backgroundColor: "#ccc", height: "100%" }} />,
      layout: {
        i: `${CONSTANTS.DIVIDER}-${Date.now()}`,
        x: 0,
        y: 0,
        w: 6,
        h: 1,
      },
    });
  };

  const handleUploadPicture = () => {
    var reads = new FileReader();
    const input = document.getElementById("uploadImage") as HTMLInputElement;
    const f = input.files?.[0] as File;

    reads.readAsDataURL(f);
    reads.onload = (e) => {
      addBlock({
        type: "img",
        text: (
          <img className="h-full" src={e.target?.result as string} alt="" />
        ),
        layout: {
          i: `${CONSTANTS.AVATAR}-${Date.now()}`,
          x: 0,
          y: 0,
          w: 2,
          h: 6,
        },
      });
    };
  };

  const handleExport = () => {
    const element = document.getElementById("preview-box");

    const opt = {
      margin: 0,
      filename: "个人简历.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, x: -80 },
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "portrait",
        hotfixes: ["px_scaling"],
      },
    };
    html2pdf().set(opt).from(element).save();
  };

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
    <header className="fixed w-full bg-white z-10 p-2 shadow-xl flex justify-around">
      <h3>Cool Resume</h3>
      <Dropdown overlay={menu}>
        <Button>
          <Space>
            添加区块
            <DownOutlined className="leading-4" />
          </Space>
        </Button>
      </Dropdown>
      <Button onClick={handleExport}>导出</Button>
      <button onClick={handleAddDvider}>加横杠</button>
      <button>
        <input
          accept="image/*"
          id="uploadImage"
          onChange={handleUploadPicture}
          type="file"
        />
      </button>
    </header>
  );
}
