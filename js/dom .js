// ── Elements ──
const total = document.getElementById("total");
const inTotal = document.getElementById("interviewCount");
const rejTotal = document.getElementById("rejectedCount");
const Jobcount = document.getElementById("jobCount");

const interviewGrid = document.getElementById("grid-interview");
const rejectGrid = document.getElementById("grid-rejected");
const Allgrid = document.getElementById("grid-all");
const emptyState = document.getElementById("emptyState");

const tabBtns = document.querySelectorAll(".tab-btn");

// ── Active tab tracking ──
let activeGrid = Allgrid;

// ── Tab switching ──
function showGrid(targetId) {
    [Allgrid, interviewGrid, rejectGrid].forEach(g => g.classList.add("hidden"));

    const target = document.getElementById(targetId);
    target.classList.remove("hidden");
    activeGrid = target;

    // Check if the visible grid is empty
    checkEmpty(target);
}

function setActiveTab(clickedBtn) {
    tabBtns.forEach(btn => {
        if (btn === clickedBtn) return;
        btn.classList.remove("bg-indigo-600", "text-white", "border-indigo-600");
        // btn.classList.add("bg-white", "text-slate-600", "border-slate-200");
    });
    clickedBtn.classList.remove("bg-white", "text-slate-600", "border-slate-200");
    clickedBtn.classList.add("bg-indigo-600", "text-white", "border-indigo-600");
}

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        showGrid(btn.dataset.target);
        setActiveTab(btn);
    });
});

// ── Empty state check ──
function checkEmpty(grid) {
    const hasCards = grid.querySelector(".job-card");
    if (!hasCards) {
        emptyState.classList.remove("hidden");
        emptyState.classList.add("flex");
    } else {
        emptyState.classList.add("hidden");
        emptyState.classList.remove("flex");
    }
}

// ── Card actions ──
document.addEventListener("click", (e) => {

    // INTERVIEW button
    if (e.target.closest(".interview-btn")) {
        const card = e.target.closest(".job-card");
        const badge = card.querySelector(".status-badge");

        if (badge) {
            badge.innerText = "INTERVIEWED";
            badge.className = "status-badge mono mt-4 inline-block px-4 py-2 rounded-md border-2 border-emerald-500 text-emerald-600 font-semibold text-xs";
        }

        // Hide action buttons after status is set
        card.querySelector(".interview-btn").disabled = true;
        card.querySelector(".reject-btn").disabled = true;

        interviewGrid.appendChild(card);

        let intv = Number(inTotal.innerText);
        let all = Number(total.innerText);
        if (all > 0) {
            total.innerText = all - 1;
            Jobcount.innerText = total.innerText;
            inTotal.innerText = intv + 1;
        }

        // Switch to Interview tab
        // showGrid("grid-interview");
        // setActiveTab(document.querySelector('[data-target="grid-interview"]'));
    }

    // REJECT button
    else if (e.target.closest(".reject-btn")) {
        const card = e.target.closest(".job-card");
        const badge = card.querySelector(".status-badge");

        if (badge) {
            badge.innerText = "REJECTED";
            badge.className = "status-badge mono mt-4 inline-block px-4 py-2 rounded-md border-2 border-red-400 text-red-500 font-semibold text-xs";
        }

        card.querySelector(".interview-btn").disabled = true;
        card.querySelector(".reject-btn").disabled = true;

        rejectGrid.appendChild(card);

        let rejv = Number(rejTotal.innerText);
        let all = Number(total.innerText);
        if (all > 0) {
            rejTotal.innerText = rejv + 1;
            total.innerText = all - 1;
            Jobcount.innerText = total.innerText;
        }

        // Switch to Rejected tab
        // showGrid("grid-rejected");
        // setActiveTab(document.querySelector('[data-target="grid-rejected"]'));
    }

    // DELETE button
    else if (e.target.closest(".delete-btn")) {
        const card = e.target.closest(".job-card");

        // Only reduce total count if card is still in "all" grid (not yet actioned)
        const isInAll = Allgrid.contains(card);
        if (isInAll) {
            let all = Number(total.innerText);
            if (all > 0) {
                total.innerText = all - 1;
                Jobcount.innerText = total.innerText;
            }
        }

        card.remove();
        checkEmpty(activeGrid);
    }
});