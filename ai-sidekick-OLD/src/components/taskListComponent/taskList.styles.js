import { StyleSheet } from "react-native"

export default StyleSheet.create({
    task: {
        fontSize: 18,
        paddingVertical: 10,
        borderBottomColor: "#eee",
        borderBottomWidth:1,
    },
    done: {
        textDecorationLine: "line-through",
        color: "gray",
    },
})