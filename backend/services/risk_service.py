class RiskService:

    RISK_WEIGHTS = {
    "SENSITIVE_RESOURCE_ACCESS": 30,
    "INACTIVE_ACCOUNT": 25,
    "ADMIN_PRIVILEGE": 20,
    "OFF_HOURS_ACCESS": 20,
    "EXPORT_DATA": 25,
    "FAILED_ACCESS": 15,
    "UNUSUAL_ACTION": 20,
    "UNUSUAL_RESOURCE": 20,
    "ML_ANOMALY": 30
}


    def calculate_risk(self, indicators):

        score = 0

        for indicator in indicators:
            score += self.RISK_WEIGHTS.get(indicator, 0)

        return min(score, 100)

    def get_risk_level(self, score):

        if score >= 80:
            return "CRITICAL"

        elif score >= 60:
            return "HIGH"

        elif score >= 30:
            return "MEDIUM"

        else:
            return "LOW"

    def get_confidence(self, indicators):

        count = len(indicators)

        confidence = min(50 + (count * 10), 95)

        return confidence