// coinRules.js

const BASE_COINS = 100;
const ON_TIME_BONUS = 100;
const LATE_PENALTY_PER_DAY = 10;

const GRADE_BONUS = {
  A: 200,
  B: 150,
  C: 100,
  D: 0,
  F: 0,
};

/**
 * Calculate coins earned when an assignment is submitted
 */
export function calculateSubmissionCoins({ dueDate, submittedAt }) {
  const due = new Date(dueDate);
  const submitted = new Date(submittedAt);

  let coins = BASE_COINS;

  if (submitted <= due) {
    // On-time reward
    coins += ON_TIME_BONUS;
  } else {
    // Late penalty
    const diffMs = submitted - due;
    const daysLate = Math.floor(
      diffMs / (1000 * 60 * 60 * 24)
    );

    coins -= daysLate * LATE_PENALTY_PER_DAY;
  }

  return Math.max(coins, 0);
}

/**
 * Calculate bonus coins from grade
 */
export function calculateGradeBonus(grade) {
  return GRADE_BONUS[grade] ?? 0;
}

export function calculateOverduePenalty({ dueDate, now }) {
  if (now <= dueDate) return 0;

  const daysLate = Math.floor((now - dueDate) / 86400000);
  return daysLate * 50; // 5 coins per day late
}

export function calculateDailyPenalty(assignments, now) {
  let penalty = 0;

  for (const a of assignments) {
    if (!a.submitted && now > a.dueDate) {
      penalty += 5;
    }
  }

  return penalty;
}
