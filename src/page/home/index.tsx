import { ReactNode, useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const LAYOUT = [
  { i: "a", x: 0, y: 0, w: 3, h: 2 },
  { i: "b", x: 0, y: 1, w: 3, h: 2 },
  { i: "c", x: 0, y: 2, w: 3, h: 2 },
  { i: "d", x: 0, y: 2, w: 3, h: 2 },
];

const BLOCKDATA = {
  a: "张三丰/男/1788",
  b: "武林宗师大学/太极拳系",
  c: "工作年限：288年",
  d: "联系方式：zhangsanfen@gmail.com | xxxxxxxxxxxx",
};

function App() {
  const [layouts, setLayouts] = useState<Layout[]>(LAYOUT);
  const [blockData, setBlockData] =
    useState<Record<string, ReactNode>>(BLOCKDATA);

  const handleClick = () => {
    setLayouts([
      ...layouts,
      { i: String(layouts.length), x: 0, y: 0, w: 3, h: 2 },
    ]);
  };

  const handleClick2 = () => {
    const key = String(layouts.length);
    setLayouts([...layouts, { i: key, x: 0, y: 0, w: 6, h: 1 }]);
    setBlockData({
      ...blockData,
      [key]: <p style={{ backgroundColor: "black", height: "100%" }} />,
    });
  };

  const handleLayoutChange = (layout: Layout[]) => {
    console.log(layout);
    setLayouts(layout);
  };

  const handleBlockChange = (
    key: string,
    e: React.FocusEvent<HTMLParagraphElement>
  ) => {
    const node = e.target as HTMLElement;
    setBlockData({
      ...blockData,
      [key]: node.innerText,
    });
  };

  return (
    <div className="App">
      <header className="bg-gray-400">
        <button onClick={handleClick}>加区块</button>
        <button onClick={handleClick2}>加横杠</button>
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
              <p
                onBlur={(e) => handleBlockChange(item.i, e)}
                contentEditable
                className="bg-gray-200 h-full leading-normal p-2"
              >
                {blockData[item.i]}
              </p>
            </div>
          ))}
        </ResponsiveGridLayout>
        {/* <div className="w-6/12" style={{ position: "relative" }}> */}
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
              <p className=" h-full leading-normal p-2">{blockData[item.i]}</p>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
    // </div>
  );
}

export default App;
