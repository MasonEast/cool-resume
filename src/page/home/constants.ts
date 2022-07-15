/*
 * @Description: 
 * @Date: 2022-07-02 17:42:58
 * @Author: mason
 */
export const CONSTANTS = {
  AVATAR: "avatar",
  DIVIDER: "divider",
};

export const TYPE = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  IMG: "img",
  P: "p",
  DIVIDER: "divider",
};

export const NO_Edit_TYPE = ["img"].concat(Object.values(CONSTANTS));

export const BLOCK_STYLE: Record<string, React.CSSProperties> = {
  h1: {
    fontSize: "1.3rem",
    fontWeight: "500",
    lineHeight: "1.5rem",
  },
  h2: {
    fontSize: "1.2rem",
    fontWeight: "500",
    lineHeight: "1.5rem",
  },
  h3: {
    fontSize: "1.1rem",
    fontWeight: "500",
    lineHeight: "1.5rem",
  },
  p: {
    lineHeight: "1.5rem",
  },
};
