import { ReactNode, useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";

import Header from "./components/header";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface EnhanceLayout extends Layout {
  data: {
    text: ReactNode;
    type: string;
  };
}

const LAYOUT = [
  {
    i: "a",
    x: 0,
    y: 0,
    w: 3,
    h: 2,
    data: {
      text: "张三丰/男/1788",
      type: "h1",
    },
  },
  {
    i: "b",
    x: 0,
    y: 1,
    w: 3,
    h: 2,
    data: {
      text: "武林宗师大学/太极拳系",
      type: "h2",
    },
  },
  {
    i: "c",
    x: 0,
    y: 2,
    w: 3,
    h: 2,
    data: {
      text: "工作年限：288年",
      type: "h3",
    },
  },
  {
    i: "d",
    x: 0,
    y: 2,
    w: 3,
    h: 2,
    data: {
      text: "联系方式：zhangsanfen@gmail.com | xxxxxxxxxxxx",
      type: "p",
    },
  },
];

const AVATAR = "avatar";

const BLOCK_STYLE: any = {
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
  const [layouts, setLayouts] = useState<EnhanceLayout[]>(LAYOUT);

  // const handleAddBlock = () => {
  //   setLayouts([
  //     ...layouts,
  //     { i: String(layouts.length), x: 0, y: 0, w: 3, h: 2 },
  //   ]);
  // };

  const handleAddDvider = () => {
    const key = String(layouts.length);
    setLayouts([
      ...layouts,
      {
        i: key,
        x: 0,
        y: 0,
        w: 6,
        h: 1,
        data: {
          type: "p",
          text: <p style={{ backgroundColor: "black", height: "100%" }} />,
        },
      },
    ]);
  };

  const handleUploadPicture = () => {
    var reads = new FileReader();
    const input = document.getElementById("uploadImage") as HTMLInputElement;
    const f = input.files?.[0] as File;

    reads.readAsDataURL(f);
    reads.onload = function (e) {
      setLayouts([
        ...layouts,
        {
          i: AVATAR,
          x: 0,
          y: 0,
          w: 2,
          h: 6,
          data: {
            type: "img",
            text: (
              <img className="h-full" src={e.target?.result as string} alt="" />
            ),
          },
        },
      ]);
    };
  };

  const handleLayoutChange = (layouts: Layout[]) => {
    setLayouts((pre) => {
      const arr = pre.map((item, i) => Object.assign(item, layouts[i]));
      console.log(arr, "333");
      return arr;
    });
  };
  console.log(layouts, "222");

  const handleBlockChange = (
    key: string,
    e: React.FocusEvent<HTMLParagraphElement>
  ) => {
    const node = e.target as HTMLElement;
    if (key === AVATAR) return;
    setLayouts((pre) => {
      const arr = [...pre];
      const i = arr.findIndex((item) => item.i === key);
      arr[i].data.text = node.innerText;
      console.log(node.innerText);

      return arr;
    });
  };

  return (
    <div className="App">
      <Header setLayouts={setLayouts} />
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
                style={BLOCK_STYLE[item.data.type]}
              >
                {item.data.text}
              </div>
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
                style={BLOCK_STYLE[item.data.type]}
              >
                {item.data.text}
                {item.x}
                {item.y}
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}

export default App;
