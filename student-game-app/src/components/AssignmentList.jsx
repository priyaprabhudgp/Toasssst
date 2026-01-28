function AssignmentList({ assignments }) {
  if (assignments.length === 0) {
    return <p>No assignments yet.</p>;
  }

  return (
    <div>
      <h2>Your Assignments</h2>

      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <strong>{assignment.title}</strong>
            <div>Course: {assignment.course}</div>
            <div>Due: {assignment.dueDate}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentList;
