import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

function Todos() {
	const { data: todos } = useSWR(
		"https://jsonplaceholder.typicode.com/todos",
		async (url) => {
			const res = await fetch(url);
			if (!res.ok) {
				throw Error("fetch is failed");
			}
			const json = (await res.json()) as Todo[];
			return json;
		},
		{ suspense: true },
	);

	return (
		<div css={{ display: "grid", gap: 8 }}>
			{todos.map(({ id, title, completed }) => {
				return (
					<div key={id} css={{ display: "flex", gap: 4 }}>
						<input checked={completed} readOnly type="checkbox" />
						<span>{title}</span>
					</div>
				);
			})}
		</div>
	);
}

export default function App() {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Suspense fallback={<span>Loading...</span>}>
				<Todos />
			</Suspense>
		</ErrorBoundary>
	);
}
