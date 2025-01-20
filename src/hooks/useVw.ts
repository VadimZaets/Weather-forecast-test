import { Dimensions } from "react-native";

export function useVw(px: number) {
    const defaultWidth = 375;
    if (Dimensions.get("window").width > 500) {
        return (px * Dimensions.get("window").width) / defaultWidth / 1.8;
    }
    return (px * Dimensions.get("window").width) / defaultWidth;
}
