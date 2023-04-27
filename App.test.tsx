import React from "react";
import App from "./App";

import renderer, { act } from "react-test-renderer";
import { NativeMethods, Text, View } from "react-native";

it("calls measure on layout", () => {
  const [x, y, width, height, pageX, pageY] = [1, 2, 3, 4, 5, 6];

  let screen: renderer.ReactTestRenderer;
  act(() => {
    screen = renderer.create(<App />, {
      createNodeMock: (element) => {
        console.log("createNodeMock() called with ", element);

        return {
          measure: (fn: Parameters<NativeMethods["measure"]>[0]) => {
            console.log("createNodeMock's measure() called");

            fn(x, y, width, height, pageX, pageY);
          },
        };
      },
    });
  });

  const { root } = screen;
  act(() => root.findByType(View).props.onLayout());

  const measureText = root
    .findAllByType(Text)
    .find((text) => text.props.children === "123456");

    expect(measureText).toBeTruthy();
});
