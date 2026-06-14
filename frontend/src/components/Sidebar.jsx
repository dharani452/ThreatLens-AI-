import { Link } from "react-router-dom";

import {
    FaChartBar,
    FaProjectDiagram
} from "react-icons/fa";

function Sidebar() {

    return (

        <div
            style={{
                width: "250px",
                height: "100vh",
                background:
                    "linear-gradient(180deg,#111827,#0B1120)",
                color: "white",
                padding: "20px",
                position: "fixed",
                left: 0,
                top: 0,
                borderRight:
                    "1px solid rgba(255,255,255,0.1)"
            }}
        >

            <h2
                style={{
                    color: "#00E5FF",
                    marginBottom: "40px",
                    textAlign: "center"
                }}
            >
                ThreatLens AI
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >

                <Link
                    to="/"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "12px",
                        borderRadius: "10px",
                        transition: "0.3s"
                    }}
                    onMouseEnter={(e) => {

                        e.currentTarget.style.color =
                            "#00E5FF";

                        e.currentTarget.style.background =
                            "rgba(0,229,255,0.1)";

                    }}
                    onMouseLeave={(e) => {

                        e.currentTarget.style.color =
                            "white";

                        e.currentTarget.style.background =
                            "transparent";

                    }}
                >
                    <FaChartBar
                        style={{
                            marginRight: "10px"
                        }}
                    />
                    Dashboard
                </Link>

                <Link
                    to="/graph"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "12px",
                        borderRadius: "10px",
                        transition: "0.3s"
                    }}
                    onMouseEnter={(e) => {

                        e.currentTarget.style.color =
                            "#00E5FF";

                        e.currentTarget.style.background =
                            "rgba(0,229,255,0.1)";

                    }}
                    onMouseLeave={(e) => {

                        e.currentTarget.style.color =
                            "white";

                        e.currentTarget.style.background =
                            "transparent";

                    }}
                >
                    <FaProjectDiagram
                        style={{
                            marginRight: "10px"
                        }}
                    />
                    Network Graph
                </Link>
                <Link
                    to="/investigation-center"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "12px",
                        borderRadius: "10px",
                        transition: "0.3s"
                    }}
                >
                    Investigation Center
                </Link>

            </div>

        </div>

    );

}

export default Sidebar;