import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const cache = new Map<string, Promise<Todo[]>>();
async function fetchTodos(url: string) {
	if (!cache.has(url)) {
		const res = await fetch(url);
		if (!res.ok) {
			throw Error("fetch is failed");
		}
		const todosJsonPromise = res.json() as Promise<Todo[]>;
		cache.set(url, todosJsonPromise);
		todosJsonPromise.catch(() => cache.delete(url));
		return todosJsonPromise;
	}
	return cache.get(url)!;
}

function Todos({ todosPromise }: { todosPromise: Promise<Todo[]> }) {
	const todos = use(todosPromise);

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
				<Todos
					todosPromise={fetchTodos(
						"https://jsonplaceholder.typicode.com/todos",
					)}
				/>
			</Suspense>
		</ErrorBoundary>
	);
}
