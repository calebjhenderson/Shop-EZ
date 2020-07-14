// ./src/styles.js

let themeMain = "rgba(61,47,117, 1)";
let themeLite = "rgba(255, 255, 255, 1)";
let themeDark = "rgba(48,48,48, 1)";
let primaryAccent = "rgba(173,119,235, 1)";
let secondaryAccent = "rgb(191,154,48)";
let textColor = "rgba(255, 255, 255, 1)";
let postColor = "rgba(8,8,73, 0.7)";

const styles = {
  variables: {
    themeMain,
    themeLite,
    themeDark,
    primaryAccent,
    secondaryAccent,
    textColor,
    postColor,
  },

  leftNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: "6rem",
    height: "auto",
    margin: "1rem 1rem 1rem 0.5rem",
    paddingRight: "1rem",
    borderRight: `2px solid ${secondaryAccent}`,
  },

  explore: {
    opacity: "92%",
    boxShadow: ` 0 1px 4px ${secondaryAccent} `,
  },

  mainSearch: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "55vw",
  },

  mainSearchInput: {
    width: "50vw",
    height: "2rem",
    padding: "0.5rem",
    border: "none",
    borderRadius: "10px",
    boxShadow: `0 0 5px ${primaryAccent}`,
    fontSize: "1.1rem",
    "&:focus": {
      outline: "none",
    },
  },

  nav: {
    background: themeMain,
    diplay: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "7rem",
  },

  searchAll: {
    color: textColor,
  },
};

export default styles;
