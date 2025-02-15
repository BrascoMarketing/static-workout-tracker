document.addEventListener("DOMContentLoaded", function() {
    // Hardcoded workout data
    const workoutData = {
        "Monday": {
            "components": ["Push", "Core"],
            "exercises": {
                "Push": [
                    "Incline Bench Press",
                    "DB Shoulder Press (Upright/Standing)",
                    "Dips (Resistance Band)",
                    "DB Flyes",
                    "DB Lateral Raise",
                    "Dumbbell Upper Chest Pullover (Elbows IN)",
                    "Tricep Extensions (Overhead/Skullcrushers)",
                    "Tricep Kickbacks (Resistance Bands)",
                    "One Arm Florida to Washington",
                    "Incline DB Press Smokeset",
                    "Tricep Smokeset",
                ],
                "Core": [
                    "Flutter Kicks",
                    "Air Bike Crunches",
                    "Leg Raises",
                    "Sit-Ups",
                    "Knee-to-Elbow Crunches",
                    "Sitting Twists",
                    "Reverse Crunches",
                    "Raised Leg Circles",
                    "Windshield Wipers",
                    "Plank"
                ]
            }
        },
        "Tuesday": {
            "components": ["Pull", "HIIT"],
            "exercises": {
                "Pull": [
                    "Tripod One Arm Row",
                    "Pull Ups (Resistance Bands)",
                    "Straight Arm Pull Downs",
                    "Band Pull-Aparts",
                    "Bent Over Flyes",
                    "DB Shrugs",
                    "DB Pullovers (Elbows OUT)",
                    "Face Pulls",
                    "DB Curls",
                    "DB Preacher Curls",
                    "Alternating DB Curl Smokeset"
                ],
                "HIIT": [
                    "Plank",
                    "High Knees",
                    "Burpees",
                    "Jumping Jacks",
                    "Mountain Climbers",
                    "Lightweight DB Squat Thrust Press",
                    "Russian Twist",
                    "Sprint on Bike"
                ]
            }
        },
        "Wednesday": {
            "components": ["Legs", "Core"],
            "exercises": {
                "Legs": ["Squats", "Deadlifts", "Leg Extension", "Leg Curl", "Bulgarian Split Squats", "Calf Raise", "The Chair"],
                "Core": [
                    "Flutter Kicks",
                    "Air Bike Crunches",
                    "Leg Raises",
                    "Sit-Ups",
                    "Knee-to-Elbow Crunches",
                    "Sitting Twists",
                    "Reverse Crunches",
                    "Raised Leg Circles",
                    "Windshield Wipers",
                    "Plank"
                ]
            }
        },
        "Thursday": {
            "components": ["Push", "HIIT"],
            "exercises": {
                "Push": [
                    "Incline Bench Press",
                    "DB Shoulder Press (Upright/Standing)",
                    "Dips (Resistance Band)",
                    "DB Flyes",
                    "DB Lateral Raise",
                    "Dumbbell Upper Chest Pullover (Elbows IN)",
                    "Tricep Extensions (Overhead/Skullcrushers)",
                    "Tricep Kickbacks (Resistance Bands)",
                    "One Arm Florida to Washington",
                    "Incline DB Press Smokeset",
                    "Tricep Smokeset"
                ],
                "HIIT": [
                    "Plank",
                    "High Knees",
                    "Burpees",
                    "Jumping Jacks",
                    "Mountain Climbers",
                    "Lightweight DB Squat Thrust Press",
                    "Russian Twist",
                    "Sprint on Bike"
                ]
            }
        },
        "Friday": {
            "components": ["Pull", "Core"],
            "exercises": {
                "Pull": [
                    "Tripod One Arm Row",
                    "Pull Ups (Resistance Bands)",
                    "Straight Arm Pull Downs",
                    "Band Pull-Aparts",
                    "Bent Over Flyes",
                    "DB Shrugs",
                    "DB Pullovers (Elbows OUT)",
                    "Face Pulls",
                    "DB Curls",
                    "DB Preacher Curls",
                    "Alternating DB Curl Smokeset"
                ],
                "Core": [
                    "Flutter Kicks",
                    "Air Bike Crunches",
                    "Leg Raises",
                    "Sit-Ups",
                    "Knee-to-Elbow Crunches",
                    "Sitting Twists",
                    "Reverse Crunches",
                    "Raised Leg Circles",
                    "Windshield Wipers",
                    "Plank"
                ]
            }
        },
        "Saturday": {
            "components": ["Legs", "HIIT"],
            "exercises": {
                "Legs": ["Squats", "Deadlifts", "Leg Extension", "Leg Curl", "Bulgarian Split Squats", "Calf Raise", "The Chair"],
                "HIIT": [
                    "Plank",
                    "High Knees",
                    "Burpees",
                    "Jumping Jacks",
                    "Mountain Climbers",
                    "Lightweight DB Squat Thrust Press",
                    "Russian Twist",
                    "Sprint on Bike"
                ]
            }
        },
        "Sunday": {
            "components": ["Rest"],
            "exercises": {}
        }
    };
    
    const everydayExercises = ["Face Pulls", "Plank"];

    const excludedExercises = [
        "Plank", "Sprint on Bike", "Burpees", "Jumping Jacks", "Mountain Climbers",
        "Flutter Kicks", "Air Bike Crunches", "Leg Raises", "Sit-Ups",
        "Knee-to-Elbow Crunches", "Sitting Twists", "Reverse Crunches",
        "Raised Leg Circles", "Windshield Wipers", "High Knees",
        "Lightweight DB Squat Thrust Press", "Russian Twist"
    ];

    // Get the day from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    let selectedDay = urlParams.get("day");

    // Default to today if no day is provided
    let today = selectedDay || new Date().toLocaleDateString("en-US", { weekday: "long" });

    // Add the day of the week as a class to the <body> tag (lowercased for consistency)
    document.body.classList.add(`day-${today.toLowerCase()}`);

    let workout = workoutData[today];
    document.getElementById("workout-title").textContent = `${today}'s Workout`;

    let container = document.getElementById("workout-container");
    container.innerHTML = "";
    let savedProgress = JSON.parse(localStorage.getItem(today)) || {};

    let resetButton = document.getElementById("reset-progress");
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            document.querySelectorAll(".exercise-container input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = false;
                checkbox.closest(".exercise-container").classList.remove("completed");
            });

            for (let exercise in savedProgress) {
                if (savedProgress[exercise].completed) {
                    savedProgress[exercise].completed = false;
                }
            }
            localStorage.setItem(today, JSON.stringify(savedProgress));
        });
    }

    // If today is a rest day, show a message and stop execution
    if (!workout || workout.components.includes("Rest")) {
        // Create a wrapper div for the Rest Day content
        let restDayWrapper = document.createElement("div");
        restDayWrapper.classList.add("rest-day-container");
    
        // Add the Rest Day message
        let restMessage = document.createElement("p");
        restMessage.textContent = "Rest Day! Enjoy Your Recovery";
        
        // Recovery Tips & Motivational Quotes
        const recoveryTips = [
            "Rest and recovery are just as important as training!",
            "Muscles grow when you rest, not just when you lift. Take it easy today!",
            "Stay hydrated and eat well to fuel tomorrow’s gains!",
            "Active recovery like stretching or a light walk can help reduce soreness!",
            "Use today to reflect on your progress and set new goals!",
            "A good night’s sleep is your secret weapon for performance!",
            "Take time to mentally recharge. Rest is fuel for the mind too!",
            "Enjoy the day, but remember: consistency is key!",
            "You earned this rest! Tomorrow, we come back stronger!",
            "Recovery isn’t laziness—it’s part of the process!"
        ];
    
        // Pick a random tip
        const randomTip = recoveryTips[Math.floor(Math.random() * recoveryTips.length)];
    
        // Create the tip paragraph
        let tipMessage = document.createElement("p");
        tipMessage.classList.add("recovery-tip");
        tipMessage.textContent = `${randomTip}`;
    
        // Append messages to the wrapper
        restDayWrapper.appendChild(restMessage);
        restDayWrapper.appendChild(tipMessage);
    
        // Append the wrapper to the container
        container.appendChild(restDayWrapper);
    
        return;
    }
    

    workout.components.forEach(component => {
        let section = document.createElement("div");
        section.classList.add("workout-section", `component-${component.toLowerCase().replace(/\s+/g, "-")}`);

    
        let title = document.createElement("h3");
        title.textContent = component;
        section.appendChild(title);
    
        let filteredExercises = workout.exercises[component].filter(exercise => !excludedExercises.includes(exercise));
    
        if (filteredExercises.length > 0) {
            let headerRow = document.createElement("div");
            headerRow.classList.add("exercise-header");
            headerRow.innerHTML = `<span>Exercise</span><span>Reps</span><span>Weight</span><span>Done</span>`;
            section.appendChild(headerRow);
        }
    
        let list = document.createElement("ul");
        workout.exercises[component].forEach(exercise => {
            let li = document.createElement("li");
            let inputContainer = document.createElement("div");
            inputContainer.classList.add("exercise-container");
        
            let exerciseName = document.createElement("span");
            exerciseName.classList.add("exercise-name");
            exerciseName.textContent = exercise;
        
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = savedProgress[exercise]?.completed || false;
        
            if (checkbox.checked) {
                inputContainer.classList.add("completed");
            }
        
            checkbox.addEventListener("change", () => {
                let isCompleted = checkbox.checked;
                savedProgress[exercise] = {
                    ...savedProgress[exercise], 
                    completed: isCompleted
                };
                localStorage.setItem(today, JSON.stringify(savedProgress));
            
                if (isCompleted) {
                    inputContainer.classList.add("completed");                    
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                        });
                } else {
                    inputContainer.classList.remove("completed");
                }
            });
        
            inputContainer.appendChild(exerciseName);
        
            // Only add reps/weight fields if the exercise is NOT in excludedExercises
            if (!excludedExercises.includes(exercise)) {
                let repsInput = document.createElement("input");
                repsInput.type = "text";
                repsInput.classList.add("reps-input");
                repsInput.value = savedProgress[exercise]?.reps || "";
        
                let weightInput = document.createElement("input");
                weightInput.type = "number";
                weightInput.classList.add("weight");
                weightInput.value = savedProgress[exercise]?.weight || "";
        
                [repsInput, weightInput].forEach(input => {
                    input.addEventListener("input", () => {
                        savedProgress[exercise] = {
                            ...savedProgress[exercise],
                            reps: repsInput.value,
                            weight: weightInput.value
                        };
                        localStorage.setItem(today, JSON.stringify(savedProgress));
                    });
                });
        
                inputContainer.appendChild(repsInput);
                inputContainer.appendChild(weightInput);
            }
        
            inputContainer.appendChild(checkbox);
            li.appendChild(inputContainer);
            list.appendChild(li);
        });
    
        section.appendChild(list);
        container.appendChild(section);
    });

    // Add the "Everyday" Section
    if (everydayExercises.length > 0) {
        let everydaySection = document.createElement("div");
    everydaySection.classList.add("workout-section", "component-everyday");


        let everydayTitle = document.createElement("h3");
        everydayTitle.textContent = "Everyday";
        everydaySection.appendChild(everydayTitle);

        let everydayList = document.createElement("ul");
        
        everydayExercises.forEach(exercise => {
            let li = document.createElement("li");
            let inputContainer = document.createElement("div");
            inputContainer.classList.add("exercise-container");

            let exerciseName = document.createElement("span");
            exerciseName.classList.add("exercise-name");
            exerciseName.textContent = exercise;

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = savedProgress[exercise]?.completed || false;

            checkbox.addEventListener("change", (e) => {           
            
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            
                let isCompleted = checkbox.checked;
                savedProgress[exercise] = {
                    ...savedProgress[exercise], 
                    completed: isCompleted
                };
                localStorage.setItem(today, JSON.stringify(savedProgress));
            
                if (isCompleted) {
                    inputContainer.classList.add("completed");
                } else {
                    inputContainer.classList.remove("completed");
                }
            });
            


            if (checkbox.checked) {
                inputContainer.classList.add("completed");
            }

            checkbox.addEventListener("change", () => {
                let isCompleted = checkbox.checked;
                savedProgress[exercise] = {
                    ...savedProgress[exercise], 
                    completed: isCompleted
                };
                localStorage.setItem(today, JSON.stringify(savedProgress));

                if (isCompleted) {
                    inputContainer.classList.add("completed");
                } else {
                    inputContainer.classList.remove("completed");
                }
            });

            inputContainer.appendChild(exerciseName);
            inputContainer.appendChild(checkbox);
            li.appendChild(inputContainer);
            everydayList.appendChild(li);
        });

        everydaySection.appendChild(everydayList);
        container.appendChild(everydaySection);  // Append "Everyday" section at the bottom
    }

    // 🏆 **STEP 3: ADD STAGGERED ANIMATION**
    setTimeout(() => {
        const sections = document.querySelectorAll(".workout-section");

        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, index * 200); // Stagger delay of 200ms
        });
    }, 100); // Ensure elements are loaded before animating
    

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