function InfoCard({
    title,
    value
}) {

    return (

        <div
            style={{
                background:
                    "rgba(255,255,255,0.05)",
                padding:
                    "20px",
                borderRadius:
                    "16px",
                minWidth:
                    "220px",
                border:
                    "1px solid rgba(255,255,255,0.1)"
            }}
        >

            <h4>
                {title}
            </h4>

            <h2>
                {value}
            </h2>

        </div>

    );

}

export default InfoCard;