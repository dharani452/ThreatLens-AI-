# Scaling ThreatLens AI to 1M+ Events per Day

## Current Prototype

- CSV Input
- Pandas Processing
- Flask API

Suitable for:
- 1,000 - 100,000 events

## Production Architecture

Data Sources
↓
Kafka Event Stream
↓
Apache Flink / Spark Streaming
↓
Feature Store
↓
ML Inference Service
↓
Risk Engine
↓
PostgreSQL / Elasticsearch
↓
Dashboard

## Scalability Techniques

- Partitioned Event Processing
- Distributed Computing
- Streaming Analytics
- Real-Time Alert Generation
- Horizontal Scaling

## Estimated Capacity

1M+ events/day

Detection latency:
< 5 minutes