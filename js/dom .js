const interviewButton = document.querySelectorAll(".interview-btn");
const RejectedButton = document.querySelectorAll(".reject-btn")
const total = document.getElementById("total");
const inTotal = document.getElementById("interviewCount");
const rejTotal = document.getElementById("rejectedCount");
const Jobcount = document.getElementById("jobCount");

const interviewGrid = document.getElementById("grid-interview");
const rejectGrid = document.getElementById("grid-rejected");
const Allgrid = document.getElementById("grid-all");
const emty = document.getElementById("emptyState");


document.addEventListener("click", (e) => {

    if (e.target.closest(".interview-btn")) {

        let intv = Number(inTotal.innerText);
        let all = Number(total.innerText);
        const card = e.target.closest(".job-card");

        // 2. Select the status badge inside THIS card
        const badge = card.querySelector(".status-badge");

        if (badge) {
            // 3. Update the text
            badge.innerText = "INTERVIEWED";

            // 4. Overwrite all old classes with the new styling classes
            badge.className = "status-badge mono mt-4 inline-block px-4 py-2 rounded-md border-2 border-emerald-500 text-emerald-600 font-semibold text-xs";
        }
        interviewGrid.appendChild(card);
        if (all > 0) {
            total.innerText = all - 1;
            Jobcount.innerText = total.innerText
            inTotal.innerText = intv + 1;
        }
        if (all === 0) {
            emty.classList.remove("hidden");

        }
        console.log("Clicked button:", inTotal.innerText);
    }
    else if (e.target.closest(".reject-btn")) {
        // 1. Convert strings to numbers safely
        let rejv = Number(rejTotal.innerText);
        let all = Number(total.innerText);
        const card = e.target.closest(".job-card");

        // 2. Select the status badge inside THIS card
        const badge = card.querySelector(".status-badge");

        if (badge) {
            // 3. Update the text
            badge.innerText = "REJECTED";
            badge.className = "status-badge mono mt-4 inline-block px-4 py-2 rounded-md border-2 border-red-400 text-red-500 font-semibold text-xs";

        }
        rejectGrid.appendChild(card);

        if (all > 0) {
            rejTotal.innerText = rejv + 1;
            total.innerText = all - 1;
            Jobcount.innerText = total.innerText;
        }

        console.log("Updated Reject Count:", rejTotal.innerText);
    }
});
