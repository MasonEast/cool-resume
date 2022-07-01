export const AVATAR = "avatar";

export const TYPE = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  IMG: "img",
  P: "p",
};

export const BLOCK_STYLE: Record<string, React.CSSProperties> = {
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

export const LAYOUT = [
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

export const BLOCK_DATA = {
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
