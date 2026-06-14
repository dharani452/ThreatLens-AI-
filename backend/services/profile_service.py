import pandas as pd


class ProfileService:

    def __init__(self):
        self.profile_path = "data/user_profiles.xlsx"
        self.logs_path = "data/data_access_logs.xlsx"

    def load_profiles(self):
        profiles = pd.read_excel(self.profile_path)
        return profiles

    def load_logs(self):
        logs = pd.read_excel(self.logs_path)
        return logs

    def merge_data(self):
        profiles = self.load_profiles()
        logs = self.load_logs()

        merged = logs.merge(
            profiles,
            on=["user_id", "username"],
            how="left"
        )

        return merged