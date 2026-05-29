# 369data Reimbursement App - How To Use

App link:
- https://www.appsheet.com/Template/AppDef?appName=369dataReimbursementTracker-898606684&utm_source=share_app_link

Source spreadsheet:
- 369data Reimbursement Tracker - LIVE APPSHEET SOURCE
- ID: 1mXCEqQwaOaaEtIA3E2eGwkPLrvDZhMKlevqoeT6WKQs

## 1) Who Uses What

Leadership roles:
- Silver Omayo (CEO & CTO): final approval
- Emmanuel Kagodo (Managing Director): management oversight and payment follow-up
- Maureen Namanya (COO): operational review queue owner
- Barbara Wandukwa: reviewer
- Enock Mayanja: reviewer

Claimants:
- Submit reimbursement requests and track status.

## 2) Claim Lifecycle

1. Claimant submits claim with evidence.
2. Claim enters review queue.
3. Reviewer checks project link, amount, and evidence.
4. Claim moves to CEO/CFO approval queue.
5. Decision is made: Approved, Partially Approved, Queried, or Rejected.
6. Approved claims move to payment queue.
7. Finance/leadership marks Paid when disbursed.

## 3) Main App Views (Recommended)

- My Claims: shows claims submitted by the logged-in user.
- Pending Review: shows claims waiting reviewer action.
- CEO Approval Queue: claims cleared for final approval.
- Payments Due: approved claims not yet paid.
- Dashboard: totals, statuses, and outstanding balances.

## 4) Meaning of Status Fields

Review Status:
- New Submission
- Pending Review
- Queried
- Cleared for CEO/CFO Approval
- Rejected at Review

CEO/CFO Decision:
- Pending CEO/CFO Approval
- Approved
- Partially Approved
- Queried
- Rejected

Payment Status:
- Unpaid
- Paid

## 5) Day-to-Day Usage

For claimants:
1. Open app.
2. Submit claim with complete details and proof.
3. Check My Claims for updates.
4. If Queried, update details and re-submit evidence.

For reviewers:
1. Open Pending Review.
2. Validate evidence and project authorization.
3. Set Queried if clarification is needed.
4. Move valid claims to Cleared for CEO/CFO Approval.

For CEO/CTO:
1. Open CEO Approval Queue.
2. Approve, partially approve, query, or reject.
3. Ensure no self-approval on own claims.

For finance/operations:
1. Open Payments Due.
2. Process disbursement.
3. Record payment reference, date paid, and channel.
4. Mark claim Paid.

## 6) Governance Rules

- Every claim must be project-linked.
- Every cash claim must include evidence.
- No self-approval by claimant.
- Claims before go-live can be flagged Pilot and excluded from production dashboard slices.
- Keep historical claims for audit (do not hard-delete).

## 7) Weekly Operating Cadence

- Friday: review and clear pending claims.
- Weekly: CEO/CTO approval session.
- Weekly/biweekly: payment run for approved claims.
- Month-end: reconcile Paid claims and outstanding balances.

## 8) Troubleshooting

If evidence links are missing:
- Verify file upload permission in form.
- Confirm claim row has evidence URL.

If claim not visible in expected view:
- Check role-based slice filters.
- Check Review Status / CEO Decision / Payment Status fields.

If decisions are not notifying users:
- Recheck Apps Script trigger and email recipients.

## 9) Admin Checklist for New Team Members

1. Add user email to allowed app users.
2. Assign role in Leadership_Roles (if table is configured).
3. Verify user can see correct views only.
4. Run one test claim and verify notification + status transitions.

## 10) Definition of Done for Go-Live

- End-to-end test claim completed successfully.
- Reviewer, approver, and payment flows all validated.
- Dashboard reflects correct totals.
- Leadership confirms adoption.
