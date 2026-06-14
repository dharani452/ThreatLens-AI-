# ThreatLens AI

## Overview
ThreatLens AI is an Insider Threat Detection and Data Access Audit platform that detects abnormal user behavior using machine learning and behavioral analytics.

## Features

- User Baseline Profiling
- ML Anomaly Detection (Isolation Forest)
- Risk Scoring Engine
- Investigation Center
- Threat Network Graph
- User Activity Timeline
- AI Investigation Narratives
- Recommended Actions

## Tech Stack

Frontend:
- React
- Axios
- Cytoscape.js

Backend:
- Flask
- Pandas
- Scikit-learn

## Detection Performance

Precision: 91.58%
Recall: 90.00%
F1 Score: 0.91

## Run Project

Backend:

python api.py

Frontend:

npm install
npm run dev

## Architecture

CSV Logs
↓
Data Processing
↓
Baseline Engine
↓
ML Anomaly Detection
↓
Risk Scoring
↓
Investigation Engine
↓
Dashboard