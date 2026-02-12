// Import helper functions related to assignment time calculations
import {
  isOverdue,           // Returns true if an assignment is past its due date
  getDaysOverdue,      // Calculates how many days late an assignment is
  getAssignmentStatus, // Returns a readable status string (e.g., "Due Today", "Overdue")
} from "../logic/timeUtils";

/**
 * AssignmentList Component
 *
 * Props:
 * - assignments: Array of assignment objects
 *      Each assignment contains:
 *        id, title, course, dueDate, submitted (boolean)
 * - onSubmitAssignment: Function to mark an assignment as submitted
 *
 * Purpose:
 * Displays all pending (not submitted) assignments
 * and shows their due status.
 */
function AssignmentList({ assignments, onSubmitAssignment }) {
  
  // Filter out assignments that have already been submitted
  const pendingAssignments = assignments.filter((a) => !a.submitted);

  // If there are no pending assignments, show a message
  if (pendingAssignments.length === 0) {
    return <p>No pending assignments.</p>;
  }

  return (
    <div>
      <h2>Your Assignments</h2>

      {/* Loop through each pending assignment and render it */}
      {pendingAssignments.map((assignment) => {

        // Determine if assignment is overdue
        const overdue = isOverdue(assignment.dueDate, assignment.submitted);

        // Calculate number of days late (if overdue)
        const daysLate = getDaysOverdue(
          assignment.dueDate,
          assignment.submitted
        );

        // Get readable status label
        const status = getAssignmentStatus(
          assignment.dueDate,
          assignment.submitted
        );

        return (
          <div key={assignment.id} className="assignmentCard">
            
            {/* Checkbox to mark assignment as submitted */}
            <input
              type="checkbox"
              onChange={() => onSubmitAssignment(assignment.id)}
              checked={assignment.submitted}
              title="Mark as submitted"
            />

            <div className="assignmentCardContent">
              {/* Assignment title */}
              <strong>{assignment.title}</strong>

              {/* Course name */}
              <div>Course: {assignment.course}</div>

              {/* Due date */}
              <div>Due: {assignment.dueDate}</div>

              {/* Status display with conditional overdue styling */}
              <div
                className={`assignmentCardStatus ${
                  overdue ? "overdue" : ""
                }`}
              >
                {status}

                {/* If overdue, show number of days late */}
                {overdue &&
                  ` (${daysLate} day${daysLate !== 1 ? "s" : ""} overdue)`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AssignmentList;
