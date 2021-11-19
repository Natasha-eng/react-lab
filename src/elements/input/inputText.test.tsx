// eslint-disable-next-line no-use-before-define
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import InputText from "./InputText";

const mockData = {
  name: "username",
  type: "text",
  label: "Username",
  value: "natasha",
  onChangeValueHandler: () => {},
  onBlurHander: () => {},
  error: "error",
};

describe("InputText component", () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it("should render Input component", () => {
    const tree = renderer
      .create(
        <InputText
          name={mockData.name}
          type={mockData.type}
          label={mockData.label}
          value={mockData.value}
          onChangeValueHandler={mockData.onChangeValueHandler}
          onBlurHander={mockData.onBlurHander}
          error={mockData.error}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
