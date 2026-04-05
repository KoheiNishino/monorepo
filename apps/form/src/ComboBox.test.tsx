import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "./App";

const options = ["東京", "大阪"] as const;
const label = "東京";

test("ComboBox", async () => {
	const screen = await render(<App />);
	const comboBox = screen.getByRole("textbox", { name: /^option$/ });

	await comboBox.click();
	for (const o of options) {
		expect(screen.getByText(o)).toBeVisible();
	}

	// 選択肢が存在しないとき
	await comboBox.fill("名古屋");
	expect(
		screen.getByText("一致する選択肢が見つかりませんでした"),
	).toBeVisible();

	// onChangeが発火する
	await comboBox.fill(label);
	await screen.getByText(label).click();
	expect(comboBox).toHaveValue(label);
});
