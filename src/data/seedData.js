import { v4 as uuidv4 } from 'uuid';

export const seedData = {
  meta: {
    template: "tpl-sidebar",
    accentColor: "#1F3E5A",
    fontPair: "inter-roboto",
    lastSaved: new Date().toISOString()
  },
  sections: [
    {
      id: uuidv4(),
      type: "header",
      visible: true,
      data: {
        name: "Your Name",
        title: "Your Job Title",
        email: "email@example.com",
        phone: "+1 (___) ___-____",
        location: "City, State",
        linkedin: "",
        github: "",
        website: "",
        photo: null
      }
    },
    {
      id: uuidv4(),
      type: "summary",
      visible: true,
      data: {
        text: "Write a brief professional summary highlighting your key skills, years of experience, and career objectives..."
      }
    },
    {
      id: uuidv4(),
      type: "experience",
      visible: true,
      data: {
        items: [
          {
            id: uuidv4(),
            company: "Company Name",
            role: "Job Title",
            startDate: "Start Date",
            endDate: "End Date",
            location: "City, State",
            bullets: [
              "Describe a key accomplishment or responsibility using action verbs and quantifiable results...",
              "Add another achievement that demonstrates your impact in this role..."
            ]
          }
        ]
      }
    },
    {
      id: uuidv4(),
      type: "education",
      visible: true,
      data: {
        items: [
          {
            id: uuidv4(),
            institution: "University / College Name",
            degree: "Degree Title",
            field: "",
            startDate: "Start Year",
            endDate: "End Year",
            gpa: "___ / 4.0",
            honors: ""
          }
        ]
      }
    },
    {
      id: uuidv4(),
      type: "skills",
      visible: true,
      data: {
        categories: [
          { id: uuidv4(), label: "Languages", skills: ["Skill 1", "Skill 2", "Skill 3"] },
          { id: uuidv4(), label: "Frameworks", skills: ["Framework 1", "Framework 2"] },
          { id: uuidv4(), label: "Tools", skills: ["Tool 1", "Tool 2", "Tool 3"] }
        ]
      }
    },
    {
      id: uuidv4(),
      type: "projects",
      visible: true,
      data: {
        items: [
          {
            id: uuidv4(),
            name: "Project Name",
            description: "Brief project description",
            techStack: "Tech 1, Tech 2, Tech 3",
            link: "",
            bullets: [
              "Describe the project outcome or key feature you built..."
            ]
          }
        ]
      }
    },
    {
      id: uuidv4(),
      type: "certifications",
      visible: true,
      data: {
        items: [
          { id: uuidv4(), name: "Certification Name", issuer: "Issuing Organization", date: "Date Earned", link: "" }
        ]
      }
    }
  ]
};
