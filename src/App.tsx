import { For, Show } from "solid-js";
import db from "./db";
import {
	createQuery,
	useMutationState,
	useQueryClient,
	createMutation,
} from "@tanstack/solid-query";
import toast from "solid-toast";

function App() {
	return (
		<div class="flex flex-col items-center justify-center mt-6">
			<div class="p-4 rounded-md flex flex-col">
				<div class="w-full text-lg font-semibold text-gray-600">
					Integrations
				</div>
				<Form />
				<List />
			</div>
		</div>
	);
}

const List = () => {
	const integrations = createQuery(() => ({
		queryKey: ["integrations"],
		queryFn: async () => {
			return db.get_integrations();
		},
	}));

	const integration_pending = useMutationState(() => ({
		filters: {
			mutationKey: ["add_integration"],
			status: "pending",
		},
		select: (mutation) => mutation.state.variables as { name: string },
	}));

	return (
		<div class="flex flex-col gap-2">
			<For each={integration_pending()}>
				{(mutation) => (
					<div class="opacity-40">
						<Integration name={mutation.name} />
					</div>
				)}
			</For>
			<Show when={integrations.data}>
				<For each={integrations.data}>
					{(integration) => <Integration name={integration} />}
				</For>
			</Show>
		</div>
	);
};

const Integration = (props: { name: string }) => {
	return (
		<div class="border shadow-sm bg-gray-50 flex items-center gap-2 p-1 rounded ">
			<div class="h-9 w-9 rounded-sm overflow-hidden">
				<img
					src={`${props.name.toLowerCase()}.png`}
					class="rounded-sm"
					alt=""
				/>
			</div>
			<div>{props.name}</div>
		</div>
	);
};

function Form() {
	const queryClient = useQueryClient();

	const addIntegration = createMutation(() => ({
		mutationKey: ["add_integration"],
		mutationFn: async (v: { name: string }) => {
			return db.add_integration(v.name);
		},
		onSuccess: (data) => {
			toast.success(data);
			return queryClient.invalidateQueries();
		},
	}));

	return (
		<form
			class="flex gap-3 pt-2 pb-4"
			onSubmit={(e) => {
				e.preventDefault();
				const data = new FormData(e.currentTarget);
				const name = data.get("integration") as string;
				addIntegration.mutate({ name });
			}}
		>
			<div class="flex gap-1.5 text-gray-500 border-gray-300 py-1 px-2 border rounded items-center">
				<svg
					viewBox="0 0 24 24"
					height="16"
					width="16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</svg>
				<input
					name="integration"
					type="text"
					class="flex-1 text-sm outline-none"
					placeholder="Add Integration"
				/>
			</div>
			<button class="px-3 py-1 bg-lime-400 hover:bg-lime-500 rounded text-sm text-lime-900 font-medium">
				Submit
			</button>
		</form>
	);
}

export default App;
