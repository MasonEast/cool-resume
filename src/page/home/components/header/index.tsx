import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import html2pdf from "html2pdf.js";
import Logo from "../../../../assets/logo.png";
import { Data } from "../../index";

import { TYPE, CONSTANTS } from "../../constants";
interface Props {
  addBlock: ({ type, text, layout }: Data) => void;
}

export default function Header({ addBlock }: Props) {
  const handleAddBlock = (e: any) => {
    const type = e.key;
    if (type === TYPE.DIVIDER) {
      addBlock({
        text: <p style={{ backgroundColor: "#ccc", height: "100%" }} />,
        layout: {
          i: `${CONSTANTS.DIVIDER}-${Date.now()}`,
          x: 0,
          y: 0,
          w: 24,
          h: 1,
        },
      });
      return;
    }
    addBlock({
      type,
      layout: {
        x: 0,
        y: 0,
        w: 12,
        h: 2,
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
          label: "---分割线---",
          key: TYPE.DIVIDER,
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
    <header className="fixed w-full bg-white z-10 py-2 px-10 shadow-xl flex justify-between">
      <h3 className="w-2/12">
        <img className="h-8" src={Logo} alt="" />
      </h3>

      <div className="w-full">
        <Dropdown overlay={menu}>
          <Button type="text">
            <Space>
              添加区块
              <DownOutlined className="leading-6" />
            </Space>
          </Button>
        </Dropdown>
        <Button type="text">
          <input
            className="hidden"
            accept="image/*"
            id="uploadImage"
            onChange={handleUploadPicture}
            type="file"
          />
          <label htmlFor="uploadImage">上传图片</label>
        </Button>
      </div>
      <Button type="dashed" onClick={handleExport}>
        导出PDF
      </Button>
      {/* <i className="iconfont icon-github"></i> */}
    </header>
  );
}
