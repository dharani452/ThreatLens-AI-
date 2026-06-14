function Timeline({ events }) {

    return (

        <div
            style={{
                marginTop: "40px"
            }}
        >

            <h2
                style={{
                    color: "#00E5FF",
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                User Activity Timeline
            </h2>

            {

                events?.map((event, index) => (

                    <div
                        key={index}
                        style={{
                            background: "#1F2937",
                            borderRadius: "12px",
                            padding: "15px",
                            marginBottom: "15px",
                            borderLeft:
                                "5px solid #00E5FF"
                        }}
                    >

                        <div
                            style={{
                                fontWeight: "bold",
                                color: "#00E5FF"
                            }}
                        >
                            {event.timestamp}
                        </div>

                        <div
                            style={{
                                marginTop: "8px"
                            }}
                        >
                            <strong>Action:</strong>
                            {" "}
                            {event.action}
                        </div>

                        <div>
                            <strong>Resource:</strong>
                            {" "}
                            {event.resource}
                        </div>

                        <div>
                            <strong>Status:</strong>
                            {" "}
                            {event.status}
                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default Timeline;