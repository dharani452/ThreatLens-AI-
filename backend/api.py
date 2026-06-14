from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)
from services.profile_service import ProfileService
from services.identity_service import IdentityService
from services.threat_service import ThreatService
from services.risk_service import RiskService
from services.narrative_service import NarrativeService
from services.baseline_service import BaselineService
from services.recommendation_service import RecommendationService
from services.ml_anomaly_service import MLAnomalyService
from services.timeline_service import TimelineService
from services.investigation_service import InvestigationService
from services.dashboard_service import DashboardService
from services.network_graph_service import NetworkGraphService

profile_service = ProfileService()
identity_service = IdentityService()
threat_service = ThreatService()
risk_service = RiskService()
narrative_service = NarrativeService()
baseline_service = BaselineService()
recommendation_service = RecommendationService()
ml_service = MLAnomalyService()
timeline_service = TimelineService()
investigation_service = InvestigationService()
dashboard_service = DashboardService()
network_graph_service = NetworkGraphService()

data = profile_service.merge_data()
print(data.columns.tolist())

data = ml_service.detect_anomalies(data)

baselines = baseline_service.build_baseline(data)
@app.route("/")
def home():
    return jsonify({
        "message": "ThreatLens AI API Running"
    })
@app.route("/api/dashboard-summary")
def get_dashboard_summary():
    print("Dashboard API called")

    reports = []

    for _, row in data.iterrows():

        user_baseline = baselines.get(
            row["username"]
        )

        deviations = (
            baseline_service.detect_behavior_deviation(
                row,
                user_baseline
            )
        )

        indicators = (
            threat_service.detect_risk_indicators(
                row,
                deviations
            )
        )

        score = risk_service.calculate_risk(
            indicators
        )

        level = risk_service.get_risk_level(
            score
        )

        confidence = (
            risk_service.get_confidence(
                indicators
            )
        )

        narrative = (
            narrative_service.generate_narrative(
                row,
                indicators
            )
        )

        recommendations = (
            recommendation_service.generate_recommendations(
                indicators
            )
        )

        report = (
            investigation_service.build_investigation_report(
                row,
                indicators,
                deviations,
                score,
                level,
                confidence,
                narrative,
                recommendations
            )
        )

        reports.append(report)

    summary = (
        dashboard_service.get_dashboard_summary(
            data,
            reports
        )
    )

    return jsonify(summary)

@app.route("/api/high-risk-users")
def get_high_risk_users():

    high_risk_users = []

    for _, row in data.iterrows():

        user_baseline = baselines.get(
            row["username"]
        )

        deviations = (
            baseline_service.detect_behavior_deviation(
                row,
                user_baseline
            )
        )

        indicators = (
            threat_service.detect_risk_indicators(
                row,
                deviations
            )
        )

        score = risk_service.calculate_risk(
            indicators
        )

        level = risk_service.get_risk_level(
            score
        )

        if level in ["HIGH", "CRITICAL"]:

            high_risk_users.append(
                {
                    "username": row["username"],
                    "department": row["department"],
                    "risk_score": score,
                    "risk_level": level
                }
            )

    return jsonify(high_risk_users)

@app.route("/api/user/<username>")
def get_user_report(username):

    for _, row in data.iterrows():

        if row["username"] == username:

            user_baseline = baselines.get(
                row["username"]
            )

            deviations = (
                baseline_service.detect_behavior_deviation(
                    row,
                    user_baseline
                )
            )

            indicators = (
                threat_service.detect_risk_indicators(
                    row,
                    deviations
                )
            )

            score = risk_service.calculate_risk(
                indicators
            )

            level = risk_service.get_risk_level(
                score
            )

            confidence = (
                risk_service.get_confidence(
                    indicators
                )
            )

            narrative = (
                narrative_service.generate_narrative(
                    row,
                    indicators
                )
            )

            recommendations = (
                recommendation_service.generate_recommendations(
                    indicators
                )
            )

            report = (
                investigation_service.build_investigation_report(
                    row,
                    indicators,
                    deviations,
                    score,
                    level,
                    confidence,
                    narrative,
                    recommendations
                )
            )

            return jsonify(report)

    return jsonify({
        "error": "User not found"
    }), 404


    return jsonify(timeline)

@app.route("/api/graph-data")
def get_graph_data():

    nodes = []
    edges = []

    added_users = set()
    added_resources = set()

    for _, row in data.iterrows():

        username = row["username"]
        resource = row["resource"]

        if username not in added_users:

            nodes.append({
                "id": username,
                "type": "user"
            })

            added_users.add(username)

        if resource not in added_resources:

            nodes.append({
                "id": resource,
                "type": "resource"
            })

            added_resources.add(resource)

        edges.append({
            "source": username,
            "target": resource
        })

    return jsonify({
        "nodes": nodes,
        "edges": edges
    })

@app.route("/api/top-threats")
def get_top_threats():

    threat_counts = {}

    for _, row in data.iterrows():

        user_baseline = baselines.get(
            row["username"]
        )

        deviations = (
            baseline_service.detect_behavior_deviation(
                row,
                user_baseline
            )
        )

        indicators = (
            threat_service.detect_risk_indicators(
                row,
                deviations
            )
        )

        for indicator in indicators:

            threat_counts[indicator] = (
                threat_counts.get(
                    indicator,
                    0
                ) + 1
            )

    return jsonify(threat_counts)

@app.route("/api/risk-distribution")
def get_risk_distribution():

    user_risks = {}

    for _, row in data.iterrows():

        username = row["username"]

        user_baseline = baselines.get(
            username
        )

        deviations = (
            baseline_service.detect_behavior_deviation(
                row,
                user_baseline
            )
        )

        indicators = (
            threat_service.detect_risk_indicators(
                row,
                deviations
            )
        )

        score = risk_service.calculate_risk(
            indicators
        )

        current_score = user_risks.get(
            username,
            0
        )

        user_risks[username] = max(
            current_score,
            score
        )

    distribution = {
        "LOW": 0,
        "MEDIUM": 0,
        "HIGH": 0,
        "CRITICAL": 0
    }

    for score in user_risks.values():

        level = risk_service.get_risk_level(
            score
        )

        distribution[level] += 1

    return jsonify(distribution)

@app.route("/api/system-health")
def system_health():

    return jsonify({
        "status": "Operational",
        "users_monitored": data["username"].nunique(),
        "events_processed": len(data),
        "anomalies_detected": len(
            data[data["ml_anomaly"] == -1]
        ),
        "engine": "ThreatLens AI v1.0"
    })

@app.route("/api/network-graph")
def get_network_graph():

    graph = (
        network_graph_service.build_graph(
            data
        )
    )

    return jsonify(graph)

@app.route("/api/users")
def get_users():

    users = sorted(
        data["username"]
        .dropna()
        .unique()
        .tolist()
    )

    return jsonify(users)
@app.route("/api/investigation/<username>")
def get_investigation(username):

    user = data[
        data["username"] == username
    ]

    if len(user) == 0:

        return jsonify({
            "error": "User not found"
        })

    row = user.iloc[0]

    indicators = threat_service.detect_risk_indicators(
        row
    )

    risk_score = risk_service.calculate_risk(
        indicators
    )

    risk_level = risk_service.get_risk_level(
        risk_score
    )

    confidence = risk_service.get_confidence(
        indicators
    )

    narrative = narrative_service.generate_narrative(
        row,
        indicators
    )

    recommendations = recommendation_service.generate_recommendations(
        indicators
    )

    return jsonify({

        "username":
            row["username"],

        "department":
            row["department"],

        "job_title":
            row["job_title"],
        "privilege_level": row["privilege_level"],
        "days_inactive": int(row["days_inactive"]),
        "systems_access": row["systems_access"],

        "risk_score":
            risk_score,

        "risk_level":
            risk_level,

        "confidence":
            confidence,

        "indicators":
            indicators,

        "narrative":
            narrative,

        "recommendations":
            recommendations
        

    })

@app.route(
    "/api/timeline/<username>",
    methods=["GET"]
)
def get_user_timeline(username):

    timeline = timeline_service.get_user_timeline(
        data,
        username
    )

    return jsonify(timeline)

if __name__ == "__main__":
    app.run(debug=True)