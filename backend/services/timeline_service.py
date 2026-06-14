class TimelineService:

    def get_user_timeline(
        self,
        data,
        username
    ):

        user_events = data[
            data["username"] == username
        ]

        user_events = user_events.sort_values(
            by="timestamp"
        )

        timeline = []

        for _, row in user_events.iterrows():

            timeline.append({

                "timestamp":
                    str(row["timestamp"]),

                "action":
                    row["action"],

                "resource":
                    row["resource"],

                "status":
                    row["status"]

            })

        return timeline