const HomeReducer = (state = "", action = "") => {
    switch (action.type) {
        case "ADD_HOME_DATA":
            return action.payload
        default:
            return state
    }
}
export default HomeReducer;