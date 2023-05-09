import { createServer } from "node:http";
import { Readable } from "node:stream";
import { randomUUID } from "node:crypto";
import chalk from "chalk";

function* run() {
	for (let index = 0; index < 99; index++) {
		const DATA = {
			id: randomUUID(),
			name: `String-${index}`,
		};
		yield DATA;
	}
}

const HTTP_SERVER = createServer(async (req, res) => {
	const readable = new Readable({
		read() {
			for (const data of run()) {
				console.log(chalk.red("[SERVER]"), data);
				// Everytime push is called the pipeline is used, like a registry opening and water flowing through a pipe
				this.push(JSON.stringify(data) + "\n");
			}
			this.push(null);
		},
	});

	readable.pipe(res);
});

HTTP_SERVER.listen(3333, () => {
	console.log("Server running");
});
