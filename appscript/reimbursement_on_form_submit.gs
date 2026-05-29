/**
 * 369data reimbursement notification workflow.
 * Trigger: Installable trigger on spreadsheet form submit.
 */

const PRIMARY_APPROVER_EMAIL = "silver369data@gmail.com";
const REVIEWER_EMAILS = [
  "emmanuel369data@gmail.com",
  "maureen369data@gmail.com",
  "barbara369data@gmail.com",
  "enock369data@gmail.com"
];
const COMPANY_NAME = "369 Data Solutions and Consultancy Ltd.";

function onFormSubmit(e) {
  const values = e && e.namedValues ? e.namedValues : {};

  const claimant = getValue_(values, "  Full name of claimant  ") || getValue_(values, "Full Name of Claimant");
  const projectName = getValue_(values, "  Project name  ") || getValue_(values, "Project Name");
  const projectCode = getValue_(values, "Project Code");
  const amount = getValue_(values, "  Amount spent  ") || getValue_(values, "Amount Spent");
  const currency = getValue_(values, "  Currency  ") || getValue_(values, "Currency");
  const category = getValue_(values, "  Expense category  ") || getValue_(values, "Expense Category");
  const channel = getValue_(values, "  Preferred reimbursement channel  ") || getValue_(values, "Preferred Reimbursement Channel");
  const expenseDate = getValue_(values, "  Date expense was incurred  ") || getValue_(values, "Date Expense Was Incurred");
  const evidence = getValue_(values, "  Upload supporting evidence  ") || getValue_(values, "Evidence Upload Link");

  const subject = `Reimbursement Claim Submitted - ${projectCode || projectName || "Project"} - ${claimant || "Claimant"}`;
  const body = [
    "Dear Leadership Team,",
    "",
    "A reimbursement claim has been submitted for review and approval.",
    "",
    `Company: ${COMPANY_NAME}`,
    `Claimant: ${claimant}`,
    `Project Code: ${projectCode}`,
    `Project Name: ${projectName}`,
    `Expense Category: ${category}`,
    `Amount Claimed: ${currency} ${amount}`,
    `Expense Date: ${expenseDate}`,
    `Preferred Payment Channel: ${channel}`,
    "",
    "Evidence / Upload Link:",
    evidence,
    "",
    "Required action:",
    "Please review and mark the claim as Approved, Partially Approved, Rejected, or Queried.",
    "",
    "Regards,",
    "369data Reimbursement Control System"
  ].join("\n");

  MailApp.sendEmail({
    to: PRIMARY_APPROVER_EMAIL,
    cc: REVIEWER_EMAILS.join(","),
    subject: subject,
    body: body
  });
}

function getValue_(namedValues, key) {
  if (!namedValues[key]) return "";
  return Array.isArray(namedValues[key]) ? namedValues[key].join(", ") : String(namedValues[key]);
}
