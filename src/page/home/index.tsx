import React, { ReactNode, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import GridLayout, { Layout } from "react-grid-layout";

import { BLOCK_STYLE, NO_Edit_TYPE } from "./constants";
import { LAYOUT, BLOCK_DATA } from "./tpl";
import Header from "./components/header";

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

  const handleLayoutChange = (layouts: Layout[]) => {
    setLayouts(layouts);
  };

  const handleBlockChange = (
    key: string,
    e: React.FocusEvent<HTMLParagraphElement>
  ) => {
    const node = e.target as HTMLElement;
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

  const isContentEditable = (key: string) => {
    return !NO_Edit_TYPE.includes(key.split("-")[0]);
  };

  return (
    <div className="App">
      <Header addBlock={addBlock} />
      <div className="flex justify-between bg-gray-300 py-20">
        {/* edit */}
        <div className="w-6/12">
          <div className="layout mx-1 my-4 layout-box bg-white p-2">
            <GridLayout
              layout={layouts}
              cols={24}
              width={630}
              margin={[5, 2]}
              rowHeight={20}
              onLayoutChange={handleLayoutChange}
            >
              {layouts.map((item) => (
                <div key={item.i}>
                  <div
                    onBlur={(e) => handleBlockChange(item.i, e)}
                    contentEditable={isContentEditable(item.i)}
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
        </div>
        {/* show */}
        <div className="w-6/12">
          <div className="layout mx-1 my-4 layout-box bg-white p-2">
            <div id="preview-box">
              <GridLayout
                layout={layouts}
                width={630}
                cols={24}
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
      </div>
    </div>
  );
}

export default App;
