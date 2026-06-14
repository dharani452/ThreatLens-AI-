from sklearn.ensemble import IsolationForest


class MLAnomalyService:

    def prepare_features(self, df):

        feature_df = df.copy()

        feature_df["is_sensitive"] = (
            feature_df["resource_sensitivity"]
            .isin(["high", "critical"])
            .astype(int)
        )

        feature_df["is_failed"] = (
            feature_df["status"] == "failed"
        ).astype(int)

        feature_df["is_off_hours"] = (
            feature_df["time_classification"]
            == "off_hours"
        ).astype(int)

        features = feature_df[
            [
                "days_inactive",
                "is_sensitive",
                "is_failed",
                "is_off_hours"
            ]
        ]

        return features

    def detect_anomalies(self, df):

        features = self.prepare_features(df)

        model = IsolationForest(
            contamination=0.05,
            random_state=42
        )

        predictions = model.fit_predict(features)

        df["ml_anomaly"] = predictions

        return df