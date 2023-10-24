/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { Toaster } from "solid-toast";

const root = document.getElementById("root");
const client = new QueryClient();

render(
	() => (
		<QueryClientProvider client={client}>
			<Toaster position="top-center" />
			<SolidQueryDevtools
				errorTypes={[
					{
						name: "PokemonError",
						initializer: (q) => new Error(`Pokemon ${q.queryKey[1]} not found`),
					},
				]}
			/>
			<App />
		</QueryClientProvider>
	),
	root!
);
