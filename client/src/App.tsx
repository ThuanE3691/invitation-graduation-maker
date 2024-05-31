import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import "./App.css";
import AppRouter from "./components/core/AppRouter";
import ViewContextProvider from "./context/ViewContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
	return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ViewContextProvider>
                <AppRouter></AppRouter>
            </ViewContextProvider>
        </QueryClientProvider>
    );
}

export default App;
