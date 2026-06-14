function StatsCard({ title, value }) {

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
                minWidth:
                    "220px",
                boxShadow:
                    "0 0 20px rgba(0,229,255,0.15)",
                transition:
                    "0.3s",
                cursor:
                    "pointer"
            }}
            onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                    "translateY(-5px)";

                e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(0,229,255,0.35)";

            }}
            onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                    "translateY(0px)";

                e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(0,229,255,0.15)";

            }}
        >

            <h3
                style={{
                    color:
                        "#94A3B8",
                    marginBottom:
                        "12px",
                    fontSize:
                        "16px"
                }}
            >
                {title}
            </h3>

            <h1
                style={{
                    color:
                        "#00E5FF",
                    fontSize:
                        "36px",
                    margin:
                        0,
                    fontWeight:
                        "700"
                }}
            >
                {value}
            </h1>

        </div>

    );

}

export default StatsCard;