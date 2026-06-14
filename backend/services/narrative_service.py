class NarrativeService:

    def generate_narrative(self, row, indicators):

        messages = []

        if "SENSITIVE_RESOURCE_ACCESS" in indicators:
            messages.append(
                "User accessed sensitive resources."
            )

        if "INACTIVE_ACCOUNT" in indicators:
            messages.append(
                f"Account inactive for {row['days_inactive']} days."
            )

        if "ADMIN_PRIVILEGE" in indicators:
            messages.append(
                "Administrative privileges were used."
            )

        if "EXPORT_DATA" in indicators:
            messages.append(
                "Data export activity detected."
            )

        if "OFF_HOURS_ACCESS" in indicators:
            messages.append(
                "Activity occurred outside business hours."
            )

        if "FAILED_ACCESS" in indicators:
            messages.append(
                "Failed access attempts detected."
            )
        if "ML_ANOMALY" in indicators:
            messages.append(
                "Machine learning model detected abnormal behavior."
    )

        return " ".join(messages)