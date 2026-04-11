import { type ComponentProps, useState } from "react";
import { ComboBox } from "./ComboBox";

interface FormFields {
	name: string;
	email: string;
	age: number;
	message: string;
	option: ComponentProps<typeof ComboBox>["value"];
}

const INITIAL_FORM = {
	name: "",
	email: "",
	age: 0,
	message: "",
	option: null,
} as const satisfies FormFields;

type FormErrors = Record<keyof FormFields, string>;

const INITIAL_ERROR = {
	name: "",
	email: "",
	age: "",
	message: "",
	option: "",
} as const satisfies FormErrors;

function valid(formFields: FormFields) {
	const { name, email, age } = formFields;

	const errors: {
		type: "name" | "email" | "age";
		errorMessage: string;
	}[] = [];

	if (name.length === 0) {
		errors.push({
			type: "name",
			errorMessage: "name error",
		});
	}

	if (!email.includes("@")) {
		errors.push({
			type: "email",
			errorMessage: "email error",
		});
	}

	if (age < 18) {
		errors.push({
			type: "age",
			errorMessage: "age error",
		});
	}

	return errors;
}

export default function App() {
	const [obj, setObj] = useState<FormFields>(INITIAL_FORM);
	const [error, setError] = useState<FormErrors>(INITIAL_ERROR);

	return (
		<form
			noValidate
			css={{ display: "grid", gap: 16 }}
			onSubmit={(e) => {
				e.preventDefault();

				const errors = valid(obj);
				if (errors.length !== 0) {
					setError((prev) => ({
						...prev,
						...Object.fromEntries(errors.map((k) => [k.type, k.errorMessage])),
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
