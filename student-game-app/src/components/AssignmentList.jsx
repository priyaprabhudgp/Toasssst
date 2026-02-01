import {
  isOverdue,
  getDaysOverdue,
  getAssignmentStatus,
} from "../logic/timeUtils";

function AssignmentList({ assignments, onSubmitAssignment }) {
  if (assignments.length === 0) {
    return <p>No assignments yet.</p>;
  }

  return (
    <div>
      <h2>Your Assignments</h2>

      <ul>
        {assignments.map((assignment) => {
          const overdue = isOverdue(
            assignment.dueDate,
            assignment.submitted
          );

          const daysLate = getDaysOverdue(
            assignment.dueDate,
            assignment.submitted
          );

          const status = getAssignmentStatus(
            assignment.dueDate,
            assignment.submitted
          );

          return (
            <li key={assignment.id}>
              <strong>{assignment.title}</strong>
              <div>Course: {assignment.course}</div>
              <div>Due: {assignment.dueDate}</div>
              <div>Status: {status}</div>

              {overdue && (
                <div style={{ color: "red" }}>
                  {daysLate} day{daysLate !== 1 ? "s" : ""} overdue
                </div>
              )}

              {!assignment.submitted && (
                <button
                  onClick={() => onSubmitAssignment(assignment.id)}
                >
                  Mark as Submitted
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AssignmentList;
