import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { THEME } from "../../theme";
import { AppTextBold } from "./AppTextBold";

export const AppButton = ({
  children,
  style,
  onPress,
  color = THEME.MAIN_COLOR,
  colorText = "#fff",
}) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={onPress}>
      <View style={{ ...styles.default, ...style, backgroundColor: color }}>
        <AppTextBold style={{ color: colorText }}>{children}</AppTextBold>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "roboto-regular",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
