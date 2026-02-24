
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

// ── State ──
let cardStates = [];
let interviewedCards = []; // { id, clone }
let rejectedCards = [];    // { id, clone }

function getCardState(id) {
    return cardStates.find(c => c.id === id);
}

function setCardState(id, status, clone) {
    const existing = getCardState(id);
    if (existing) {
        existing.status = status;
        existing.clone = clone;
    } else {
        cardStates.push({ id, status, clone });
    }
}

function removeCardState(id) {
    cardStates = cardStates.filter(c => c.id !== id);
}

// ── +1 / -1 helpers ──
function incrementCount(el) {
    el.innerText = Number(el.innerText) + 1;
}
function decrementCount(el) {
    const val = Number(el.innerText);
    if (val > 0) el.innerText = val - 1;
}

// ── Active tab ──
let activeGrid = Allgrid;

function showGrid(targetId) {
    [Allgrid, interviewGrid, rejectGrid].forEach(g => g.classList.add("hidden"));
    const target = document.getElementById(targetId);
    target.classList.remove("hidden");
    activeGrid = target;
    checkEmpty(target);
}

function setActiveTab(clickedBtn) {
    tabBtns.forEach(btn => {
        btn.classList.remove("bg-indigo-600", "text-white", "border-indigo-600");
        btn.classList.add("bg-white", "text-slate-600", "border-slate-200");
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
        const cardId = card.dataset.id;
        const state = getCardState(cardId);

        // Already interviewed — do nothing
        if (state && state.status === "interviewed") return;

        // ── Update badge on original card ──
        const badge = card.querySelector(".status-badge");
        if (badge) {
            badge.innerText = "INTERVIEWED";
            badge.className = "status-badge mono mt-4 inline-block px-4 py-2 rounded-md border-2 border-emerald-500 text-black-600 font-semibold text-xs bg-emerald-400";
        }
        card.querySelector(".interview-btn").disabled = true;
        card.querySelector(".reject-btn").disabled = false;
        card.dataset.status = "interviewed";

        // Was previously rejected → remove from rejectGrid + rejectedCards, decrement reject
        if (state && state.status === "rejected") {
            state.clone.remove();
            rejectedCards = rejectedCards.filter(c => c.id !== cardId);
            decrementCount(rejTotal);
        }

        // Clone updated card → add to interviewGrid + interviewedCards, increment interview
        const clonedCard = card.cloneNode(true);
        interviewGrid.appendChild(clonedCard);
        interviewedCards.push({ id: cardId, clone: clonedCard });
        incrementCount(inTotal);

        setCardState(cardId, "interviewed", clonedCard);
    }

    // REJECT button
    else if (e.target.closest(".reject-btn")) {
        const card = e.target.closest(".job-card");
        const cardId = card.dataset.id;
        const state = getCardState(cardId);

        // Already rejected — do nothing
        if (state && state.status === "rejected") return;

        // ── Update badge on original card ──
        const badge = card.querySelector(".status-badge");
        if (badge) {
            badge.innerText = "REJECTED";
            badge.className = "status-badge mono mt-4 inline-block px-4 py-2 rounded-md border-2 border-red-400 text-black-600 font-semibold text-xs bg-red-500";
        }
        card.querySelector(".interview-btn").disabled = false;
        card.querySelector(".reject-btn").disabled = true;
        card.dataset.status = "rejected";

        // Was previously interviewed → remove from interviewGrid + interviewedCards, decrement interview
        if (state && state.status === "interviewed") {
            state.clone.remove();
            interviewedCards = interviewedCards.filter(c => c.id !== cardId);
            decrementCount(inTotal);
        }

        // Clone updated card → add to rejectGrid + rejectedCards, increment reject
        const clonedCard = card.cloneNode(true);
        rejectGrid.appendChild(clonedCard);
        rejectedCards.push({ id: cardId, clone: clonedCard });
        incrementCount(rejTotal);

        setCardState(cardId, "rejected", clonedCard);
    }

    // DELETE button
    else if (e.target.closest(".delete-btn")) {
        const card = e.target.closest(".job-card");
        const cardId = card.dataset.id;
        const state = getCardState(cardId);

        if (state) {
            if (state.clone) state.clone.remove();

            if (state.status === "interviewed") {
                interviewedCards = interviewedCards.filter(c => c.id !== cardId);
                decrementCount(inTotal);
            } else if (state.status === "rejected") {
                rejectedCards = rejectedCards.filter(c => c.id !== cardId);
                decrementCount(rejTotal);
            }
        }

        removeCardState(cardId);

        let all = Number(total.innerText);
        if (all > 0) {
            total.innerText = all - 1;
            Jobcount.innerText = total.innerText;
        }

        card.remove();
        checkEmpty(activeGrid);
    }
});
