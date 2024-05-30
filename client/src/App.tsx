import "./App.css";
import AppRouter from "./components/core/AppRouter";
import ViewContextProvider from "./context/ViewContext";

function App() {
	return (
        <ViewContextProvider>
            <AppRouter></AppRouter>
        </ViewContextProvider>
    );
}

export default App;
