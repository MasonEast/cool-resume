import React, { ReactNode, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";

import Header from "./components/header";

const ResponsiveGridLayout = WidthProvider(Responsive);

export type Data = {
  text?: ReactNode;
  type?: string;
  layout?: Partial<Layout>;
};
export interface EnhanceLayout extends Layout {
  data: Data;
}

const LAYOUT = [
  {
    i: "a",
    x: 0,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    i: "b",
    x: 0,
    y: 1,
    w: 3,
    h: 2,
  },
  {
    i: "c",
    x: 0,
    y: 2,
    w: 3,
    h: 2,
  },
  {
    i: "d",
    x: 0,
    y: 2,
    w: 3,
    h: 2,
  },
];

const BLOCK_DATA = {
  a: {
    text: "张三丰/男/1788",
    type: "p",
  },
  b: {
    text: "武林宗师大学/太极拳系",
    type: "p",
  },
  c: {
    text: "工作年限：288年",
    type: "p",
  },
  d: {
    text: "联系方式：zhangsanfen@gmail.com | xxxxxxxxxxxx",
    type: "p",
  },
};

const AVATAR = "avatar";

export const TYPE = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  IMG: "img",
  P: "p",
};

const BLOCK_STYLE: Record<string, React.CSSProperties> = {
  h1: {
    fontSize: "2rem",
    fontWeight: "bold",
    lineHeight: "1.5rem",
  },
  h2: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    lineHeight: "1.5rem",
  },
  h3: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    lineHeight: "1.5rem",
  },
  p: {
    lineHeight: "1.5rem",
  },
};

function App() {
  const [layouts, setLayouts] = useState<Layout[]>(LAYOUT);
  const [blockData, setBlockData] = useState<Record<string, Data>>(BLOCK_DATA);

  const addBlock = ({
    type = "p",
    text = "",
    layout = {
      x: 0,
      y: 0,
      w: 6,
      h: 1,
    },
  }: Data) => {
    const key = layout.i || String(layouts.length);
    console.log(key, "key");

    if (layout) {
      layout.i = key;
      setLayouts([...layouts, layout as Layout]);
    }

    setBlockData({
      ...blockData,
      [key]: {
        type,
        text,
      },
    });
  };

  const handleAddDvider = () => {
    addBlock({
      text: <p style={{ backgroundColor: "black", height: "100%" }} />,
      layout: {
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
      if (!blockData[AVATAR]) {
        setLayouts([
          ...layouts,
          {
            i: AVATAR,
            x: 0,
            y: 0,
            w: 2,
            h: 6,
          },
        ]);
      }

      setBlockData({
        ...blockData,
        [AVATAR]: {
          type: "img",
          text: (
            <img className="h-full" src={e.target?.result as string} alt="" />
          ),
        },
      });
    };
  };

  const handleLayoutChange = (layouts: Layout[]) => {
    setLayouts(layouts);
  };

  const handleBlockChange = (
    key: string,
    e: React.FocusEvent<HTMLParagraphElement>
  ) => {
    const node = e.target as HTMLElement;
    if (key === AVATAR) return;
    setBlockData((pre) => {
      const data = { ...pre };
      data[key].text = node.innerText;
      return data;
    });
  };

  return (
    <div className="App">
      <Header addBlock={addBlock} />
      <header className="bg-gray-400">
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
      <div className="flex justify-between">
        {/* 用来编辑 */}
        <ResponsiveGridLayout
          className="layout w-6/12"
          layouts={{ lg: layouts }}
          margin={[10, 2]}
          rowHeight={20}
          onLayoutChange={handleLayoutChange}
        >
          {layouts.map((item) => (
            <div key={item.i}>
              <div
                onBlur={(e) => handleBlockChange(item.i, e)}
                contentEditable
                suppressContentEditableWarning
                className="bg-gray-200 h-full leading-normal p-2"
                style={BLOCK_STYLE[blockData[item.i].type || ""]}
              >
                {blockData[item.i].text}
              </div>
              <CloseOutlined className="absolute top-0 right-0" />
            </div>
          ))}
        </ResponsiveGridLayout>
        {/* 用来展示 */}
        <ResponsiveGridLayout
          className="layout w-6/12"
          layouts={{ lg: layouts }}
          margin={[10, 2]}
          rowHeight={20}
          isDraggable={false}
          isResizable={false}
        >
          {layouts.map((item) => (
            <div key={item.i}>
              <div
                className=" h-full leading-normal p-2"
                style={BLOCK_STYLE[blockData[item.i].type || ""]}
              >
                {blockData[item.i].text}
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}

export default App;
