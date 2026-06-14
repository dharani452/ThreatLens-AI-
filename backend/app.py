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

# Services
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

# Load Data
data = profile_service.merge_data()

# Run ML Detection
data = ml_service.detect_anomalies(data)

# Build Identity Context
identity_data = identity_service.build_identity_context(data)

# Build User Baselines
baselines = baseline_service.build_baseline(data)
reports = []


print("\n===== THREAT ANALYSIS =====")

# Show first 10 records
for _, row in data.iterrows():

    user_baseline = baselines.get(row["username"])

    deviations = baseline_service.detect_behavior_deviation(
        row,
        user_baseline
    )

    indicators = threat_service.detect_risk_indicators(
        row,
        deviations
    )

    score = risk_service.calculate_risk(indicators)
    level = risk_service.get_risk_level(score)
    confidence = risk_service.get_confidence(indicators)

    narrative = narrative_service.generate_narrative(
        row,
        indicators
    )

    recommendations = (
        recommendation_service.generate_recommendations(
            indicators
        )
    )

    deviation_text = (
        ", ".join(deviations)
        if deviations
        else "None Detected"
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

    dashboard_summary = (
        dashboard_service.get_dashboard_summary(
            data,
            reports
        )
    )

    print(f"""
================================================

User: {row['username']}

Action:
{row['action']}

Resource:
{row['resource']}

Behavior Deviations:
{deviation_text}

Indicators:
{indicators}

Risk Score:
{score}

Risk Level:
{level}

Confidence:
{confidence}%

Explanation:
{narrative}

Recommended Actions:
""")

    for rec in recommendations:
        print("✓", rec)

    print("\n================================================")


# Users having behavior deviations
print("\n===== BEHAVIOR DEVIATIONS FOUND =====")

count = 0

for _, row in data.iterrows():

    user_baseline = baselines.get(row["username"])

    deviations = baseline_service.detect_behavior_deviation(
        row,
        user_baseline
    )

    if deviations:

        print(
            row["username"],
            "|",
            row["action"],
            "|",
            row["resource"],
            "|",
            deviations
        )

        count += 1

print("\nTotal Deviations Found:", count)


# High Risk Users
print("\n===== HIGH RISK USERS =====")

for _, row in data.iterrows():

    user_baseline = baselines.get(row["username"])

    deviations = baseline_service.detect_behavior_deviation(
        row,
        user_baseline
    )

    indicators = threat_service.detect_risk_indicators(
        row,
        deviations
    )

    if len(indicators) >= 2:

        print(
            row["username"],
            "->",
            indicators
        )


# ML Anomalies
print("\n===== ML ANOMALIES =====")

anomalies = data[
    data["ml_anomaly"] == -1
]

print("Total Anomalies Found:", len(anomalies))

print(
    anomalies[
        [
            "username",
            "action",
            "resource",
            "days_inactive",
            "ml_anomaly"
        ]
    ].head(10)
)


print("\n===== THREAT TIMELINE =====")

suspicious_users = set()

report_lookup = {}

for _, row in data.iterrows():

    user_baseline = baselines.get(row["username"])

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

    if len(indicators) >= 2:
        suspicious_users.add(
            row["username"]
        )

for rpt in reports:
    report_lookup[rpt["username"]] = rpt

for username in list(suspicious_users)[:3]:

    print(f"\nUser Timeline: {username}")

    timeline = (
        timeline_service.build_user_timeline(
            data,
            username
        )
    )

    for event in timeline[:10]:

        print(
            f"{event['timestamp']} | "
            f"{event['action']} | "
            f"{event['resource']}"
        )

    report = report_lookup.get(username)

    if report:

        print("\n===== INVESTIGATION REPORT =====")

        print(f"User: {report['username']}")
        print(f"Department: {report['department']}")
        print(f"Risk Score: {report['risk_score']}")
        print(f"Risk Level: {report['risk_level']}")
        print(f"Confidence: {report['confidence']}%")

        print("\nIndicators:")
        for item in report["indicators"]:
            print("-", item)
        else:
            print("NO Indicators")

        print("\nDeviations:")

        if report["deviations"]:
            for item in report["deviations"]:
                print("-", item)
        else:
            print("None Detected")

        print("\nNarrative:")
        print(report["narrative"])

        print("\nRecommendations:")
        for item in report["recommendations"]:
            print("-", item)

print("\n===== DASHBOARD SUMMARY =====")

for key, value in dashboard_summary.items():

    print(f"{key}: {value}")

print("\n===== TOP THREATS =====")

high_risk_reports = [
    r for r in reports
    if r["risk_level"] in ["HIGH", "CRITICAL"]
]

for report in high_risk_reports[:5]:

    print(
        report["username"],
        "|",
        report["risk_level"],
        "|",
        report["risk_score"]
    )
