class DashboardService:

    def get_dashboard_summary(
        self,
        data,
        reports
    ):

        total_users = (
            data["username"]
            .nunique()
        )

        high_risk_users = len(
            set(
                [
                    r["username"]
                    for r in reports
                    if r["risk_level"] == "HIGH"
                ]
            )
        )

        critical_users = len(
            set(
                [
                    r["username"]
                    for r in reports
                    if r["risk_level"] == "CRITICAL"
                ]
            )
        )

        ml_anomalies = len(
            data[
                data["ml_anomaly"] == -1
            ]
        )

        inactive_accounts = len(
            data[
                data["days_inactive"] > 30
            ]["username"].unique()
        )

        return {
            "total_users": total_users,
            "high_risk_users": high_risk_users,
            "critical_users": critical_users,
            "ml_anomalies": ml_anomalies,
            "inactive_accounts": inactive_accounts
        }