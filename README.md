# 369data Reimbursement System

This repository tracks the production rollout of the 369data reimbursement workflow built on:
- Google Forms
- Google Sheets
- Google Drive
- AppSheet
- Google Apps Script

## Current Production Data Source
- Spreadsheet: `369data Reimbursement Tracker - LIVE APPSHEET SOURCE`
- Spreadsheet ID: `1mXCEqQwaOaaEtIA3E2eGwkPLrvDZhMKlevqoeT6WKQs`

## AppSheet App
- App name: `369dataReimbursementTracker-898606684`
- App ID: `1af93729-23f8-4afe-93eb-a5ca2f4a8d02`

## Leadership Roles
- Silver Omayo - CEO & CTO - silver369data@gmail.com
- Emmanuel Kagodo - Managing Director - emmanuel369data@gmail.com
- Maureen Namanya - COO - maureen369data@gmail.com
- Barbara Wandukwa - Chief Product Development Officer - barbara369data@gmail.com
- Enock Mayanja - Proposals and Grants Manager - enock369data@gmail.com

## What Is Included Here
- `docs/approval-matrix.md`: decision tiers and approval rules
- `docs/appsheet-build-config.md`: exact AppSheet expressions, slices, and action logic
- `docs/data-governance.md`: ideal handling of test/pilot claims vs production claims
- `appscript/reimbursement_on_form_submit.gs`: notification trigger script
- `appscript/archive_pilot_claims.gs`: helper script for pilot-data tagging and archiving

## Recommended Production Principle
Do not delete historical records. Keep pilot/test-era claims for audit but exclude them from production views and dashboards using a clear `Environment` flag and go-live date cutoff.
