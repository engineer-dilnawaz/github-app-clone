import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { useThemeStore } from "@/store/zustand/theme";
import { WPX } from "@/utils";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { BlurView } from "expo-blur";
import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleSheet } from "react-native";
import { Portal } from "react-native-paper";

type BottomSheetCompProps = {
  children: ReactElement<BottomSheetViewProps, typeof BottomSheetView>;
} & Omit<BottomSheetProps, "children">;

const BottomSheetComp = forwardRef<BottomSheet, BottomSheetCompProps>(
  (props, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { mode } = useThemeStore();
    const theme = useAppTheme();

    useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheet, []);

    console.log("app sheesssssst");
    return (
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={props?.snapPoints ?? ["70%", "85%"]}
          enablePanDownToClose
          enableDynamicSizing={false}
          handleIndicatorStyle={{
            width: WPX(50),
            backgroundColor: theme.colors.onSurfaceVariant,
          }}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              pressBehavior="close"
              style={{ backgroundColor: "transparent" }}
              children={
                <BlurView
                  tint={mode}
                  intensity={80}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "rgba(0, 0, 0, .1)",
                  }}
                />
              }
            />
          )}
          {...props}
        >
          {props.children}
        </BottomSheet>
      </Portal>
    );
  }
);

export const AppBottomSheet = BottomSheetComp;
