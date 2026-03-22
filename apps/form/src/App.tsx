import { type ComponentProps, useState } from "react";
import { ComboBox } from "./ComboBox";

interface FormFields {
	name: string;
	email: string;
	message: string;
	option: ComponentProps<typeof ComboBox>["value"];
}

const INITIAL_FORM = {
	name: "",
	email: "",
	message: "",
	option: null,
} as const satisfies FormFields;

type FormErrors = Record<keyof FormFields, string>;

const INITIAL_ERROR = {
	name: "",
	email: "",
	message: "",
	option: "",
} as const satisfies FormErrors;

export default function App() {
	const [obj, setObj] = useState<FormFields>(INITIAL_FORM);
	const [error, setError] = useState<FormErrors>(INITIAL_ERROR);

	return (
		<form
			css={{ display: "grid", gap: 16 }}
			onSubmit={(e) => {
				e.preventDefault();
				const emptyKeys = (Object.keys(obj) as (keyof FormFields)[]).filter(
					(k) => !obj[k],
				);

				if (emptyKeys.length > 0) {
					setError((prev) => ({
						...prev,
						...Object.fromEntries(emptyKeys.map((k) => [k, "必須項目です"])),
					}));
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
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
