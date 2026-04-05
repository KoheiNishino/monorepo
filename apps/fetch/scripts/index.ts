const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const ids = ["1", "2", "3"] as const;

async function fetchSequential() {
	console.info(fetchSequential.name);

	for (const id of ids) {
		try {
			const res = await fetch(`${apiUrl}/${id}`);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status.toString()}`);
			}

			const data = (await res.json()) as unknown;
			console.log(data);
		} catch (e) {
			if (e instanceof Error) {
				console.error("Fetch error:", e.message);
			}
		}
	}
}

async function fetchParallel() {
	console.info(fetchParallel.name);
	await Promise.all(
		ids.map(async (id) => {
			try {
				const res = await fetch(`${apiUrl}/${id}`);

				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status.toString()}`);
				}
				const data = (await res.json()) as unknown;
				console.log(data);
			} catch (e) {
				if (e instanceof Error) {
					console.error("Fetch error:", e.message);
				}
			}
		}),
	);
}

await fetchSequential();
await fetchParallel();

export {};
