// ─────────────────────────────────────────────
//  JOB APPLICATION TRACKER — dom.js
// ─────────────────────────────────────────────

const tabBtns       = document.querySelectorAll(".tab-btn");
const emptyState    = document.getElementById("emptyState");
const jobCountEl    = document.getElementById("jobCount");
const totalEl       = document.getElementById("total");
const interviewEl   = document.getElementById("interviewCount");
const rejectedEl    = document.getElementById("rejectedCount");

const gridAll       = document.getElementById("grid-all");
const gridInterview = document.getElementById("grid-interview");
const gridRejected  = document.getElementById("grid-rejected");

const allGrids      = { "grid-all": gridAll, "grid-interview": gridInterview, "grid-rejected": gridRejected };

// ── UPDATE STATS ───────────────────────────────
function updateStats() {
    const total      = document.querySelectorAll(".job-card").length;
    const interviews = gridInterview.querySelectorAll(".job-card").length;
    const rejected   = gridRejected.querySelectorAll(".job-card").length;
    const available  = gridAll.querySelectorAll(".job-card").length;

    totalEl.textContent     = total;
    interviewEl.textContent = interviews;
    rejectedEl.textContent  = rejected;
    jobCountEl.textContent  = `${available} job${available !== 1 ? "s" : ""}`;
}

// ── EMPTY STATE ────────────────────────────────
function checkEmpty(grid) {
    const isEmpty = grid.querySelectorAll(".job-card").length === 0;
    emptyState.classList.toggle("hidden", !isEmpty);
    emptyState.classList.toggle("flex", isEmpty);
}

// ── TAB SWITCH ─────────────────────────────────
function switchTab(targetId) {
    // Active / inactive tab button styles
    tabBtns.forEach(btn => {
        const isActive = btn.dataset.target === targetId;
        btn.classList.toggle("bg-indigo-600",  isActive);
        btn.classList.toggle("text-white",     isActive);
        btn.classList.toggle("border-indigo-600", isActive);
        btn.classList.toggle("bg-white",       !isActive);
        btn.classList.toggle("text-slate-600", !isActive);
        btn.classList.toggle("border-slate-200", !isActive);
    });

    // Show/hide grids
    Object.entries(allGrids).forEach(([id, grid]) => {
        grid.classList.toggle("hidden", id !== targetId);
    });

    checkEmpty(allGrids[targetId]);
}

tabBtns.forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.target)));

// ── WIRE CARD ──────────────────────────────────
function wireCard(card) {
    const badge        = card.querySelector(".status-badge");
    const interviewBtn = card.querySelector(".interview-btn");
    const rejectBtn    = card.querySelector(".reject-btn");
    const deleteBtn    = card.querySelector(".delete-btn");

    // INTERVIEW
    interviewBtn.addEventListener("click", () => {
        // Update badge — replace Tailwind color classes
        badge.className = "status-badge mono mt-4 inline-block px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600";
        badge.textContent = "INTERVIEWED";

        interviewBtn.disabled = true;
        rejectBtn.disabled    = true;

        gridInterview.appendChild(card);
        updateStats();
        switchTab("grid-interview");
    });

    // REJECTED
    rejectBtn.addEventListener("click", () => {
        badge.className = "status-badge mono mt-4 inline-block px-3 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-500";
        badge.textContent = "REJECTED";

        interviewBtn.disabled = true;
        rejectBtn.disabled    = true;

        gridRejected.appendChild(card);
        updateStats();
        switchTab("grid-rejected");
    });

    // DELETE
    deleteBtn.addEventListener("click", () => {
        const parentGrid = card.parentElement;
        card.classList.add("opacity-0", "scale-95", "transition-all", "duration-200");
        setTimeout(() => {
            card.remove();
            updateStats();
            checkEmpty(parentGrid);
        }, 200);
    });
}

// ── INIT ───────────────────────────────────────
document.querySelectorAll(".job-card").forEach(wireCard);
updateStats();
checkEmpty(gridAll);
