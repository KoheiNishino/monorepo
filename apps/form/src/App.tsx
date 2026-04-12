import { type ComponentProps, useState } from "react";
import * as z from "zod";
import { ComboBox } from "./ComboBox";

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  age: z.number().gte(18),
  message: z.string().min(1),
  option: z.custom<ComponentProps<typeof ComboBox>["value"]>(() => true),
}).superRefine((data, ctx) => {
  if (data.option === null) {
    ctx.addIssue({
      code: "custom",
      path: ["option"],
      message: "optionを選択してください",
    });
  }
});
type FormFields = z.infer<typeof schema>;
type FormErrors = Record<keyof FormFields, string>;

const INITIAL_FORM = {
	name: "",
	email: "",
	age: 0,
	message: "",
	option: null,
} as const satisfies FormFields;

const INITIAL_ERROR = {
	name: "",
	email: "",
	age: "",
	message: "",
	option: "",
} as const satisfies FormErrors;

export default function App() {
	const [obj, setObj] = useState<FormFields>(INITIAL_FORM);
	const [error, setError] = useState<FormErrors>(INITIAL_ERROR);

	return (
		<form
			noValidate
			css={{ display: "grid", gap: 16 }}
			onSubmit={(e) => {
				e.preventDefault();
				const result = schema.safeParse(obj);

				if (!result.success) {
					const { fieldErrors } = z.flattenError(result.error);
					setError({
						...INITIAL_ERROR,
						...Object.fromEntries(
							Object.entries(fieldErrors).map(([key, value]) => [
								key,
								value[0] ?? "",
							]),
						),
					});
					return;
				}

				console.log(obj);
				setObj(INITIAL_FORM);
				setError(INITIAL_ERROR);
			}}
		>
			<div css={{ display: "grid", gap: 8 }}>
				<label htmlFor="name">name</label>
				<input
					id="name"
					onChange={(e) => {
						setObj((prev) => ({ ...prev, name: e.target.value }));
					}}
					value={obj.name}
					type="text"
				/>
				{error.name !== "" ? (
					<span css={{ color: "red" }}>{error.name}</span>
				) : null}
			</div>
			<div css={{ display: "grid", gap: 8 }}>
				<label htmlFor="email">email</label>
				<input
					id="email"
					onChange={(e) => {
						setObj((prev) => ({ ...prev, email: e.target.value }));
					}}
					type="email"
					value={obj.email}
				/>
				{error.email !== "" ? (
					<span css={{ color: "red" }}>{error.email}</span>
				) : null}
			</div>
			<div css={{ display: "grid", gap: 8 }}>
				<label htmlFor="email">age</label>
				<input
					id="age"
					onChange={(e) => {
						setObj((prev) => ({ ...prev, age: Number(e.target.value) }));
					}}
					type="number"
					value={obj.age}
				/>
				{error.age !== "" ? (
					<span css={{ color: "red" }}>{error.age}</span>
				) : null}
			</div>
			<div css={{ display: "grid", gap: 8 }}>
				<label htmlFor="message">message</label>
				<textarea
					id="message"
					onChange={(e) => {
						setObj((prev) => ({ ...prev, message: e.target.value }));
					}}
					value={obj.message}
				></textarea>
				{error.message !== "" ? (
					<span css={{ color: "red" }}>{error.message}</span>
				) : null}
			</div>
			<div css={{ display: "grid", gap: 8 }}>
				<label htmlFor="option">option</label>
				<ComboBox
					id="option"
					onChange={(option) => {
						setObj((prev) => ({ ...prev, option: option }));
					}}
					options={[
						{ label: "東京", value: "tokyo" },
						{ label: "大阪", value: "osaka" },
					]}
					value={obj.option}
				/>
				{error.option !== "" ? (
					<span css={{ color: "red" }}>{error.option}</span>
				) : null}
				<button
					onClick={() => {
						setObj((prev) => ({
							...prev,
							option: { label: "ホゲ", value: "hoge" },
						}));
					}}
				>
					ホゲに変えるボタン
				</button>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
