class BaselineService:

    def build_baseline(self, df):

        baselines = {}

        grouped = df.groupby("username")

        for username, group in grouped:

            common_actions = (
                group["action"]
                .value_counts()
                .head(3)
                .index
                .tolist()
            )

            common_resources = (
                group["resource"]
                .value_counts()
                .head(5)
                .index
                .tolist()
            )

            baselines[username] = {
                "common_actions": common_actions,
                "common_resources": common_resources,
                "total_accesses": len(group)
            }

        return baselines

    def detect_behavior_deviation(self, row, user_baseline):

        deviations = []

        if row["action"] not in user_baseline["common_actions"]:
            deviations.append("UNUSUAL_ACTION")

        if row["resource"] not in user_baseline["common_resources"]:
            deviations.append("UNUSUAL_RESOURCE")

        return deviations