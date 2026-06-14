class RecommendationService:

    def generate_recommendations(self, indicators):

        recommendations = []

        if "INACTIVE_ACCOUNT" in indicators:
            recommendations.append(
                "Verify account ownership and recent activity."
            )

        if "EXPORT_DATA" in indicators:
            recommendations.append(
                "Review exported records for sensitive information."
            )

        if "SENSITIVE_RESOURCE_ACCESS" in indicators:
            recommendations.append(
                "Audit access to sensitive resources."
            )

        if "ADMIN_PRIVILEGE" in indicators:
            recommendations.append(
                "Review privileged account actions."
            )

        if "FAILED_ACCESS" in indicators:
            recommendations.append(
                "Investigate repeated access failures."
            )

        if "UNUSUAL_ACTION" in indicators:
            recommendations.append(
                "Investigate abnormal user actions."
            )

        if "UNUSUAL_RESOURCE" in indicators:
            recommendations.append(
                "Validate the business need for resource access."
            )

        if "OFF_HOURS_ACCESS" in indicators:
            recommendations.append(
                "Verify off-hours activity with the user."
            )

        if not recommendations:
            recommendations.append(
                "No immediate action required. Continue monitoring."
            )
        if "ML_ANOMALY" in indicators:
            recommendations.append(
                "Investigate machine learning anomaly alert."
    )

        return recommendations