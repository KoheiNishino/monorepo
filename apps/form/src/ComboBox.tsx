import { useMemo, useState } from "react";

interface Option {
	label: string;
	value: string;
}

interface Props {
	id: string;
	onChange: (option: Option | null) => void;
	options: Option[];
	value: Option | null;
}

export function ComboBox({
	id,
	onChange,
	options: initialOptions,
	value,
}: Props) {
	const [label, setLabel] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	const filteredOptions = useMemo(() => {
		return label !== ""
			? initialOptions.filter(
					({ label: l, value: v }) => l.includes(label) || v.includes(label),
				)
			: initialOptions;
	}, [label, initialOptions]);

	return (
		<div>
			<input
				css={{ width: "100%" }}
				onBlur={() => {
					setMenuOpen(false);
				}}
				onChange={(e) => {
					const inputLabel = e.target.value;
					setLabel(inputLabel);
				}}
				onClick={() => {
					setMenuOpen(true);
					setLabel("");
				}}
				value={label}
			/>
			<input hidden id={id} readOnly value={value?.value ?? ""} />

			{menuOpen ? (
				filteredOptions.length > 0 ? (
					<ul css={{ border: "1px solid black", padding: 4 }}>
						{filteredOptions.map(({ label, value }) => (
							<li
								css={{
									"&:hover": {
										background: "gray",
									},
									listStyle: "none",
									cursor: "pointer",
								}}
								key={value}
								onClick={() => {
									const newSelectedOption = initialOptions.find(
										(o) => o.value === value,
									)!;
									onChange(newSelectedOption);
									setLabel(newSelectedOption.label);
									setMenuOpen(false);
								}}
								onMouseDown={(e) => {
									e.preventDefault();
								}}
							>
								{label}
							</li>
						))}
					</ul>
				) : (
					<div css={{ border: "1px solid black", padding: 4 }}>
						一致する選択肢が見つかりませんでした
					</div>
				)
			) : null}
		</div>
	);
}
