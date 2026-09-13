export const initialRooms = [
  {
    id: "room-1",
    subject: "COMP304E",
    title: "Looking for a focused study partner",
    description:
      "Review lecture material, compare homework answers, and stay focused together.",
    host: "alex",
    type: "focus",
    capacity: 2,
    members: ["alex"],
    studyConnection: {
      platform: "discord",
      value: "@alex_studies",
    },
    messages: [
      {
        id: "room-1-message-1",
        sender: "alex",
        text: "Hey! I'm reviewing this week's COMP304E lecture.",
      },
      {
        id: "room-1-message-2",
        sender: "alex",
        text: "I'm working through the practice questions now.",
      },
    ],
  },
  {
    id: "room-2",
    subject: "CALC101",
    title: "Calculus homework discussion",
    description:
      "Work through difficult calculus problems and compare different approaches.",
    host: "sam",
    type: "group",
    capacity: 10,
    members: ["sam", "jordan", "priya"],
    studyConnection: {
      platform: "google-meet",
      value: "https://meet.google.com/example",
    },
    messages: [
      {
        id: "room-2-message-1",
        sender: "sam",
        text: "Has anyone started question 4 yet?",
      },
      {
        id: "room-2-message-2",
        sender: "jordan",
        text: "Yeah, I got stuck on the last part.",
      },
      {
        id: "room-2-message-3",
        sender: "priya",
        text: "I think we need to use the chain rule there.",
      },
      {
        id: "room-2-message-4",
        sender: "sam",
        text: "Ohh that makes sense. I'll try it that way.",
      },
    ],
  },
  {
    id: "room-3",
    subject: "PHYS201",
    title: "Physics revision session",
    description:
      "Review physics concepts, practise problems, and prepare for the upcoming test.",
    host: "maya",
    type: "focus",
    capacity: 2,
    members: ["maya"],
    studyConnection: {
      platform: "zoom",
      value: "https://zoom.us/j/example",
    },
    messages: [
      {
        id: "room-3-message-1",
        sender: "maya",
        text: "I'm revising forces and motion today.",
      },
      {
        id: "room-3-message-2",
        sender: "maya",
        text: "Let me know if you want to work through some practice problems.",
      },
    ],
  },
  {
    id: "room-4",
    subject: "CS204",
    title: "Programming practice",
    description:
      "Practise coding exercises and discuss algorithms with other students.",
    host: "leo",
    type: "group",
    capacity: 10,
    members: ["leo", "nina"],
    studyConnection: {
      platform: "discord",
      value: "@leo_codes",
    },
    messages: [
      {
        id: "room-4-message-1",
        sender: "leo",
        text: "I'm working on the programming exercises now.",
      },
      {
        id: "room-4-message-2",
        sender: "nina",
        text: "Same here! Which question are you on?",
      },
      {
        id: "room-4-message-3",
        sender: "leo",
        text: "Question 6. The algorithm is confusing me a little.",
      },
    ],
  },
  {
    id: "room-5",
    subject: "BIO110",
    title: "Biology exam revision",
    description:
      "Go over key biology topics, quiz each other, and review class notes.",
    host: "emma",
    type: "group",
    capacity: 10,
    members: ["emma", "noah", "olivia", "liam"],
    studyConnection: {
      platform: "google-meet",
      value: "https://meet.google.com/biology",
    },
    messages: [
      {
        id: "room-5-message-1",
        sender: "emma",
        text: "Should we start with cell biology?",
      },
      {
        id: "room-5-message-2",
        sender: "noah",
        text: "Yeah, I need to review that section.",
      },
      {
        id: "room-5-message-3",
        sender: "olivia",
        text: "I can quiz everyone after we finish the notes.",
      },
      {
        id: "room-5-message-4",
        sender: "liam",
        text: "Sounds good!",
      },
    ],
  },
  {
    id: "room-6",
    subject: "CHEM101",
    title: "Chemistry problem solving",
    description:
      "Solve chemistry practice questions and help each other understand tricky topics.",
    host: "sophia",
    type: "focus",
    capacity: 2,
    members: ["sophia"],
    studyConnection: {
      platform: "discord",
      value: "@sophia_studies",
    },
    messages: [
      {
        id: "room-6-message-1",
        sender: "sophia",
        text: "I'm going through the practice problems for tomorrow.",
      },
      {
        id: "room-6-message-2",
        sender: "sophia",
        text: "The equilibrium questions are the hardest for me.",
      },
    ],
  },
  {
    id: "room-7",
    subject: "ELEC200",
    title: "Electrical engineering study group",
    description:
      "Review electrical engineering concepts, solve problems, and prepare for upcoming assessments.",
    host: "daniel",
    type: "group",
    capacity: 10,
    members: ["daniel", "ava", "ethan"],
    studyConnection: {
      platform: "zoom",
      value: "https://zoom.us/j/history",
    },
    messages: [
      {
        id: "room-7-message-1",
        sender: "daniel",
        text: "What topic are you guys reviewing today?",
      },
      {
        id: "room-7-message-2",
        sender: "ava",
        text: "I'm working through the circuit analysis questions.",
      },
      {
        id: "room-7-message-3",
        sender: "ethan",
        text: "Same here. I think I finally understand Kirchhoff's laws.",
      },
    ],
  },
];