export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  level: "Entry" | "Mid" | "Senior";
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  posted: string;
  logo: string;
  industry: string;
  isFresher?: boolean;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "HireMentis",
    location: "Meerut, India",
    type: "Full-time",
    level: "Mid",
    description:
      "We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows.",
    requirements: [
      "1+ years experience with React.js",
      "Proficient understanding of web markup, HTML5, CSS3",
      "Good understanding of JavaScript and ES6+ features",
      "Experience with RESTful APIs and GraphQL",
      "Familiarity with Redux, TypeScript, and modern frontend tools",
    ],
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and frontend libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance across devices and browsers",
      "Collaborate with backend developers and designers to improve usability",
    ],
    salary: "₹12,00,000 – ₹18,00,000",
    posted: "2025-05-10",
    logo: "https://via.placeholder.com/150",
    industry: "Technology",
  },


  {
    id: 2,
    title: "Backend Engineer",
    company: "ChaiCode",
    location: "Jaipur, India",
    type: "Full-time",
    level: "Senior",
    description:
      "Join our backend team to build scalable and resilient systems that power our enterprise applications.",
    requirements: [
      "5+ years of experience in backend development",
      "Strong knowledge of Node.js, Python, or Java",
      "Experience with databases (SQL and NoSQL)",
      "Understanding of server-side templating languages",
      "Knowledge of API design and development",
    ],
    responsibilities: [
      "Design and implement backend services and APIs",
      "Optimize application performance and responsiveness",
      "Collaborate with frontend developers to integrate user-facing elements",
      "Implement security and data protection measures",
      "Write clean, maintainable code with proper documentation",
    ],
    salary: "₹18,00,000 – ₹25,00,000",
    posted: "2025-05-12",
    logo: "https://via.placeholder.com/150",
    industry: "Technology",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Learnyst",
    location: "Bengaluru, India",
    type: "Full-time",
    level: "Mid",
    description:
      "We are looking for a talented Full Stack Developer to join our innovative team. You will be responsible for developing scalable web applications using both frontend and backend technologies.",
    requirements: [
      "3+ years of experience with JavaScript, React.js, and Node.js",
      "Strong understanding of HTML5, CSS3, and modern frontend libraries",
      "Proficient with backend frameworks like Express.js or Django",
      "Experience with RESTful APIs, GraphQL, and database systems like MongoDB or PostgreSQL",
      "Familiarity with DevOps practices and version control (Git)",
    ],
    responsibilities: [
      "Develop and maintain both frontend and backend components of web applications",
      "Translate UI/UX designs into high-quality, responsive web interfaces",
      "Design robust APIs and integrate with third-party services",
      "Ensure optimal performance and scalability of web applications",
      "Collaborate with cross-functional teams to deliver new features",
    ],
    salary: "₹12-18 LPA",
    posted: "2025-05-25",
    logo: "https://example.com/logo.png",
    industry: "Technology",
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "ChaiCode",
    location: "Jaipur, India",
    type: "Full-time",
    level: "Mid",
    description:
      "Join our dynamic engineering team as a Software Engineer. You'll be involved in the full software development lifecycle to build high-quality software solutions.",
    requirements: [
      "Strong programming skills in C++, Java, or Python",
      "Solid understanding of data structures and algorithms",
      "Experience with version control systems like Git",
      "Familiarity with software development methodologies (Agile/Scrum)",
      "Ability to write clean, maintainable, and scalable code",
    ],
    responsibilities: [
      "Design, develop, and test software applications",
      "Participate in code reviews and technical discussions",
      "Debug and resolve technical issues",
      "Collaborate with product managers and designers",
      "Contribute to continuous improvement of development processes",
    ],
    salary: "₹10-16 LPA",
    posted: "2025-05-25",
    logo: "https://example.com/logo.png",
    industry: "Technology",
  },

  {
    id: 5,
    title: "JavaScript Developer",
    company: "Teachyst",
    location: "Patiala, India",
    type: "Full-time",
    level: "Mid",
    description:
      "We are looking for a JavaScript Developer to build dynamic and interactive web applications. You'll be responsible for delivering high-quality code and improving user experience.",
    requirements: [
      "Strong proficiency in JavaScript and ES6+",
      "Experience with React.js, Vue.js, or Angular",
      "Understanding of HTML5, CSS3, and responsive design",
      "Familiarity with modern development tools (Webpack, Babel, etc.)",
      "Experience integrating APIs and managing state (Redux, Vuex)",
    ],
    responsibilities: [
      "Develop and maintain frontend components using JavaScript frameworks",
      "Convert wireframes and designs into functional applications",
      "Optimize application for speed and scalability",
      "Write reusable and maintainable code",
      "Collaborate with UI/UX designers and backend developers",
    ],
    salary: "₹9-14 LPA",
    posted: "2025-05-25",
    logo: "https://example.com/logo.png",
    industry: "Technology",
  },

  {
    id: 6,
    title: "Python Developer",
    company: "HireMentis",
    location: "Meerut, India",
    type: "Full-time",
    level: "Mid",
    description:
      "We are seeking a Python Developer to build scalable backend services and automation solutions. The ideal candidate will have a strong foundation in Python and web technologies.",
    requirements: [
      "3+ years experience in Python development",
      "Experience with web frameworks such as Django or Flask",
      "Good understanding of RESTful APIs and data formats like JSON",
      "Proficient with SQL and NoSQL databases",
      "Familiarity with cloud platforms and deployment pipelines",
    ],
    responsibilities: [
      "Develop backend logic for web and enterprise applications",
      "Build and integrate RESTful APIs with frontend systems",
      "Write efficient and reusable code for automation and services",
      "Maintain code quality through testing and documentation",
      "Collaborate with DevOps and frontend teams for integration",
    ],
    salary: "₹11-17 LPA",
    posted: "2025-05-25",
    logo: "https://example.com/logo.png",
    industry: "Technology",
  },

  {
    id: 7,
    title: "UX/UI Designer",
    company: "KodeKshetra",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "DesignWorks is looking for a talented UX/UI Designer to craft beautiful and intuitive interfaces for our clients.",
    requirements: [
      "Portfolio showcasing UI design and interaction expertise",
      "Experience with Figma, Sketch, and other design tools",
      "Understanding of user-centered design principles",
      "Knowledge of web and mobile design patterns",
      "Ability to create wireframes, prototypes, and high-fidelity mockups",
    ],
    responsibilities: [
      "Create user flows, wireframes, and UI mockups",
      "Conduct user research and usability testing",
      "Collaborate with product managers and engineers",
      "Establish design guidelines and systems",
      "Stay updated on latest design trends and technologies",
    ],
    salary: "₹10,00,000 – ₹15,00,000",
    posted: "2025-05-08",
    logo: "https://via.placeholder.com/150",
    industry: "Design",
  },

  {
    id: 8,
    title: "Data Scientist",
    company: "Super Live",
    location: "Bengaluru, India",
    type: "Full-time",
    level: "Senior",
    description:
      "Looking for a skilled Data Scientist to analyze large datasets and provide actionable insights to improve our products.",
    requirements: [
      "Advanced degree in Statistics, Computer Science, or related field",
      "Strong programming skills in Python or R",
      "Experience with data visualization tools",
      "Knowledge of machine learning algorithms",
      "Strong analytical and problem-solving skills",
    ],
    responsibilities: [
      "Develop and implement machine learning models",
      "Analyze complex datasets to extract valuable insights",
      "Create data visualizations and reports",
      "Collaborate with engineering and product teams",
      "Stay current with latest advancements in AI and machine learning",
    ],
    salary: "₹50,00,000 – ₹75,00,000",
    posted: "2025-05-15",
    logo: "https://via.placeholder.com/150",
    industry: "Data Science",
  },

  {
    id: 9,
    title: "DevOps Engineer",
    company: "KodeKshetra",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: [
      "Experience with AWS, Azure, or Google Cloud",
      "Knowledge of containerization (Docker, Kubernetes)",
      "Familiarity with CI/CD tools (Jenkins, GitLab CI)",
      "Scripting and automation skills (Python, Bash)",
      "Understanding of infrastructure as code (Terraform, CloudFormation)",
    ],
    responsibilities: [
      "Design and implement cloud infrastructure",
      "Automate deployment processes",
      "Monitor system performance and troubleshoot issues",
      "Implement security best practices",
      "Collaborate with development teams to optimize workflows",
    ],
    salary: "₹25,00,000 – ₹35,00,000",
    posted: "2025-05-07",
    logo: "https://via.placeholder.com/150",
    industry: "Technology",
  },

  {
    id: 10,
    title: "Product Manager",
    company: "Learn Code Online",
    location: "Noida, India",
    type: "Full-time",
    level: "Mid",
    description:
      "We are seeking an experienced Product Manager to join our team and help shape our product vision and roadmap.",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation abilities",
      "Experience with agile methodologies",
      "Technical background preferred",
    ],
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work closely with engineering, design, and marketing teams",
      "Analyze market trends and competitor activities",
      "Lead the product development lifecycle from conception to launch",
    ],
    salary: "₹30,00,000 – ₹45,00,000",
    posted: "2025-05-05",
    logo: "https://via.placeholder.com/150",
    industry: "Technology",
  },

  {
    id: 11,
    title: "Marketing Manager",
    company: "Physics Wallah",
    location: "Delhi, India",
    type: "Full-time",
    level: "Senior",
    description:
      "Seeking an experienced Marketing Manager to lead our digital marketing strategies and campaigns.",
    requirements: [
      "5+ years of marketing experience",
      "Strong understanding of digital marketing channels",
      "Experience with marketing analytics tools",
      "Excellent project management skills",
      "Creative mindset with attention to detail",
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage digital advertising campaigns",
      "Analyze marketing metrics and ROI",
      "Oversee content creation and distribution",
      "Collaborate with sales and product teams",
    ],
    salary: "₹45,00,000 – ₹65,00,000",
    posted: "2025-05-09",
    logo: "https://via.placeholder.com/150",
    industry: "Marketing",
  },
  {
    id: 12,
    title: "Software QA Engineer",
    company: "Learnyst",
    location: "Pune, India",
    type: "Full-time",
    level: "Mid",
    description:
      "Join our QA team to ensure the quality and reliability of our software products through comprehensive testing.",
    requirements: [
      "Knowledge of software QA methodologies and tools",
      "Experience with manual and automated testing",
      "Familiarity with test management tools",
      "Basic understanding of programming concepts",
      "Strong analytical and problem-solving skills",
    ],
    responsibilities: [
      "Create and execute test plans and test cases",
      "Identify, report, and track bugs",
      "Perform regression testing",
      "Collaborate with developers to resolve issues",
      "Participate in code reviews and product discussions",
    ],
    salary: "₹25,00,000 – ₹35,00,000",
    posted: "2025-05-14",
    logo: "https://via.placeholder.com/150",
    industry: "Technology",
  },
  {
    id: 13,
    title: "Project Manager",
    company: "Teachyst",
    location: "Patiala, India",
    type: "Contract",
    level: "Mid",
    description:
      "We are looking for a skilled Project Manager to oversee our software development projects from initiation to completion.",
    requirements: [
      "PMP certification preferred",
      "Experience managing software development projects",
      "Strong leadership and communication skills",
      "Knowledge of agile and waterfall methodologies",
      "Proficiency with project management tools",
    ],
    responsibilities: [
      "Lead project planning and execution",
      "Manage project scope, schedule, and resources",
      "Facilitate team communication and collaboration",
      "Identify and mitigate project risks",
      "Report project status to stakeholders",
    ],
    salary: "₹30,00,000 – ₹45,00,000",
    posted: "2025-05-11",
    logo: "https://via.placeholder.com/150",
    industry: "Project Management",
  },
  {
    id: 14,
    title: "Network Security Specialist",
    company: "Learnyst",
    location: "Bengaluru, India",
    type: "Full-time",
    level: "Senior",
    description:
      "Join our security team to protect our network infrastructure from cyber threats and ensure data integrity.",
    requirements: [
      "CISSP or related security certifications",
      "Experience with network security technologies",
      "Knowledge of security frameworks (NIST, ISO)",
      "Familiarity with security assessment tools",
      "Understanding of compliance requirements",
    ],
    responsibilities: [
      "Monitor and maintain network security systems",
      "Conduct security assessments and vulnerability scans",
      "Implement security measures and protocols",
      "Respond to security incidents and breaches",
      "Provide security training and awareness",
    ],
    salary: "₹60,00,000 – ₹1,00,00,000",
    posted: "2025-05-06",
    logo: "https://via.placeholder.com/150",
    industry: "Cybersecurity",
  },

  {
    id: 15,
    title: "Sales Manager",
    company: "HireMentis",
    location: "Meerut, India",
    type: "Full-time",
    level: "Mid",
    description:
      "We are seeking a Sales Manager to lead our business development efforts. You will be responsible for driving sales growth, building client relationships, and achieving revenue targets.",
    requirements: [
      "3+ years of experience in B2B/B2C sales or business development",
      "Strong communication, negotiation, and leadership skills",
      "Proven track record of achieving sales targets",
      "Knowledge of CRM tools and sales analytics",
      "Ability to work in a fast-paced and target-driven environment",
    ],
    responsibilities: [
      "Identify and pursue new sales opportunities and markets",
      "Build and maintain strong client relationships",
      "Lead and mentor the sales team to achieve KPIs",
      "Prepare reports and forecasts for upper management",
      "Coordinate with marketing to implement promotional strategies",
    ],
    salary: "₹8-12 LPA + incentives",
    posted: "2025-05-25",
    logo: "https://example.com/logo.png",
    industry: "Sales",
  },

// freshers job id 

 {
    id: 16,
    title: "Associate Software Engineer / Trainee",
    company: "Tata Consultancy Services",
    location: "Pan India",
    type: "Full-time",
    level: "Entry",
    isFresher: true,
    description: "Work on development, testing, support, and maintenance of software applications across domains.",
    
    requirements: [
      "Strong programming fundamentals (C/C++/Java/Python)",
      "Proficient understanding of web markup, HTML5, CSS3, Javascript",
      "Strong communication, negotiation, and  teamwork",
      "TCS NQT clearance",
      "Ability to work in a fast-paced and target-driven environment",
    ],
    responsibilities: [
      "Understand client requirements",
      "Build and maintain strong client relationships",
      "Develop or test applications based on project requirements",
      "Troubleshoot bugs",
      "Collaborate with cross-functional teams",
    ],
    salary: "₹3.5 – ₹4.2 LPA + incentives",
    posted: "2025-06-25",
    logo: "public/tcs_logo.png",
    industry: "IT Services and Consulting",
  },

  {
  id: 17,
  title: "Systems Engineer",
  company: "Infosys",
  location: "Pan India",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Participate in end-to-end development and deployment of business applications for Infosys clients.",
  requirements: [
    "B.E./B.Tech/MCA/M.Sc graduates",
    "Strong programming knowledge in Java/Python",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Good analytical and problem-solving skills",
    "Infosys Certification Program or campus selection"
  ],
  responsibilities: [
    "Write efficient and maintainable code",
    "Conduct unit and integration testing",
    "Participate in Agile development cycles",
    "Fix bugs and optimize code",
    "Collaborate with cross-functional teams"
  ],
  salary: "₹3.6 – ₹5 LPA",
  posted: "2025-06-25",
  logo: "public/infosys_logo.png",
  industry: "IT Services and Consulting"
},

{
  id: 18,
  title: "Project Engineer",
  company: "Wipro",
  location: "Pan India",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Deliver technical solutions across client projects as part of global delivery teams.",
  requirements: [
    "B.E./B.Tech/BCA/MCA graduates",
    "Basic knowledge of any programming language",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Excellent communication and logical skills",
    "Wipro Elite NLTH qualified"
  ],
  responsibilities: [
    "Understand and implement client requirements",
    "Develop, test and deploy applications",
    "Provide production-level support",
    "Collaborate in Agile teams",
    "Document processes and solutions"
  ],
  salary: "₹3.5 – ₹4.5 LPA",
  posted: "2025-06-25",
  logo: "public/wipro_logo.png",
  industry: "IT Services and Consulting"
},


{
  id: 19,
  title: "GenC Developer",
  company: "Cognizant",
  location: "Pan India",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Work on application development, testing, support, and implementation projects across verticals.",
  requirements: [
    "B.E./B.Tech/MCA graduates",
    "Basic knowledge of programming (Java, Python)",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Problem-solving skills and adaptability",
    "Good communication and teamwork"
  ],
  responsibilities: [
    "Participate in design, coding, and testing activities",
    "Collaborate in Agile projects",
    "Write reusable and efficient code",
    "Troubleshoot and debug issues",
    "Work with QA teams to ensure quality delivery"
  ],
  salary: "₹4 – ₹6.75 LPA",
  posted: "2025-06-25",
  logo: "public/cognizant_logo.png",
  industry: "IT Services and Consulting"
},

{
  id: 20,
  title: "Graduate Engineer Trainee",
  company: "HCL Technologies",
  location: "Pan India",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Join product development, support, or infrastructure teams to kickstart your IT career.",
  requirements: [
    "B.E./B.Tech/BCA/B.Sc/MCA graduates",
    "Willingness to relocate and work in shifts",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Strong basics in programming and networking",
    "Good communication skills"
  ],
  responsibilities: [
    "Write and test code modules",
    "Provide L1/L2 support for applications",
    "Participate in internal training programs",
    "Report and document bugs",
    "Coordinate with senior team members"
  ],
  salary: "₹3.25 – ₹4 LPA",
  posted: "2025-06-25",
  logo: "public/hcl_logo.png",
  industry: "IT & Product Engineering"
},


{
  id: 21,
  title: "Associate Software Engineer (ASE)",
  company: "Accenture",
  location: "Bangalore / Hyderabad / Pune / Chennai",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Support global delivery projects through code development, testing, and deployment.",
  requirements: [
    "B.E./B.Tech/M.E./M.Tech/MCA/M.Sc graduates",
    "Proficiency in programming and SDLC concepts",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Strong communication and collaboration skills",
    "Understanding of cloud or DevOps is a plus"
  ],
  responsibilities: [
    "Write efficient and modular code",
    "Work in cross-functional global teams",
    "Participate in code reviews and debugging",
    "Contribute to design documents",
    "Perform integration testing"
  ],
  salary: "₹4.5 – ₹5.25 LPA",
  posted: "2025-06-25",
  logo: "public/accenture_logo.png",
  industry: "IT & Consulting"
},


{
  id: 22,
  title: "Software Analyst",
  company: "Capgemini",
  location: "Pan India",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Assist in developing and deploying software applications and contribute to consulting engagements.",
  requirements: [
    "B.E./B.Tech/MCA graduates",
    "Understanding of OOPs and database concepts",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Clear Capgemini Exceller exam",
    "Good team collaboration and communication"
  ],
  responsibilities: [
    "Develop software modules and web applications",
    "Test and debug code",
    "Document solutions and design flow",
    "Coordinate with QA and DevOps teams",
    "Participate in client calls if required"
  ],
  salary: "₹3.8 – ₹5 LPA",
  posted: "2025-06-25",
  logo: "public/capgemini_logo.png",
  industry: "Consulting & Technology"
},


{
  id: 23,
  title: "Associate Software Engineer",
  company: "Tech Mahindra",
  location: "Hyderabad / Pune / Noida",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Support the development of client-facing applications and internal tools under senior supervision.",
  requirements: [
    "B.E./B.Tech/MCA graduates",
    "Good understanding of logic and data structures",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Willingness to learn and grow in a team",
    "Tech Mahindra online assessment clearance"
  ],
  responsibilities: [
    "Assist in software design and development",
    "Perform testing and fix bugs",
    "Work with senior engineers to understand tasks",
    "Follow Agile project methodologies",
    "Maintain documentation"
  ],
  salary: "₹3.25 – ₹4 LPA",
  posted: "2025-06-25",
  logo: "public/tech_mahindra_logo.png",
  industry: "IT & BPO Services"
},



{
  id: 24,
  title: "Associate Systems Engineer",
  company: "IBM",
  location: "Bangalore / Hyderabad / Pune",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Work on cloud-based solutions, AI/ML projects, and enterprise-grade applications with IBM's global clients.",
  requirements: [
    "B.E./B.Tech/MCA/M.Tech graduates",
    "Familiarity with scripting, databases, and APIs",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Excellent communication and reasoning",
    "Understanding of cloud platforms is an advantage"
  ],
  responsibilities: [
    "Write and test scalable code",
    "Collaborate on hybrid cloud and AI projects",
    "Debug and deploy applications",
    "Use IBM toolsets and contribute to innovation",
    "Document code and maintain project reports"
  ],
  salary: "₹4 – ₹6.5 LPA",
  posted: "2025-06-25",
  logo: "public/ibm_logo.png",
  industry: "Technology / Cloud / AI"
},

{
  id: 25,
  title: "Graduate Trainee Engineer",
  company: "Larsen & Toubro (L&T)",
  location: "Pan India",
  type: "Full-time",
  level: "Entry",
  isFresher: true,
  description:
    "Join L&T's engineering teams to work on large-scale infrastructure and technology projects.",
  requirements: [
    "B.E./B.Tech graduates in relevant streams",
    "Strong analytical and problem-solving skills",
    "Proficient understanding of web markup, HTML5, CSS3, Javascript",
    "Willingness to travel and relocate as needed",
    "Good communication and teamwork abilities"
  ],
  responsibilities: [
    "Assist in project design and execution",
    "Conduct site visits and inspections",
    "Support senior engineers in technical tasks",
    "Participate in training programs",
    "Document project progress and reports"
  ],
  salary: "₹3.5 – ₹5 LPA",
  posted: "2025-06-25",
  logo: "public/lt_logo.png",
  industry: "Engineering & Construction"
},


  {
    id: 26,
    title: "Trainee Software Engineer",
    company: "Mindtree",
    location: "Bangalore / Hyderabad / Pune",
    type: "Full-time",
    level: "Entry",
    isFresher: true,
    description:
      "Join Mindtree's software development teams to build innovative solutions for global clients.",
    requirements: [
      "B.E./B.Tech/MCA graduates",
      "Basic knowledge of programming languages (Java, C#, Python)",
      "Proficient understanding of web markup, HTML5, CSS3, Javascript",
      "Good analytical and logical skills",
      "Mindtree online assessment clearance"
    ],
    responsibilities: [
      "Develop and test software applications",
      "Collaborate with cross-functional teams",
      "Participate in Agile ceremonies",
      "Document code and processes",
      "Contribute to continuous improvement initiatives"
    ],
    salary: "₹3.5 – ₹5 LPA",
    posted: "2025-06-25",
    logo: "public/mindtree_logo.png",
    industry: "IT Services and Consulting"
  },


  {
    id: 27,
    title: "Software Development Trainee",
    company: "Zensar Technologies",
    location: "Pune / Hyderabad / Bangalore",
    type: "Full-time",
    level: "Entry",
    isFresher: true,
    description:
      "Work on software development projects across various domains and technologies.",
    requirements: [
      "B.E./B.Tech/MCA graduates",
      "Basic programming skills in Java/Python/C#",
      "Proficient understanding of web markup, HTML5, CSS3, Javascript",
      "Good problem-solving abilities",
      "Willingness to learn and adapt"
    ],
    responsibilities: [
      "Assist in software design and coding",
      "Conduct unit testing and debugging",
      "Collaborate with senior developers",
      "Participate in code reviews",
      "Maintain project documentation"
    ],
    salary: "₹3.5 – ₹4.5 LPA",
    posted: "2025-06-25",
    logo: "public/zensar_logo.png",
    industry: "IT Services and Consulting"
  },










 
];
