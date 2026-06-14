import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function ThreatChart({ data }) {

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
                Top Threat Indicators
            </h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <BarChart
                    data={data}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1E293B"
                    />

                    <XAxis
                        dataKey="name"
                        stroke="#CBD5E1"
                    />

                    <YAxis
                        stroke="#CBD5E1"
                    />

                    <Tooltip />

                    <Bar
                        dataKey="value"
                        fill="#00E5FF"
                        radius={[
                            8,
                            8,
                            0,
                            0
                        ]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ThreatChart;