// timeUtils.js

/**
 * Returns true if the assignment is overdue and not submitted
 */
export function isOverdue(dueDate, submitted) {
  if (submitted) return false;

  const now = new Date();
  const due = new Date(dueDate);

  return now > due;
}

/**
 * Returns the number of full days an assignment is overdue
 * Returns 0 if not overdue
 */
export function getDaysOverdue(dueDate, submitted) {
  if (submitted) return 0;

  const now = new Date();
  const due = new Date(dueDate);

  if (now <= due) return 0;

  const diffMs = now - due;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Returns a human-readable status string
 */
export function getAssignmentStatus(dueDate, submitted) {
  if (submitted) return "Submitted";

  if (isOverdue(dueDate, submitted)) {
    return "Overdue";
  }

  return "Pending";
}

export function isSameDay(a, b) {
  return new Date(a).toDateString() === new Date(b).toDateString();
}