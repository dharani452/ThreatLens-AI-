import { useEffect, useState } from "react";
import API from "../services/api";
import InfoCard from "../components/InfoCard";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";

function InvestigationCenter() {

    const [users, setUsers] = useState([]);
    const [report, setReport] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [search, setSearch] = useState("");
    

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const response = await API.get("/users");

                setUsers(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchUsers();

    }, []);

    const loadReport = async (username) => {

    try {

        const reportResponse =
            await API.get(
                `/investigation/${username}`
            );

        setReport(
            reportResponse.data
        );

        const timelineResponse =
            await API.get(
                `/timeline/${username}`
            );

        console.log(
            "Timeline:",
            timelineResponse.data
        );

        setTimeline(
            timelineResponse.data
        );

    } catch (error) {

        console.error(error);

    }

};

  

    const filteredUsers = users.filter(
        (user) =>
            user
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );

    return (

        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "270px",
                    background: "#0B1120",
                    minHeight: "100vh",
                    color: "white",
                    padding: "30px"
                }}
            >

                <h1
                    style={{
                        color: "#00E5FF",
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    Investigation Center
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px"
                    }}
                >

                    {/* LEFT PANEL */}

                    <div
                        style={{
                            width: "320px",
                            background: "#111827",
                            borderRadius: "16px",
                            padding: "20px"
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Search User..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "none",
                                marginBottom: "20px"
                            }}
                        />

                        <div
                            style={{
                                maxHeight: "700px",
                                overflowY: "auto"
                            }}
                        >

                            {
                                filteredUsers.map(
                                    (user, index) => (

                                        <div
                                            key={index}
                                            onClick={() =>
                                                loadReport(user)
                                            }
                                            style={{
                                                padding: "12px",
                                                background: "#1F2937",
                                                marginBottom: "10px",
                                                borderRadius: "10px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {user}
                                        </div>

                                    )
                                )
                            }

                        </div>

                    </div>

                    {/* RIGHT PANEL */}

                    <div
                        style={{
                            flex: 1,
                            background: "#111827",
                            borderRadius: "16px",
                            padding: "30px"
                        }}
                    >

                        {
                            report ? (

                                <>

                                    {/* INCIDENT REPORT */}

                                    <div
                                        style={{
                                            background: "#0F172A",
                                            border:
                                                "1px solid #334155",
                                            borderRadius: "15px",
                                            padding: "20px",
                                            marginBottom: "25px"
                                        }}
                                    >

                                        <h2
                                            style={{
                                                color: "#EF4444",
                                                marginBottom: "20px"
                                            }}
                                        >
                                            🚨 Security Incident Report
                                        </h2>

                                        <p>
                                            <strong>User:</strong>{" "}
                                            {report.username}
                                        </p>

                                        <p>
                                            <strong>Department:</strong>{" "}
                                            {report.department}
                                        </p>

                                        <p>
                                            <strong>Risk Score:</strong>{" "}
                                            {report.risk_score}
                                        </p>

                                        <p>
                                            <strong>Risk Level:</strong>{" "}
                                            {report.risk_level}
                                        </p>

                                        <p>
                                            <strong>Confidence:</strong>{" "}
                                            {report.confidence}%
                                        </p>

                                    </div>

                                    {/* RISK CARDS */}

                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(3,1fr)",
                                            gap: "15px",
                                            marginBottom: "25px"
                                        }}
                                    >

                                        <InfoCard
                                            title="Risk Score"
                                            value={report.risk_score}
                                        />

                                        <InfoCard
                                            title="Risk Level"
                                            value={report.risk_level}
                                        />

                                        <InfoCard
                                            title="Confidence"
                                            value={`${report.confidence}%`}
                                        />

                                    </div>

                                    {/* USER DETAILS */}

                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(2,1fr)",
                                            gap: "20px"
                                        }}
                                    >

                                        <InfoCard
                                            title="Department"
                                            value={report.department}
                                        />

                                        <InfoCard
                                            title="Job Title"
                                            value={report.job_title}
                                        />

                                        <InfoCard
                                            title="Privilege Level"
                                            value={report.privilege_level}
                                        />

                                        <InfoCard
                                            title="Days Inactive"
                                            value={report.days_inactive}
                                        />

                                    </div>

                                    {/* THREAT INDICATORS */}

                                    <div
                                        style={{
                                            marginTop: "25px"
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color: "#F59E0B"
                                            }}
                                        >
                                            Threat Indicators Detected
                                        </h3>

                                        <ul
                                            style={{
                                                listStyle: "none",
                                                padding: 0
                                            }}
                                        >

                                            {
                                                report.indicators?.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                background:
                                                                    "#EF4444",
                                                                color:
                                                                    "white",
                                                                padding:
                                                                    "8px 12px",
                                                                borderRadius:
                                                                    "20px",
                                                                marginRight:
                                                                    "10px",
                                                                marginBottom:
                                                                    "10px"
                                                            }}
                                                        >
                                                            {item}
                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>

                                    </div>

                                    {/* NARRATIVE */}

                                    <div
                                        style={{
                                            marginTop: "25px"
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color: "#00E5FF"
                                            }}
                                        >
                                            AI Investigation Summary
                                        </h3>

                                        <p>
                                            {report.narrative}
                                        </p>

                                    </div>

                                    {/* RECOMMENDATIONS */}

                                    <div
                                        style={{
                                            marginTop: "25px"
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color: "#22C55E"
                                            }}
                                        >
                                            Recommended Response Actions
                                        </h3>

                                        <ul
                                            style={{
                                                listStyle: "none",
                                                padding: 0
                                            }}
                                        >

                                            {
                                                report.recommendations?.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={index}
                                                            style={{
                                                                background:
                                                                    "#1F2937",
                                                                padding:
                                                                    "10px",
                                                                borderRadius:
                                                                    "8px",
                                                                marginBottom:
                                                                    "10px"
                                                            }}
                                                        >
                                                            {item}
                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>

                                    </div>
                                    <Timeline
                                        events={timeline}
                                    />

                                </>

                            ) : (

                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "100px"
                                    }}
                                >

                                    <h2>
                                        Select a User
                                    </h2>

                                    <p>
                                        Investigation report will appear here
                                    </p>

                                </div>

                            )
                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default InvestigationCenter;