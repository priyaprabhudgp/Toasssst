import { useState } from "react";

function AssignmentForm({ onAddAssignment }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!title || !course || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newAssignment = {
      id: crypto.randomUUID(),
      title,
      course,
      dueDate,
      createdAt: Date.now(),
      submitted: false,
      submittedAt: null,
      coinsAwarded: 0,
    };

    onAddAssignment(newAssignment);

    // Reset form
    setTitle("");
    setCourse("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Assignment</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Essay on Macbeth"
        />
      </div>

      <div>
        <label>Course</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="English"
        />
      </div>

      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit">Add Assignment</button>
    </form>
  );
}

export default AssignmentForm;
