// ./src/styles

const themeMain = "rgba(61,47,117, 1)";
const themeLite = "rgba(255, 255, 255, 1)";
const themeDark = "rgba(48,48,48, 1)";
const primaryAccent = "rgba(173,119,235, 1)";
const secondaryAccent = "rgba(216,166,29, 1)";
const textColor = "rgba(255, 255, 255, 1)";
const postColor = "rgba(8,8,73, 0.7)";
const drawerWidth = "20rem";
const navHeight = "7rem";

const logInAccordionStyling = {
    // Accordions

    accordion: {
        boxShadow: ` 0 0 7px -4px black`,
        paddingRight: "0",
        paddingLeft: "0",
    },

    accordionRoot: {
        background: "rgba(255, 255, 255, 0.75)",
        width: "100%",
    },

    //Accordion Header

    headerTitle: {
        padding: "0 0.7rem",
        fontSize: "1.6rem",
        width: "100%",
    },

    //Accordion Body

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    submit: {
        width: "40%",
        margin: "1rem 0 0.5rem 0",
    },

    input: {
        width: "85%",
        marginBottom: "1rem",
    },
    firstInput: {
        marginTop: "1rem",
    },
};

const loggedOutDrawerStyling = {
    // Drawer

    drawer: {
        // overflowX: "hidden",
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        backgroundColor: "rgba(90,68,179, 1)",
        width: drawerWidth,
        color: textColor,
    },

    drawerContainer: {
        overflow: "auto",
    },

    blankSpace: {
        height: `calc(${navHeight} + 1.5rem)`,
    },

    wrapper: {
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
        display: "flex",
    },

    // Accordions

    accordion: {
        boxShadow: "0 0 7px -4px black",
        paddingRight: "0",
        paddingLeft: "0",
    },

    accordionRoot: {
        background: "rgba(255, 255, 255, 0.75)",
        width: "100%",
    },

    list: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    listItem: {
        padding: 0,
        marginBottom: "1.5rem",
        width: "99%",
    },

    //Accordion Header

    headerTitle: {
        padding: "0 0.7rem",
        fontSize: "1.6rem",
        width: "100%",
    },

    //Accordion Body

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    input: {
        width: "85%",
        marginBottom: "1rem",
    },

    firstInput: {
        marginTop: "1rem",
    },

    submit: {
        width: "40%",
        margin: "1rem 0 0.5rem 0",
    },

    comingSoon: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    settings: {
        fontSize: "2rem",
        width: "100%",
        textAlign: "center",
    },
};

// variables
const variables = {
<<<<<<< HEAD
    themeMain,
    themeLite,
    themeDark,
    primaryAccent,
    secondaryAccent,
    textColor,
    postColor,
    drawerWidth,
    navHeight,
=======
    logInAccordionStyling,
    loggedOutDrawerStyling,
    secondaryAccent,
    primaryAccent,
    drawerWidth,
    navHeight,
    themeMain,
    themeLite,
    themeDark,
    textColor,
    postColor,
>>>>>>> 2e88da1ed4a2388002725832fde77d1969a45707
};

export default variables;
