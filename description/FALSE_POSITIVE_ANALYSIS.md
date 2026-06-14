# False Positive Analysis

## Challenge

Insider threat systems often generate excessive alerts.

## Handled Scenarios

### Month-End Finance Activity

Finance users may access larger datasets during closing periods.

Mitigation:
Department-based baseline behavior.

### Administrative Users

Admins naturally access more sensitive resources.

Mitigation:
Privilege-aware risk scoring.

### Role Changes

Newly promoted employees may trigger unusual access patterns.

Mitigation:
Future integration with HR role-change feeds.

### Contractors

Limited historical behavior available.

Mitigation:
Short-term adaptive baselines.

### On-Call Engineers

After-hours access may be legitimate.

Mitigation:
Time-based anomaly scores combined with role context.

## Result

Precision: 91.58%
Recall: 90.00%
F1 Score: 0.91