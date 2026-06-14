import { useNavigate } from "react-router-dom";

function UserTable({ users }) {

    const navigate = useNavigate();

    return (

        <div
            style={{
                background:
                    "rgba(255,255,255,0.05)",
                backdropFilter:
                    "blur(10px)",
                border:
                    "1px solid rgba(255,255,255,0.1)",
                borderRadius:
                    "16px",
                padding:
                    "20px",
                marginTop:
                    "30px",
                boxShadow:
                    "0 0 20px rgba(0,229,255,0.15)"
            }}
        >

            <h2
                style={{
                    color:
                        "#00E5FF",
                    marginBottom:
                        "20px"
                }}
            >
                High Risk Users
            </h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse:
                        "collapse",
                    color: "white"
                }}
            >

                <thead>

                    <tr
                        style={{
                            borderBottom:
                                "1px solid rgba(255,255,255,0.1)"
                        }}
                    >

                        <th
                            style={{
                                padding:
                                    "15px",
                                textAlign:
                                    "left"
                            }}
                        >
                            Username
                        </th>

                        <th
                            style={{
                                padding:
                                    "15px",
                                textAlign:
                                    "left"
                            }}
                        >
                            Department
                        </th>

                        <th
                            style={{
                                padding:
                                    "15px",
                                textAlign:
                                    "left"
                            }}
                        >
                            Risk Score
                        </th>

                        <th
                            style={{
                                padding:
                                    "15px",
                                textAlign:
                                    "left"
                            }}
                        >
                            Risk Level
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map(
                            (
                                user,
                                index
                            ) => (

                                <tr
                                    key={index}
                                    onClick={() =>
                                        navigate(
                                            `/user/${user.username}`
                                        )
                                    }
                                    style={{
                                        cursor:
                                            "pointer",
                                        transition:
                                            "0.3s"
                                    }}
                                    onMouseEnter={(e) => {

                                        e.currentTarget.style.background =
                                            "rgba(0,229,255,0.1)";

                                    }}
                                    onMouseLeave={(e) => {

                                        e.currentTarget.style.background =
                                            "transparent";

                                    }}
                                >

                                    <td
                                        style={{
                                            padding:
                                                "15px"
                                        }}
                                    >
                                        {user.username}
                                    </td>

                                    <td
                                        style={{
                                            padding:
                                                "15px"
                                        }}
                                    >
                                        {user.department}
                                    </td>

                                    <td
                                        style={{
                                            padding:
                                                "15px",
                                            color:
                                                "#00E5FF",
                                            fontWeight:
                                                "bold"
                                        }}
                                    >
                                        {user.risk_score}
                                    </td>

                                    <td
                                        style={{
                                            padding:
                                                "15px"
                                        }}
                                    >
                                        {user.risk_level}
                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    );

}

export default UserTable;