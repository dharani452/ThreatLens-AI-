import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Graph() {

    const [connections, setConnections] =
        useState([]);

    useEffect(() => {

        const fetchGraph =
            async () => {

                try {

                    const response =
                        await API.get(
                            "/network-graph"
                        );

                    setConnections(
                        response.data.edges
                    );

                } catch (error) {

                    console.error(error);

                }

            };

        fetchGraph();

    }, []);

    return (

        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "270px",
                    padding: "30px",
                    background: "#0B1120",
                    minHeight: "100vh",
                    color: "white"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        color: "#00E5FF",
                        marginBottom: "30px"
                    }}
                >
                    Threat Relationships
                </h1>

                <div
                    style={{
                        background: "#111827",
                        borderRadius: "16px",
                        padding: "20px"
                    }}
                >

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th>User</th>
                                <th>→</th>
                                <th>Resource</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                connections.map(
                                    (item, index) => (

                                        <tr
                                            key={index}
                                        >
                                            <td
                                                style={{
                                                    padding: "12px"
                                                }}
                                            >
                                                {item.source}
                                            </td>

                                            <td>
                                                →
                                            </td>

                                            <td>
                                                {item.target}
                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default Graph;