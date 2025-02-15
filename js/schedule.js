document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("weekly-schedule");
    const breakdownContainer = document.getElementById("component-breakdown");

    const workoutData = {
        "Monday": { "components": ["Push", "Core"], "exercises": { 
            "Push": ["Incline Bench Press", "DB Shoulder Press (Upright/Standing)", "Dips (Resistance Band)", "DB Flyes", "DB Lateral Raise", "Dumbbell Upper Chest Pullover (Elbows IN)", "Tricep Extensions (Overhead/Skullcrushers)", "Tricep Kickbacks (Resistance Bands)", "One Arm Florida to Washington", "Incline DB Press Smokeset", "Tricep Smokeset"],
            "Core": ["Flutter Kicks", "Air Bike Crunches", "Leg Raises", "Sit-Ups", "Knee-to-Elbow Crunches", "Sitting Twists", "Reverse Crunches", "Raised Leg Circles", "Windshield Wipers", "Plank"]
        }},
        "Tuesday": { "components": ["Pull", "HIIT"], "exercises": { 
            "Pull": ["Tripod One Arm Row", "Pull Ups (Resistance Bands)", "Straight Arm Pull Downs", "Band Pull-Aparts", "Bent Over Flyes", "DB Shrugs", "DB Pullovers (Elbows OUT)", "Face Pulls", "DB Curls", "DB Preacher Curls", "Alternating DB Curl Smokeset"],
            "HIIT": ["Plank", "High Knees", "Burpees", "Jumping Jacks", "Mountain Climbers", "Lightweight DB Squat Thrust Press", "Russian Twist", "Sprint on Bike"]
        }},
        "Wednesday": { "components": ["Legs", "Core"], "exercises": { 
            "Legs": ["Squats", "Deadlifts", "Leg Extension", "Leg Curl", "Bulgarian Split Squats", "Calf Raise", "The Chair"],
            "Core": ["Flutter Kicks", "Air Bike Crunches", "Leg Raises", "Sit-Ups", "Knee-to-Elbow Crunches", "Sitting Twists", "Reverse Crunches", "Raised Leg Circles", "Windshield Wipers", "Plank"]
        }},
        "Thursday": { "components": ["Push", "HIIT"], "exercises": { 
            "Push": ["Incline Bench Press", "DB Shoulder Press (Upright/Standing)", "Dips (Resistance Band)", "DB Flyes", "DB Lateral Raise", "Dumbbell Upper Chest Pullover (Elbows IN)", "Tricep Extensions (Overhead/Skullcrushers)", "Tricep Kickbacks (Resistance Bands)", "One Arm Florida to Washington", "Incline DB Press Smokeset", "Tricep Smokeset"],
            "HIIT": ["Plank", "High Knees", "Burpees", "Jumping Jacks", "Mountain Climbers", "Lightweight DB Squat Thrust Press", "Russian Twist", "Sprint on Bike"]
        }},
        "Friday": { "components": ["Pull", "Core"], "exercises": { 
            "Pull": ["Tripod One Arm Row", "Pull Ups (Resistance Bands)", "Straight Arm Pull Downs", "Band Pull-Aparts", "Bent Over Flyes", "DB Shrugs", "DB Pullovers (Elbows OUT)", "Face Pulls", "DB Curls", "DB Preacher Curls", "Alternating DB Curl Smokeset"],
            "Core": ["Flutter Kicks", "Air Bike Crunches", "Leg Raises", "Sit-Ups", "Knee-to-Elbow Crunches", "Sitting Twists", "Reverse Crunches", "Raised Leg Circles", "Windshield Wipers", "Plank"]
        }},
        "Saturday": { "components": ["Legs", "HIIT"], "exercises": { 
            "Legs": ["Squats", "Deadlifts", "Leg Extension", "Leg Curl", "Bulgarian Split Squats", "Calf Raise", "The Chair"],
            "HIIT": ["Plank", "High Knees", "Burpees", "Jumping Jacks", "Mountain Climbers", "Lightweight DB Squat Thrust Press", "Russian Twist", "Sprint on Bike"]
        }},
        "Sunday": { "components": ["Rest"], "exercises": {} }
    };

    container.innerHTML = "";
    breakdownContainer.innerHTML = "";

    let today = new Date().toLocaleDateString("en-US", { weekday: "long" });

    // **Section 1: Weekly Schedule**
    Object.keys(workoutData).forEach(day => {
        let section = document.createElement("div");
        section.classList.add("workout-summary", `component-${day.toLowerCase()}`);

        // Highlight today's workout
        if (day === today) {
            section.classList.add("highlight-today");
        }

        // Create a clickable link for the day's title
        let title = document.createElement("h2");
        let link = document.createElement("a");
        link.href = `index.html?day=${day}`; // Links to the daily workout page
        link.textContent = day;
        link.classList.add("schedule-link"); // Optional: Add a class for styling
        title.appendChild(link);
        section.appendChild(title);

        let componentList = document.createElement("ul");

        workoutData[day].components.forEach(component => {
            let listItem = document.createElement("li");
            listItem.textContent = component;
            componentList.appendChild(listItem);
        });

        section.appendChild(componentList);
        container.appendChild(section);
    });

    // **Section 2: Component Breakdown (No Duplicates)**
    let componentsSet = new Set(); // Track which components we've already added

    Object.keys(workoutData).forEach(day => {
        workoutData[day].components.forEach(component => {
            if (!componentsSet.has(component) && workoutData[day].exercises[component]) {
                componentsSet.add(component); // Mark component as added

                let section = document.createElement("div");
                section.classList.add("component-summary", `component-${component.toLowerCase()}`);

                let title = document.createElement("h2");
                title.textContent = component;
                section.appendChild(title);

                let exerciseList = document.createElement("ul");

                workoutData[day].exercises[component].forEach(exercise => {
                    let listItem = document.createElement("li");
                    listItem.textContent = exercise;
                    exerciseList.appendChild(listItem);
                });

                section.appendChild(exerciseList);
                breakdownContainer.appendChild(section);
            }
        });
    });
    
    setTimeout(() => {
        const allDivs = document.querySelectorAll(".workout-summary, .component-summary");

        allDivs.forEach((div, index) => {
            div.style.opacity = "0"; // Start hidden
            div.style.transform = "translateY(20px)"; // Start slightly lower
            setTimeout(() => {
                div.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                div.style.opacity = "1";
                div.style.transform = "translateY(0)"; // Moves into place
            }, index * 100); // 200ms stagger delay
        });
    }, 100); // Small delay to ensure elements exist
});

// Set the current day in the quick links
document.addEventListener("DOMContentLoaded", function() {
    // Get the day from the URL query string or default to today
    const urlParams = new URLSearchParams(window.location.search);
    let selectedDay = urlParams.get("day") || new Date().toLocaleDateString("en-US", { weekday: "long" });

    // Add class to the current day link in the quick menu
    document.querySelectorAll(".week-quick-links a").forEach(link => {
        if (link.textContent.trim() === selectedDay) {
            link.classList.add("current-day");
            link.removeAttribute("href"); // Disable the link
        }
    });
});