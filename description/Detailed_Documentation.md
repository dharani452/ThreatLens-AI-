# ThreatLens AI – Detailed Technical Documentation

## 1. Project Overview

ThreatLens AI is an Insider Threat Detection and Data Access Audit platform designed to identify abnormal user behavior and potential data exfiltration risks within enterprise environments.

The platform analyzes user access logs, establishes behavioral baselines, applies machine learning-based anomaly detection, calculates risk scores, and generates investigation reports for security analysts.

---

# 2. Problem Statement

Modern enterprises generate millions of data access events daily across:

* SQL Databases
* Data Lakes
* BI Platforms
* Cloud Storage
* File Shares
* APIs

Traditional monitoring solutions produce excessive false positives and often fail to provide sufficient context for investigations.

The objective of ThreatLens AI is to:

* Detect suspicious access patterns
* Identify insider threats
* Prioritize risks
* Assist analysts during investigations
* Reduce alert fatigue

---

# 3. System Architecture

## High-Level Architecture

User Profiles + Access Logs
↓
Data Ingestion Layer
↓
Data Processing Layer
↓
Behavioral Baseline Engine
↓
ML Anomaly Detection Engine
↓
Risk Scoring Engine
↓
Investigation Engine
↓
ThreatLens Dashboard

---

## Components

### Backend

* Flask REST API
* Pandas Data Processing
* Scikit-Learn ML Models

### Frontend

* React
* Axios
* Cytoscape.js

### Data Sources

* user_profiles.xlsx
* data_access_logs.xlsx

---

# 4. System Workflow

## Step 1 – Data Ingestion

User profile data and access logs are loaded into the system.

Collected information includes:

* Username
* Department
* Job Role
* Privilege Level
* Access Time
* Resource Accessed
* Access Status
* Resource Sensitivity

---

## Step 2 – Data Enrichment

Profile data is merged with access logs to provide user context.

This allows the platform to evaluate:

* User role
* Department
* Access privileges
* Account inactivity

during threat analysis.

---

## Step 3 – Baseline Creation

The Baseline Engine creates normal behavioral profiles for each user.

Examples:

* Typical login hours
* Commonly accessed systems
* Normal access frequency
* Resource usage patterns

These baselines are used to detect deviations.

---

## Step 4 – Threat Detection

The Threat Detection Engine evaluates each event using rule-based indicators.

Examples:

* Off-hours access
* Sensitive resource access
* Administrative actions
* Failed access attempts
* Data export activity

Detected indicators are forwarded to the risk engine.

---

# 5. Analysis Algorithms

## Rule-Based Analysis

The platform identifies suspicious activity using predefined security rules.

Examples:

### Off-Hours Access

Condition:

Access occurs outside business hours.

### Sensitive Resource Access

Condition:

Resource sensitivity is classified as:

* High
* Critical
* Restricted

### Inactive Account Usage

Condition:

Account inactivity exceeds 30 days.

### Administrative Privilege Usage

Condition:

User executes privileged operations.

---

# 6. Machine Learning Model

## Isolation Forest

ThreatLens AI uses Isolation Forest for anomaly detection.

### Why Isolation Forest?

Advantages:

* Unsupervised learning
* Effective for anomaly detection
* Handles high-dimensional data
* Requires no labeled training data

### Features Used

* Resource Sensitivity
* Time Classification
* Privilege Level
* Account Inactivity
* Access Status
* User Department
* Action Type

### Output

Prediction:

* 1 = Normal
* -1 = Anomaly

Detected anomalies are incorporated into risk scoring.

---

# 7. Risk Scoring Engine

The Risk Engine assigns a numerical score between 0 and 100.

## Risk Indicators

| Indicator                 | Weight |
| ------------------------- | ------ |
| Sensitive Resource Access | 30     |
| Inactive Account          | 25     |
| Admin Privilege           | 20     |
| Off Hours Access          | 20     |
| Export Data               | 25     |
| Failed Access             | 15     |
| ML Anomaly                | 30     |

## Risk Levels

| Score  | Level    |
| ------ | -------- |
| 0-29   | LOW      |
| 30-59  | MEDIUM   |
| 60-79  | HIGH     |
| 80-100 | CRITICAL |

---

# 8. Investigation Engine

The Investigation Engine generates analyst-friendly reports.

Each report contains:

* User Information
* Risk Score
* Risk Level
* Threat Indicators
* Investigation Narrative
* Recommendations
* Activity Timeline

### Narrative Generation

Narratives are automatically generated using detected indicators.

Example:

"User accessed sensitive resources and performed administrative actions after prolonged account inactivity."

---

# 9. User Interface Design

## Dashboard

Displays:

* Overall threat visibility
* User risk summaries
* Investigation access

## Investigation Center

Features:

* User search
* Risk overview
* Threat indicators
* AI-generated narrative
* Recommendations
* User activity timeline

## Network Graph

Visualizes relationships between:

* Users
* Systems
* Resources

using Cytoscape.js.

---

# 10. Scalability Design

Current implementation processes local datasets using Pandas.

For enterprise deployment:

Data Sources
↓
Apache Kafka
↓
Apache Flink
↓
Feature Store
↓
ML Inference Service
↓
ThreatLens Dashboard

Expected Capacity:

* 1M+ daily events

Target Detection Time:

* Under 5 minutes

---

# 11. Performance Results

Model Evaluation Results:

Precision: 91.58%

Recall: 90.00%

F1 Score: 0.91

These results exceed the targets defined in the challenge requirements.

---

# 12. Future Enhancements

Future improvements include:

* Real-time streaming detection
* DLP integration
* Automated incident response
* PDF report generation
* Trend analysis dashboards
* Advanced behavioral profiling

---

# Conclusion

ThreatLens AI successfully addresses the challenge of detecting abnormal data access behavior and insider threats. By combining behavioral baselines, machine learning anomaly detection, risk scoring, and investigation workflows, the platform enables security teams to identify and investigate high-risk activities efficiently while minimizing false positives.
