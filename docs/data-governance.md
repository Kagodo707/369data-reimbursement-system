# Data Governance: Test Claims vs Production Claims

## Ideal Decision
Archive logical visibility, not physical deletion.

## Why This Is Best
1. Preserves audit history.
2. Avoids accidental loss of real financial records.
3. Keeps production dashboards clean.
4. Supports legal and operational traceability.

## Recommended Approach
1. Add `Environment` column in `Claims_Register`.
2. Set `Environment = Pilot` for records created before go-live date.
3. Set `Environment = Production` for new records.
4. Add `IsArchived` column and set TRUE for pilot-only demo rows.
5. Make app dashboards and payment queues filter on `Environment = Production` and `IsArchived = FALSE`.

## Rule for Your Current Sheet
Given uncertainty about which old records are test vs real:
1. Keep all current records.
2. Tag all existing pre-go-live records as `Pilot`.
3. Do not include `Pilot` in production payment queues.
4. Allow leadership to unarchive/reclassify any legitimate claim manually.

## Operational Go-Live Control
Use `System_Settings` table with key:
- `GO_LIVE_DATE = 2026-06-01`

Any claim submitted before this date is marked Pilot by default.
