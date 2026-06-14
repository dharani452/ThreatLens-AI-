import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Investigation from "./pages/Investigation";
import Graph from "./pages/Graph";
import InvestigationCenter from "./pages/InvestigationCenter";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/user/:username"
                    element={<Investigation />}
                />

                <Route
                    path="/graph"
                    element={<Graph />}
                />
                <Route
                    path="/investigation-center"
                    element={<InvestigationCenter />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;