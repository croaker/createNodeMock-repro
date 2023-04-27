import { useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

interface Measure {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export default function App() {
  const [measure, setMeasure] = useState<Measure>();
  const viewRef = useRef<View | null>(null);

  const onLayout = () => {
    console.log("onLayout() called");

    viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
      console.log("measure() called");

      setMeasure({ x, y, width, height, pageX, pageY });
    });
  };

  return (
    <SafeAreaView>
      <View onLayout={onLayout} ref={viewRef}>
        <Text>Measure:</Text>
        <Text>
          {measure
            ? Object.values(measure).join("")
            : ""}
        </Text>
      </View>
    </SafeAreaView>
  );
}
