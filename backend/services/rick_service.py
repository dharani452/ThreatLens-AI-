class RiskService:

    def calculate_risk(self, indicators):

        score = 0

        if "SENSITIVE_RESOURCE_ACCESS" in indicators:
            score += 25

        if "INACTIVE_ACCOUNT" in indicators:
            score += 25

        if "ADMIN_PRIVILEGE" in indicators:
            score += 15

        if "OFF_HOURS_ACCESS" in indicators:
            score += 15

        if "EXPORT_DATA" in indicators:
            score += 20

        if "FAILED_ACCESS" in indicators:
            score += 10

        return score

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

        confidence = min(50 + count * 10, 95)

        return confidence