// Import navigation hook from react-router to programmatically change routes
import { useNavigate } from "react-router-dom";

// Import styling for the Dashboard page
import "./Dashboard.css";

// Import child components used inside Dashboard
import AssignmentForm from "../components/AssignmentForm";
import AssignmentList from "../components/AssignmentList";
import BreadCharacter from "../components/BreadCharacter";

// Import coin image asset
import coinIcon from "../assets/coin.png";

/**
 * Utility function to format numbers with commas
 * Example: 1000 -> "1,000"
 */
function formatNumber(n) {
  return n.toLocaleString("en-US");
}

/**
 * Dashboard Component
 * 
 * Props:
 * - coins: number representing total user coins
 * - assignments: array of assignment objects
 * - onAddAssignment: function to add a new assignment
 * - onSubmitAssignment: function to mark assignment as submitted
 * - character: object representing the current bread character customization
 */
function Dashboard({
  coins,
  assignments,
  onAddAssignment,
  onSubmitAssignment,
  character,
}) {
  // Hook for navigating between routes (ex: "/bread")
  const navigate = useNavigate();

  return (
    <div className="dashboardContentOnly">
      {/* Header Section: Title + Coin Display */}
      <div className="dashboardHeader">
        <h1 className="dashboardTitle">Assignments</h1>

        {/* Coin display box */}
        <div className="coinBox">
          <img className="coinIcon" src={coinIcon} alt="Coin icon" />
          <div className="coinText">{formatNumber(coins)}</div>
        </div>
      </div>

      {/* Main Dashboard Panel */}
      <section className="dashboardPanel">
        <div className="panelScroll">
          
          {/* Top Row: Character Preview + Assignment Form side-by-side */}
          <div className="topRow">
            
            {/* Character Preview Section */}
            <div className="characterSection">
              <h3>Your Toast Buddy</h3>
              <div className="characterPreview">
                {/* Displays user's current bread character */}
                <BreadCharacter character={character} size="small" />
              </div>

              {/* Navigates to customization page */}
              <button
                className="customizeButton"
                onClick={() => navigate("/bread")}
              >
                Customize
              </button>
            </div>

            {/* Assignment Form Section */}
            <div className="formSection">
              {/* Form component used to create new assignments */}
              <AssignmentForm onAddAssignment={onAddAssignment} />
            </div>
          </div>

          {/* Assignment List Section (Active Assignments) */}
          <div className="listSection">
            <AssignmentList
              assignments={assignments}
              onSubmitAssignment={onSubmitAssignment}
            />
          </div>

          {/* Completed Assignments Section */}
          <div className="submittedSection">
            <h3>Completed Assignments</h3>

            {/* If no submitted assignments exist */}
            {assignments.filter((a) => a.submitted).length === 0 ? (
              <p>No completed assignments yet.</p>
            ) : (
              <div className="submittedList">
                {/* Filter submitted assignments and display them */}
                {assignments
                  .filter((a) => a.submitted)
                  .map((assignment) => (
                    <div key={assignment.id} className="submittedCard">
                      <strong>{assignment.title}</strong>
                      <div>Course: {assignment.course}</div>
                      <div>Coins Earned: {assignment.coinsAwarded}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

// Export Dashboard component for use in other parts of the app
export default Dashboard;
