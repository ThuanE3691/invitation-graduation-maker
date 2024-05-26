import BaseView from "./components/BaseView";
import "./App.css";
import ViewContextProvider from "./context/ViewContext";
import ViewController from "./components/ViewController";

function App() {
	return (
		<ViewContextProvider>
			<div className="relative w-screen h-screen overflow-hidden">
				<ViewController></ViewController>
				<BaseView />
			</div>
		</ViewContextProvider>
	);
}

export default App;