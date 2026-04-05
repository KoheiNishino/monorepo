const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const ids = ["1", "2", "3"] as const;

async function fetchSequential() {
	console.info(fetchSequential.name);
	for (const id of ids) {
		const res = await fetch(`${apiUrl}/${id}`);
		const data = (await res.json()) as unknown;
		console.log(data);
	}
}

async function fetchParallel() {
	console.info(fetchParallel.name);
	const reses = await Promise.all(ids.map((id) => fetch(`${apiUrl}/${id}`)));
	const datas = await Promise.all(reses.map((res) => res.json()));
	for (const data of datas) {
		console.log(data);
	}
}

await fetchSequential();
await fetchParallel();

export {};
