export interface CareerStep {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface Candidate {
  id: string;
  rank: number;
  currentRole: string;
  experienceYears: number;
  location: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  reasoning: string;
  explainability: string[];
  history: CareerStep[];
  career_history: {
    company: string
    title: string
    description: string
    duration_months: number
  }[]
}

export interface DatasetInfo {
  candidatesLoaded: number;
  fileName: string;
  lastUploaded: string;
}

export const MOCK_DATASET: DatasetInfo = {
  candidatesLoaded: 1248,
  fileName: "candidates_q2_2026.jsonl",
  lastUploaded: "Jun 19, 2026 · 09:42",
};

export const DEFAULT_EXTRACTED_SKILLS = [
  "Node.js",
  "Docker",
  "AWS",
  "Microservices",
  "System Design",
];

// export const MOCK_CANDIDATES: Candidate[] = [
//   {
//     id: "CAND-1042",
//     rank: 1,
//     currentRole: "Staff Backend Engineer",
//     experienceYears: 9,
//     location: "Berlin, DE",
//     score: 96,
//     matchedSkills: ["Node.js", "Docker", "AWS", "Microservices", "System Design"],
//     missingSkills: [],
//     reasoning: "Deep distributed-systems background with strong AWS and container ops.",
//     explainability: [
//       "9 years of production Node.js backend experience",
//       "Led Docker + Kubernetes deployment at scale",
//       "Designed multi-region AWS infrastructure",
//       "Owned microservices architecture for a 40-service platform",
//     ],
//     history: [
//       {
//         role: "Staff Backend Engineer",
//         company: "NimbusPay",
//         period: "2022 — Present",
//         summary: "Architecture lead for payments core, 40+ microservices on AWS EKS.",
//       },
//       {
//         role: "Senior Backend Engineer",
//         company: "Cloudreach",
//         period: "2019 — 2022",
//         summary: "Built event-driven services with Node.js and Kafka.",
//       },
//       {
//         role: "Backend Engineer",
//         company: "Trivota",
//         period: "2016 — 2019",
//         summary: "Containerized monolith into Docker microservices.",
//       },
//     ],
//   },
//   {
//     id: "CAND-0876",
//     rank: 2,
//     currentRole: "Senior Platform Engineer",
//     experienceYears: 7,
//     location: "Lisbon, PT",
//     score: 91,
//     matchedSkills: ["Node.js", "Docker", "AWS", "System Design"],
//     missingSkills: ["Microservices"],
//     reasoning: "Strong platform and infra skills, lighter on microservices ownership.",
//     explainability: [
//       "7 years backend & platform engineering",
//       "Extensive AWS infrastructure-as-code experience",
//       "Docker-first CI/CD pipelines",
//       "Solid system design fundamentals",
//     ],
//     history: [
//       {
//         role: "Senior Platform Engineer",
//         company: "Vaultline",
//         period: "2021 — Present",
//         summary: "Owned internal developer platform on AWS + Terraform.",
//       },
//       {
//         role: "Backend Engineer",
//         company: "Maply",
//         period: "2018 — 2021",
//         summary: "Node.js APIs with Docker-based deploys.",
//       },
//     ],
//   },
//   {
//     id: "CAND-1190",
//     rank: 3,
//     currentRole: "Senior Backend Engineer",
//     experienceYears: 6,
//     location: "Remote · EU",
//     score: 84,
//     matchedSkills: ["Node.js", "Microservices", "AWS"],
//     missingSkills: ["Docker", "System Design"],
//     reasoning: "Good service-oriented experience, less depth in containerization.",
//     explainability: [
//       "6 years building Node.js services",
//       "Worked across an AWS microservices estate",
//       "Limited hands-on Docker authoring",
//     ],
//     history: [
//       {
//         role: "Senior Backend Engineer",
//         company: "Orbital",
//         period: "2020 — Present",
//         summary: "REST + gRPC services on AWS ECS.",
//       },
//       {
//         role: "Software Engineer",
//         company: "Bytehouse",
//         period: "2018 — 2020",
//         summary: "Feature work on a Node.js monolith.",
//       },
//     ],
//   },
//   {
//     id: "CAND-0521",
//     rank: 4,
//     currentRole: "Backend Engineer",
//     experienceYears: 5,
//     location: "Warsaw, PL",
//     score: 78,
//     matchedSkills: ["Node.js", "Docker"],
//     missingSkills: ["AWS", "Microservices", "System Design"],
//     reasoning: "Solid application engineer, infrastructure exposure still growing.",
//     explainability: [
//       "5 years of Node.js application development",
//       "Comfortable with Docker for local + CI",
//       "Cloud infra mostly GCP, not AWS",
//     ],
//     history: [
//       {
//         role: "Backend Engineer",
//         company: "Lumen Labs",
//         period: "2021 — Present",
//         summary: "Node.js services with Dockerized deployments.",
//       },
//       {
//         role: "Junior Developer",
//         company: "Stackr",
//         period: "2021 — 2021",
//         summary: "API maintenance and bug fixes.",
//       },
//     ],
//   },
//   {
//     id: "CAND-1333",
//     rank: 5,
//     currentRole: "Full-Stack Engineer",
//     experienceYears: 4,
//     location: "Madrid, ES",
//     score: 71,
//     matchedSkills: ["Node.js", "AWS"],
//     missingSkills: ["Docker", "Microservices", "System Design"],
//     reasoning: "Generalist profile, backend depth below senior bar for this role.",
//     explainability: [
//       "4 years full-stack with Node.js backends",
//       "Some AWS Lambda experience",
//       "Limited distributed-systems exposure",
//     ],
//     history: [
//       {
//         role: "Full-Stack Engineer",
//         company: "Brightside",
//         period: "2022 — Present",
//         summary: "React + Node.js product features on serverless AWS.",
//       },
//       {
//         role: "Frontend Developer",
//         company: "Pixelworks",
//         period: "2020 — 2022",
//         summary: "UI development and API integration.",
//       },
//     ],
//   },
// ];
