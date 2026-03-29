import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "./App";

test("ComboBox", async () => {
	const screen = await render(<App />);
	expect(screen.getByText("ホゲに変えるボタン")).toBeVisible();
});
