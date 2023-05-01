import React from "react";
import { SafeAreaView, Text, View } from "react-native";

interface Measure {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export default class App extends React.Component {
  state = {
    measure: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 },
  };
  viewRef: any = React.createRef();

  render() {
    return (
      <SafeAreaView>
        <View
          onLayout={() => {
            console.log("onLayout() called");

            this.viewRef.current.measure(
              (
                x: any,
                y: any,
                width: any,
                height: any,
                pageX: any,
                pageY: any
              ) => {
                console.log("measure() called", x, y, width, height);

                this.setState({
                  measure: { x, y, width, height, pageX, pageY },
                });
              }
            );
          }}
          ref={this.viewRef}
        >
          <Text>Measure:</Text>
          <Text>
            {this.state.measure
              ? Object.values(this.state.measure).join("")
              : ""}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
