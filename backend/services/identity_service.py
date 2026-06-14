import pandas as pd


class IdentityService:

    def build_identity_context(self, df):

        identity_df = df[
            [
                "user_id",
                "username",
                "department",
                "job_title",
                "privilege_level",
                "days_inactive",
                "is_active",
                "systems_access"
            ]
        ].drop_duplicates()

        return identity_df