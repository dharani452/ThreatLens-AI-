# ThreatLens AI Technical Design

## Data Sources

- user_profiles.csv
- data_access_logs.csv

## Processing Pipeline

1. Data Ingestion
2. User Profile Merge
3. Baseline Creation
4. Deviation Detection
5. ML Anomaly Detection
6. Risk Scoring
7. Investigation Report Generation

## Machine Learning

Model:
- Isolation Forest

Features:
- Days Inactive
- Resource Sensitivity
- Privilege Level
- Time Classification
- Access Frequency

## Risk Scoring

Indicators:
- Sensitive Resource Access
- Off Hours Access
- Inactive Account
- Admin Privilege
- Failed Access
- Export Data
- ML Anomaly

Risk Levels:
- LOW
- MEDIUM
- HIGH
- CRITICAL