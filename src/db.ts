const state = [
	"Linear",
	"GitHub",
	"GitLab",
	"Trello",
	"AirBnB",
	"Clubhouse",
	"Discord",
	"Raycast",
];

const sleep = (ms: number = 1000) =>
	new Promise((resolve) => setTimeout(resolve, ms));

const get_integrations = async () => {
	await sleep(125);
	return [...state];
};

const add_integration = async (name: string) => {
	await sleep(1500);
	state.unshift(name);
	return `New integration for ${name} added!`;
};

export default {
	get_integrations,
	add_integration,
};
