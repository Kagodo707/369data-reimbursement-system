# AppSheet Build Config

## 1) Required Tables
1. `Claims_Register`
2. `Projects_Register`
3. `Payment_Tracker`
4. `Leadership_Roles` (new helper table)
5. `System_Settings` (new helper table)

## 2) Add Helper Table: Leadership_Roles
Columns:
- Email (Key)
- FullName
- RoleTitle
- CanReview (Yes/No)
- CanApprove (Yes/No)
- IsFinance (Yes/No)

Seed rows:
- silver369data@gmail.com | Silver Omayo | CEO & CTO | TRUE | TRUE | TRUE
- emmanuel369data@gmail.com | Emmanuel Kagodo | Managing Director | TRUE | TRUE | FALSE
- maureen369data@gmail.com | Maureen Namanya | COO | TRUE | FALSE | TRUE
- barbara369data@gmail.com | Barbara Wandukwa | Chief Product Development Officer | TRUE | FALSE | FALSE
- enock369data@gmail.com | Enock Mayanja | Proposals and Grants Manager | TRUE | FALSE | FALSE

## 3) Add Helper Table: System_Settings
Columns:
- SettingKey (Key)
- SettingValue

Seed row:
- GO_LIVE_DATE | 2026-06-01

## 4) Recommended New Columns in Claims_Register
1. `Environment` (Enum: Pilot, Production)
2. `IsArchived` (Yes/No)
3. `CurrentOwnerEmail` (Email)
4. `ApprovalTier` (Text)

## 5) Suggested App Formula Expressions

### `ApprovalTier` App formula
```
IFS(
  [Amount Claimed] <= 100000, "Tier 1",
  AND([Amount Claimed] > 100000, [Amount Claimed] <= 500000), "Tier 2",
  [Amount Claimed] > 500000, "Tier 3"
)
```

### `Environment` Initial value
```
IF(
  DATE([Date Submitted]) < DATE(LOOKUP("GO_LIVE_DATE", "System_Settings", "SettingKey", "SettingValue")),
  "Pilot",
  "Production"
)
```

### `CurrentOwnerEmail` App formula
```
IFS(
  [Payment Status] = "Paid", "",
  IN([Review Status], {"New Submission", "Pending Review", "Queried"}), "maureen369data@gmail.com",
  [Review Status] = "Cleared for CEO/CFO Approval", "silver369data@gmail.com",
  [CEO/CFO Decision] = "Approved", "emmanuel369data@gmail.com",
  TRUE, ""
)
```

## 6) Slices

### `My_Claims`
Row filter:
```
[Email] = USEREMAIL()
```

### `Pending_Review`
Row filter:
```
AND(
  IN([Review Status], {"New Submission", "Pending Review", "Queried"}),
  IN(USEREMAIL(), SELECT(Leadership_Roles[Email], [CanReview] = TRUE))
)
```

### `CEO_Approval_Queue`
Row filter:
```
AND(
  [Review Status] = "Cleared for CEO/CFO Approval",
  USEREMAIL() = "silver369data@gmail.com"
)
```

### `Payments_Due`
Row filter:
```
AND(
  IN([CEO/CFO Decision], {"Approved", "Partially Approved"}),
  [Payment Status] <> "Paid"
)
```

### `Production_Claims_Only`
Row filter:
```
AND([Environment] = "Production", NOT([IsArchived]))
```

## 7) Actions (Claims_Register)

### `Approve Claim`
Only if this condition is true:
```
AND(
  USEREMAIL() = "silver369data@gmail.com",
  [Email] <> USEREMAIL(),
  [Review Status] = "Cleared for CEO/CFO Approval"
)
```
Set columns:
- CEO/CFO Decision = Approved
- Approved Amount = [Amount Claimed]
- Review Status = Approved

### `Partially Approve Claim`
Only if:
```
AND(
  USEREMAIL() = "silver369data@gmail.com",
  [Email] <> USEREMAIL(),
  [Review Status] = "Cleared for CEO/CFO Approval"
)
```
Set columns:
- CEO/CFO Decision = Partially Approved
- Review Status = Approved

### `Query Claim`
Only if:
```
AND(
  IN(USEREMAIL(), SELECT(Leadership_Roles[Email], [CanReview] = TRUE)),
  [Email] <> USEREMAIL(),
  [Payment Status] <> "Paid"
)
```
Set columns:
- Review Status = Queried

### `Reject Claim`
Only if:
```
AND(
  IN(USEREMAIL(), SELECT(Leadership_Roles[Email], [CanApprove] = TRUE)),
  [Email] <> USEREMAIL(),
  [Payment Status] <> "Paid"
)
```
Set columns:
- CEO/CFO Decision = Rejected
- Review Status = Rejected at Review

### `Mark Paid`
Only if:
```
AND(
  IN(USEREMAIL(), {"silver369data@gmail.com", "emmanuel369data@gmail.com", "maureen369data@gmail.com"}),
  IN([CEO/CFO Decision], {"Approved", "Partially Approved"}),
  [Payment Status] <> "Paid"
)
```
Set columns:
- Payment Status = Paid
- Date Paid = TODAY()

## 8) Bots/Automations
1. On CEO/CFO Decision change:
- Notify claimant email with decision and reason.

2. On Payment Status changed to Paid:
- Notify claimant and finance.

3. On new submission:
- Notify reviewer queue and CEO summary.
