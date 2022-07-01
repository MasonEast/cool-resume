import React, { ReactNode, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import GridLayout, {
  Layout,
  Responsive,
  WidthProvider,
} from "react-grid-layout";

import { BLOCK_STYLE, AVATAR } from "./constants";
import { LAYOUT, BLOCK_DATA } from "./tpl";
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
    const key = layout.i || String(Date.now() + layouts.length);
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
      text: <p style={{ backgroundColor: "#ccc", height: "100%" }} />,
      layout: {
        i: `divider-${Date.now()}`,
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

  const handleDeleteBlock = (key: string) => {
    const i = layouts.findIndex((item) => item.i === key);
    setLayouts((pre) => {
      const arr = [...pre];
      arr.splice(i, 1);
      return arr;
    });
    setBlockData((pre) => {
      const data = { ...pre };
      delete data[key];
      return data;
    });
  };
  console.log(JSON.stringify(layouts), JSON.stringify(blockData), "---ab");

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
      <div className="flex justify-between bg-gray-300">
        {/* edit */}
        <div className="w-6/12">
          <GridLayout
            className="layout mx-1 my-4 layout-box bg-white"
            layout={layouts}
            // cols={24}
            width={650}
            margin={[5, 2]}
            rowHeight={20}
            onLayoutChange={handleLayoutChange}
          >
            {layouts.map((item) => (
              <div key={item.i}>
                <div
                  onBlur={(e) => handleBlockChange(item.i, e)}
                  contentEditable={!item.i.includes("divider")}
                  suppressContentEditableWarning
                  className="bg-gray-200 h-full leading-normal p-2"
                  style={BLOCK_STYLE[blockData[item.i]?.type || ""]}
                >
                  {blockData[item.i]?.text}
                </div>
                <CloseOutlined
                  className="absolute top-0 right-0 text-xs cursor-pointer"
                  onClick={() => handleDeleteBlock(item.i)}
                />
              </div>
            ))}
          </GridLayout>
        </div>
        {/* show */}
        <div className="w-6/12" id="preview-box">
          <GridLayout
            className="layout mx-1 my-4 layout-box bg-white"
            layout={layouts}
            width={650}
            margin={[5, 2]}
            rowHeight={20}
            isDraggable={false}
            isResizable={false}
          >
            {layouts.map((item) => (
              <div key={item.i}>
                <div
                  className=" h-full leading-normal p-2"
                  style={BLOCK_STYLE[blockData[item.i]?.type || ""]}
                >
                  {blockData[item.i]?.text}
                </div>
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  );
}

export default App;
