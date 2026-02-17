document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }

            // Hide menu on click
            if (!mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
            }
        });
    });

    // --- CP Stats Fetcher ---
    fetchCPStats();
});

async function fetchCPStats() {
    
    const cfRatingEl = document.getElementById("cf-rating");
    const ccRatingEl = document.getElementById("cc-rating");
    const lcSolvedEl = document.getElementById("lc-solved");

    // 1. Codeforces
    try {
        const response = await fetch("https://codeforces.com/api/user.info?handles=BlueEnchanter");
        const data = await response.json();
        if (data.status === "OK") {
            cfRatingEl.innerText = data.result[0].maxRating;
        } else {
            cfRatingEl.innerText = "N/A";
        }
    } catch (error) {
        console.error("Error fetching CF stats:", error);
        cfRatingEl.innerText = "Err";
    }

    // 2. LeetCode
    try {
        const response = await fetch("https://alfa-leetcode-api.onrender.com/notwhitedevil/solved");
        const data = await response.json();
        if (data && data.solvedProblem) {
            lcSolvedEl.innerText = data.solvedProblem;
        } else {
            lcSolvedEl.innerText = "N/A";
        }
    } catch (error) {
        console.error("Error fetching LC stats:", error);
        lcSolvedEl.innerText = "Err";
    }

    // 3. CodeChef
    try {
        const response = await fetch("https://competitive-coding-api.herokuapp.com/api/codechef/notwhitedevil");
        const data = await response.json();
        if (data.highest_rating) {
            ccRatingEl.innerText = data.highest_rating;
        } 
    } catch (error) {
        console.error("Error fetching CC stats:", error);
    }
}