import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#00E5FF",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6"
];

function RiskChart({ data }) {

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
                Risk Distribution
            </h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={140}
                        label
                    >

                        {
                            data.map(
                                (
                                    entry,
                                    index
                                ) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RiskChart;