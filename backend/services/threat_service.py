class ThreatService:

    def detect_risk_indicators(
        self,
        row,
        deviations=None
    ):

        indicators = []

        if row["time_classification"] == "off_hours":
            indicators.append("OFF_HOURS_ACCESS")

        if str(row["resource_sensitivity"]).lower() in [
            "high",
            "critical",
            "restricted"
        ]:
            indicators.append(
                "SENSITIVE_RESOURCE_ACCESS"
            )

        if row["days_inactive"] > 30:
            indicators.append(
                "INACTIVE_ACCOUNT"
            )

        if str(row["privilege_level"]).lower() == "admin":
            indicators.append(
                "ADMIN_PRIVILEGE"
            )

        if str(row["action"]).lower() == "export_data":
            indicators.append(
                "EXPORT_DATA"
            )

        if str(row["status"]).lower() == "failed":
            indicators.append(
                "FAILED_ACCESS"
            )

        if deviations:
            indicators.extend(deviations)

        if row.get("ml_anomaly") == -1:
            indicators.append("ML_ANOMALY")
        

        return indicators