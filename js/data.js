/* ==========================================================================
   TrackMyApplication — Mock Application Data (js/data.js)
   Stages: Received > Under review > Interview > Decision > Outcome
   ========================================================================== */

const APPLICATION_STAGES = [
  "Received",
  "Under review",
  "Interview",
  "Decision",
  "Outcome"
];

const APPLICATIONS_DATA = [
  {
    ref: "APP-1042",
    email: "alex.rivera@example.com",
    candidateName: "Alex Rivera",
    jobTitle: "Customer Support Specialist",
    company: "Northstar Civic Services",
    appliedDate: "4 November 2026",
    receivedDate: "4 November 2026",
    currentStage: "Interview",
    actionRequired: true,
    nextStep:
      "We would love to meet you for a 30-minute video interview. Please pick one of the three time slots we sent to alex.rivera@example.com, or reply to that email if you need an alternative day.",
    deadline: "18 November 2026 at 5:00 PM",
    expectedBy: "18 November 2026 at 5:00 PM",
    lastUpdated: "13 November 2026",
    history: [
      {
        date: "13 November 2026",
        event: "Invited to first-round interview — waiting for you to choose a time slot."
      },
      {
        date: "8 November 2026",
        event: "Hiring manager started reviewing your application and work examples."
      },
      {
        date: "4 November 2026",
        event: "Application received and confirmation email sent."
      }
    ]
  },
  {
    ref: "APP-1015",
    email: "priya.nair@example.com",
    candidateName: "Priya Nair",
    jobTitle: "Junior Data Analyst",
    company: "Clearwater Health Group",
    appliedDate: "13 November 2026",
    receivedDate: "13 November 2026",
    currentStage: "Received",
    actionRequired: false,
    nextStep:
      "Your application is safely in our system. Our recruitment coordinator is logging all applications from this week and will pass yours to the analytics team next.",
    deadline: null,
    expectedBy: "21 November 2026",
    lastUpdated: "13 November 2026",
    history: [
      {
        date: "13 November 2026",
        event: "Application received safely. Assigned reference APP-1015."
      }
    ]
  },
  {
    ref: "APP-1029",
    email: "marcus.chen@example.com",
    candidateName: "Marcus Chen",
    jobTitle: "Operations Coordinator",
    company: "Harbourline Logistics",
    appliedDate: "7 November 2026",
    receivedDate: "7 November 2026",
    currentStage: "Under review",
    actionRequired: false,
    nextStep:
      "The Operations Team Lead is currently reading your CV and cover note alongside other applicants. You do not need to send anything else right now.",
    deadline: null,
    expectedBy: "20 November 2026",
    lastUpdated: "11 November 2026",
    history: [
      {
        date: "11 November 2026",
        event: "Application moved to 'Under review' with the Operations Team Lead."
      },
      {
        date: "7 November 2026",
        event: "Application received and confirmed."
      }
    ]
  },
  {
    ref: "APP-1064",
    email: "samira.hassan@example.com",
    candidateName: "Samira Hassan",
    jobTitle: "Accessibility Designer",
    company: "Civic Digital Studio",
    appliedDate: "26 October 2026",
    receivedDate: "26 October 2026",
    currentStage: "Decision",
    actionRequired: false,
    nextStep:
      "Thank you for completing your interview. The interview panel is meeting to finalize their decision and we will email and call you with the outcome.",
    deadline: null,
    expectedBy: "17 November 2026",
    lastUpdated: "12 November 2026",
    history: [
      {
        date: "12 November 2026",
        event: "Panel interview completed. Application moved to final 'Decision' stage."
      },
      {
        date: "3 November 2026",
        event: "Interview time slot confirmed for 12 November 2026."
      },
      {
        date: "30 October 2026",
        event: "Application reviewed and shortlisted for interview."
      },
      {
        date: "26 October 2026",
        event: "Application received and confirmed."
      }
    ]
  },
  {
    ref: "APP-1088",
    email: "david.okafor@example.com",
    candidateName: "David Okafor",
    jobTitle: "Community Programme Officer",
    company: "Greenfield Foundation",
    appliedDate: "22 October 2026",
    receivedDate: "22 October 2026",
    currentStage: "Outcome",
    actionRequired: false,
    nextStep:
      "Thank you sincerely for the time and care you put into applying and interviewing with us. On this occasion we have offered the role to another candidate whose background matched our rural outreach project more closely. We would be glad to welcome future applications from you.",
    deadline: null,
    expectedBy: "Completed on 12 November 2026 (no further action needed)",
    lastUpdated: "12 November 2026",
    history: [
      {
        date: "12 November 2026",
        event: "Final outcome shared by email — application closed with our thanks."
      },
      {
        date: "9 November 2026",
        event: "Hiring panel met to make a final decision."
      },
      {
        date: "4 November 2026",
        event: "First-round interview completed."
      },
      {
        date: "27 October 2026",
        event: "Application reviewed by the programme team."
      },
      {
        date: "22 October 2026",
        event: "Application received and confirmed."
      }
    ]
  }
];
