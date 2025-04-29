// Create Vue App
const app = Vue.createApp({
  data() {
    return {
      // User state
      user: {
        isLoggedIn: false,
        name: "",
        email: ""
      },

      // Navigation state
      currentPage: "home",
      showLoginModal: false,

      // Form data
      loginForm: {
        email: "",
        password: "",
        errors: []
      },

      // Course data
      courses: [
        {
          id: 1,
          title: "Basic Algebra",
          level: "Beginner",
          description: "Master fundamental algebraic concepts",
          topics: ["Variables", "Equations", "Functions"],
          price: 299
        },
        {
          id: 2,
          title: "Advanced Calculus",
          level: "Advanced",
          description: "Deep dive into calculus concepts",
          topics: ["Derivatives", "Integrals", "Series"],
          price: 399
        },
        {
          id: 3,
          title: "Graph Theory & Analysis",
          level: "Intermediate",
          description:
            "Master the fundamentals of graphs, charts, and data visualization",
          topics: [
            "Coordinate Geometry",
            "Linear Graphs",
            "Quadratic Graphs",
            "Data Interpretation"
          ],
          price: 349
        }
      ],
      selectedLevel: "all",

      // Quiz data
      quizState: {
        isActive: false,
        currentQuestion: 0,
        score: 0,
        completed: false
      },
      questions: [
        {
          question: "What is the slope of the line y = 2x + 3?",
          options: ["1", "2", "3", "4"],
          correct: 1,
          explanation: "In y = mx + b form, m represents the slope, which is 2"
        },
        {
          question: "Which graph represents y = x²?",
          options: [
            "U-shaped parabola",
            "N-shaped parabola",
            "Straight line",
            "Circle"
          ],
          correct: 0,
          explanation: "y = x² forms a U-shaped parabola opening upward"
        },
        {
          question: "Solve: 3x + 7 = 22",
          options: ["x = 3", "x = 4", "x = 5", "x = 6"],
          correct: 2,
          explanation: "3x = 15, therefore x = 5"
        },
        {
          question: "What is the y-intercept of y = -3x + 4?",
          options: ["-3", "3", "4", "-4"],
          correct: 2,
          explanation: "In y = mx + b form, b is the y-intercept, which is 4"
        },
        {
          question: "Find the value of x: 2(x + 3) = 14",
          options: ["4", "5", "6", "7"],
          correct: 0,
          explanation: "2x + 6 = 14, 2x = 8, x = 4"
        },
        {
          question: "Which point lies on the line y = 2x - 1?",
          options: ["(1, 1)", "(2, 3)", "(0, -1)", "(3, 4)"],
          correct: 1,
          explanation: "For (2, 3): y = 2(2) - 1 = 4 - 1 = 3"
        },
        {
          question: "What is 25% of 80?",
          options: ["15", "20", "25", "30"],
          correct: 1,
          explanation: "25% = 1/4, so 80 ÷ 4 = 20"
        },
        {
          question:
            "If a triangle has angles 45° and 45°, what is the third angle?",
          options: ["45°", "60°", "90°", "180°"],
          correct: 2,
          explanation: "Triangle angles sum to 180°, so 180° - 45° - 45° = 90°"
        },
        {
          question: "Simplify: √16 + √9",
          options: ["5", "7", "9", "11"],
          correct: 1,
          explanation: "√16 = 4, √9 = 3, so 4 + 3 = 7"
        },
        {
          question: "What is the vertex of y = -(x - 2)² + 4?",
          options: ["(2, 4)", "(4, 2)", "(-2, 4)", "(2, -4)"],
          correct: 0,
          explanation: "For y = -(x - h)² + k, the vertex is (h, k), so (2, 4)"
        }
      ],
      weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      currentWeek: 0,
      schedule: {
        Monday: [
          {
            courseId: 1,
            courseName: "Basic Algebra",
            time: "09:00 - 10:30",
            room: "101"
          },
          {
            courseId: 3,
            courseName: "Graph Theory",
            time: "11:00 - 12:30",
            room: "102"
          }
        ],
        Tuesday: [
          {
            courseId: 2,
            courseName: "Advanced Calculus",
            time: "10:00 - 11:30",
            room: "201"
          }
        ],
        Wednesday: [
          {
            courseId: 1,
            courseName: "Basic Algebra",
            time: "14:00 - 15:30",
            room: "101"
          },
          {
            courseId: 3,
            courseName: "Graph Theory",
            time: "16:00 - 17:30",
            room: "102"
          }
        ],
        Thursday: [
          {
            courseId: 2,
            courseName: "Advanced Calculus",
            time: "09:00 - 10:30",
            room: "201"
          }
        ],
        Friday: [
          {
            courseId: 1,
            courseName: "Basic Algebra",
            time: "11:00 - 12:30",
            room: "101"
          },
          {
            courseId: 3,
            courseName: "Graph Theory",
            time: "14:00 - 15:30",
            room: "102"
          }
        ]
      },
      isSignup: false,
      grades: [6, 7, 8, 9, 10, 11, 12],
      signupForm: {
        fullName: "",
        age: "",
        grade: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: []
      }
    };
  },

  computed: {
    // Filter courses based on selected level
    filteredCourses() {
      if (this.selectedLevel === "all") return this.courses;
      return this.courses.filter(
        (course) => course.level === this.selectedLevel
      );
    },

    // Get current quiz question
    currentQuestion() {
      return this.questions[this.quizState.currentQuestion];
    },

    // Calculate quiz progress
    quizProgress() {
      return (this.quizState.currentQuestion / this.questions.length) * 100;
    },

    currentWeekDisplay() {
      const today = new Date();
      today.setDate(today.getDate() + this.currentWeek * 7);
      const weekStart = new Date(
        today.setDate(today.getDate() - today.getDay() + 1)
      );
      const weekEnd = new Date(today.setDate(today.getDate() + 4));
      return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
    }
  },

  methods: {
    // Authentication methods
    login() {
      this.loginForm.errors = [];

      if (!this.loginForm.email || !this.loginForm.password) {
        this.loginForm.errors.push("Please fill in all fields");
        return;
      }

      // Simulate login
      this.user.isLoggedIn = true;
      this.user.email = this.loginForm.email;
      this.user.name = this.loginForm.email.split("@")[0];
      this.showLoginModal = false;

      // Reset form
      this.loginForm.email = "";
      this.loginForm.password = "";
    },

    logout() {
      this.user.isLoggedIn = false;
      this.user.name = "";
      this.user.email = "";
    },

    // Course methods
    enrollCourse(courseId) {
      if (!this.user.isLoggedIn) {
        this.showLoginModal = true;
        return;
      }

      const course = this.courses.find((c) => c.id === courseId);
      if (course) {
        alert(`Successfully enrolled in ${course.title}!`);
      }
    },

    // Quiz methods
    startQuiz() {
      this.quizState.isActive = true;
      this.quizState.currentQuestion = 0;
      this.quizState.score = 0;
      this.quizState.completed = false;
    },

    submitAnswer(answerIndex) {
      if (answerIndex === this.currentQuestion.correct) {
        this.quizState.score++;
      }

      if (this.quizState.currentQuestion < this.questions.length - 1) {
        this.quizState.currentQuestion++;
      } else {
        this.completeQuiz();
      }
    },

    completeQuiz() {
      this.quizState.completed = true;
      this.quizState.isActive = false;

      // Show results chart using Chart.js
      this.$nextTick(() => {
        const ctx = document.getElementById("quizResults").getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Correct", "Incorrect"],
            datasets: [
              {
                data: [
                  this.quizState.score,
                  this.questions.length - this.quizState.score
                ],
                backgroundColor: ["#4CAF50", "#F44336"]
              }
            ]
          }
        });
      });
    },

    getDaySchedule(day) {
      return this.schedule[day] || [];
    },

    previousWeek() {
      this.currentWeek--;
    },

    nextWeek() {
      this.currentWeek++;
    },

    signup() {
      this.signupForm.errors = [];

      // Validate form
      if (this.signupForm.password !== this.signupForm.confirmPassword) {
        this.signupForm.errors.push("Passwords do not match");
        return;
      }

      if (this.signupForm.password.length < 6) {
        this.signupForm.errors.push("Password must be at least 6 characters");
        return;
      }

      if (this.signupForm.age < 5 || this.signupForm.age > 100) {
        this.signupForm.errors.push("Please enter a valid age");
        return;
      }

      // If validation passes, create account
      this.user.isLoggedIn = true;
      this.user.name = this.signupForm.fullName;
      this.user.email = this.signupForm.email;

      // Reset form and close modal
      this.signupForm = {
        fullName: "",
        age: "",
        grade: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: []
      };
      this.showLoginModal = false;
      this.isSignup = false;
    }
  },

  // Custom directive for tooltips
  directives: {
    tooltip: {
      mounted(el, binding) {
        el.setAttribute("title", binding.value);
        el.style.cursor = "help";
      }
    }
  }
});

// Mount the app
app.mount("#app");
