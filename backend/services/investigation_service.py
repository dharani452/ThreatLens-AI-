class InvestigationService:

    def build_investigation_report(
        self,
        row,
        indicators,
        deviations,
        risk_score,
        risk_level,
        confidence,
        narrative,
        recommendations
    ):

        report = {
            "user_id": row["user_id"],
            "username": row["username"],
            "department": row["department"],
            "job_title": row["job_title"],

            "risk_score": risk_score,
            "risk_level": risk_level,
            "confidence": confidence,

            "indicators": indicators,
            "deviations": deviations,

            "narrative": narrative,
            "recommendations": recommendations
        }

        return report