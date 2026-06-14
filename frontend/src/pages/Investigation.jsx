import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import API from "../services/api";

import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import InfoCard from "../components/InfoCard";

function Investigation() {

    const { username } =
        useParams();

    const [userData,
        setUserData] =
        useState(null);

    const [timeline,
        setTimeline] =
        useState([]);

    useEffect(() => {

        const fetchUser =
            async () => {

                try {

                    const response =
                        await API.get(
                            `/user/${username}`
                        );

                    setUserData(
                        response.data
                    );

                    const timelineResponse =
                        await API.get(
                            `/timeline/${username}`
                        );

                    setTimeline(
                        timelineResponse.data
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                }

            };

        fetchUser();

    }, [username]);
if (!userData)
    return <Loader />;

    return (

        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "270px",
                    background:
                        "#0B1120",
                    minHeight:
                        "100vh",
                    color: "white",
                    padding: "40px"
                }}
            >

                <h1
                    style={{
                        color:
                            "#00E5FF"
                    }}
                >
                    Investigation Report
                </h1>

                <h2
    style={{
        marginBottom: "20px"
    }}
>
    {userData.username}
</h2>

<div
    style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "30px"
    }}
>

    <InfoCard
        title="Department"
        value={userData.department}
    />

    <InfoCard
        title="Risk Score"
        value={userData.risk_score}
    />

    <InfoCard
        title="Risk Level"
        value={userData.risk_level}
    />

</div>

                <h3>
                    Indicators
                </h3>

                <ul>

                    {
                        userData.indicators.map(
                            (
                                item,
                                index
                            ) => (

                                <li
                                    key={index}
                                >
                                    {item}
                                </li>

                            )
                        )
                    }

                </ul>

                <h3>
                    Narrative
                </h3>

                <p>
                    {userData.narrative}
                </p>

                {
                    timeline.length > 0 && (

                        <Timeline
                            events={timeline}
                        />

                    )
                }

            </div>
        </>

    );

}

export default Investigation;