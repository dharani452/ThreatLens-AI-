import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import RiskChart from "../components/RiskChart";
import ThreatChart from "../components/ThreatChart";
import UserTable from "../components/UserTable";

function Dashboard() {

    const [health, setHealth] = useState(null);
    const [summary, setSummary] = useState(null);

    const [riskData, setRiskData] = useState([]);
    const [threatData, setThreatData] = useState([]);
    const [highRiskUsers, setHighRiskUsers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const healthResponse =
                    await API.get(
                        "/system-health"
                    );

                setHealth(
                    healthResponse.data
                );

                const summaryResponse =
                    await API.get(
                        "/dashboard-summary"
                    );

                setSummary(
                    summaryResponse.data
                );

                const riskResponse =
                    await API.get(
                        "/risk-distribution"
                    );

                const riskChartData =
                    Object.entries(
                        riskResponse.data
                    ).map(
                        ([name, value]) => ({
                            name,
                            value
                        })
                    );

                setRiskData(
                    riskChartData
                );

                const threatResponse =
                    await API.get(
                        "/top-threats"
                    );

                const threatChartData =
                    Object.entries(
                        threatResponse.data
                    ).map(
                        ([name, value]) => ({
                            name: name
                                .replaceAll("_", " ")
                                .toLowerCase()
                                .replace(
                                    /\b\w/g,
                                    c => c.toUpperCase()
                                ),
                            value
                        })
                    );

                setThreatData(
                    threatChartData
                );

                const usersResponse =
                    await API.get(
                        "/high-risk-users"
                    );

                setHighRiskUsers(
                    usersResponse.data
                );

            } catch (error) {

                console.error(error);

            }

        };

        fetchData();

    }, []);

    return (

        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "270px",
                    backgroundColor: "linear-gradient(135deg,#020617,#0B1120,#111827)",
                    minHeight: "100vh",
                    color: "white",
                    padding: "40px"
                }}
            >

                <h1
                    style={{
                        fontSize: "48px",
                        fontWeight: "800",
                        color: "#00E5FF",
                        marginBottom: "30px",
                        textShadow:
                            "0 0 20px rgba(0,229,255,0.5)",
                        animation:
                            "fadeIn 1s ease"
                    }}
                >
                    ThreatLens AI
                </h1>

                {
                    health && (

                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                flexWrap: "wrap"
                            }}
                        >

                            <StatsCard
                                title="Users Monitored"
                                value={
                                    health.users_monitored
                                }
                            />

                            <StatsCard
                                title="Events Processed"
                                value={
                                    health.events_processed
                                }
                            />

                            <StatsCard
                                title="Anomalies Detected"
                                value={
                                    health.anomalies_detected
                                }
                            />

                            {
                                summary && (

                                    <>
                                        <StatsCard
                                            title="Critical Users"
                                            value={
                                                summary.critical_users
                                            }
                                        />

                                        <StatsCard
                                            title="High Risk Users"
                                            value={
                                                summary.high_risk_users
                                            }
                                        />
                                    </>

                                )
                            }

                        </div>

                    )
                }

                {
                    riskData.length > 0 && (

                        <RiskChart
                            data={riskData}
                        />

                    )
                }

                {
                    threatData.length > 0 && (

                        <ThreatChart
                            data={threatData}
                        />

                    )
                }

                {
                    highRiskUsers.length > 0 && (

                        <UserTable
                            users={highRiskUsers}
                        />

                    )
                }

            </div>
        </>

    );

}

export default Dashboard;