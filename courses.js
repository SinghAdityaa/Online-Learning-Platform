
const courses = [
   
    {
      title: "Python Programming",
      description: "Get started with Python programming language for beginners.",
      metadata: "Duration: 6 weeks | Instructor: Jane Smith",
      link:"https://www.geeksforgeeks.org/python-programming-language/",
      img:"python_programming.jpg"
    },
   
    {
        title: "Web Development",
        description: "Learn the basics of HTML, CSS, and JavaScript to build websites.",
        metadata: "Duration: 4 weeks | Instructor: Prashant Dubey",
        link:"https://www.geeksforgeeks.org/web-development-projects/",
        img:"web_development.jpg"
      },

      {
         title: "Data Science",
         description: "Learn the basics of data analysis and visualization using Python.",
         metadata: "Duration: 8 weeks | Instructor: Prashant Dubey",
         link:"https://www.geeksforgeeks.org/what-is-data-science/",
         img:"data_science.jpg"
      },

      {
        title: "Graphic Design Fundamentals",
        description: "Learn the basics of machine learning algorithms and applications.",
        metadata: "Duration: 10 weeks | Instructor: Prashant Dubey",
        link:"https://www.geeksforgeeks.org/introduction-to-computer-graphics/",
        img:"graphic_design_fundamentals.jpg"
     },


     {
        title: "Introduction to Machine Learning",
        description: "Explore the principles of graphic design and create stunning visuals.",
        metadata: "Duration: 5 weeks | Instructor: Aditya Singh",
        link:"https://www.geeksforgeeks.org/machine-learning/",
        img:"introduction_to_machine_learning.jpg"


     },


     {
        title: "Introduction to Artificial Intelligence",
        description: "Learn the basics of Artificial Inteligence.",
        metadata: "Duration: 10 weeks | Instructor: Aditya Singh",
        link:"https://www.geeksforgeeks.org/artificial-intelligence-an-introduction/",
        img:"introduction_to_artificial_intelligence.jpg"
     },


     {
        title: "Intro to Cloud Computing",
        description: "Learn the basics of Cloud Computing.",
        metadata: "Duration: 10 weeks | Instructor:Prashant Dubey",
        link:"https://www.geeksforgeeks.org/cloud-computing/",
        img:"intro_to_cloud_computing.jpg"
     },

    ];




  function renderCourses(coursesToShow) {
    const courseSection = document.querySelector(".courses");
    courseSection.innerHTML = "";
  
    coursesToShow.forEach((course) => {
      const courseItem = document.createElement("div");
      courseItem.className = "course-item";
      courseItem.innerHTML = `
        <img src="img/${course.img}" alt="Course Image">
        <h2 class="course-title">${course.title}</h2>
        <p class="course-description">${course.description}</p>
        <p class="course-metadata">${course.metadata}</p>
        <a href="${course.link}" class="course-link">Enroll Now</a>
        
      `;
      courseSection.appendChild(courseItem);
    });
  }
  
  function handleSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();
  
    const matchingCourses = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.metadata.toLowerCase().includes(searchTerm)
      );
    });
  
    renderCourses(matchingCourses);
  }
  
  
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearch);
  
 
  renderCourses(courses);

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

