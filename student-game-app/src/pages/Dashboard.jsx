import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import AssignmentForm from "../components/AssignmentForm";
import AssignmentList from "../components/AssignmentList";
import BreadCharacter from "../components/BreadCharacter";
import coinIcon from "../assets/coin.png";

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function Dashboard({
  coins,
  assignments,
  onAddAssignment,
  onSubmitAssignment,
  character,
}) {
  const navigate = useNavigate();

  return (
    <div className="dashboardContentOnly">
      <div className="dashboardHeader">
        <h1 className="dashboardTitle">Assignments</h1>

        <div className="coinBox">
          <img className="coinIcon" src={coinIcon} alt="Coin icon" />
          <div className="coinText">{formatNumber(coins)}</div>
        </div>
      </div>

      <section className="dashboardPanel">
        <div className="panelScroll">
          {/* Top row: Character Preview + Assignment Form side-by-side */}
          <div className="topRow">
            <div className="characterSection">
              <h3>Your Toast Buddy</h3>
              <div className="characterPreview">
                <BreadCharacter character={character} size="small" />
              </div>
              <button
                className="customizeButton"
                onClick={() => navigate("/bread")}
              >
                Customize
              </button>
            </div>

            <div className="formSection">
              <AssignmentForm onAddAssignment={onAddAssignment} />
            </div>
          </div>

          {/* Section 2: Assignment List */}
          <div className="listSection">
            <AssignmentList
              assignments={assignments}
              onSubmitAssignment={onSubmitAssignment}
            />
          </div>

          {/* Section 3: Submitted Assignments */}
          <div className="submittedSection">
            <h3>Completed Assignments</h3>
            {assignments.filter((a) => a.submitted).length === 0 ? (
              <p>No completed assignments yet.</p>
            ) : (
              <div className="submittedList">
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

export default Dashboard;