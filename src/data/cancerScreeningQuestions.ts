
export interface Question {
  id: number;
  step: number;
  question_text: string;
  field_type: 'toggle' | 'select' | 'multicheck' | 'text';
  options: string[];
  condition_js?: string;
  risk_tag: string;
  weight: Record<string, number | null>;
}

export const cancerScreeningQuestions: Question[] = [
  {
    id: 1,
    step: 0,
    question_text: "Do you consent to share your answers with healthcare professionals for personalised advice?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "",
    risk_tag: "meta",
    weight: {"Yes": 0, "No": null}
  },
  {
    id: 2,
    step: 1,
    question_text: "What is your age group?",
    field_type: "select",
    options: ["<40", "40-54", "55-64", "65+"],
    condition_js: "",
    risk_tag: "demographic",
    weight: {"<40": 0, "40-54": 2, "55-64": 3, "65+": 4}
  },
  {
    id: 3,
    step: 1,
    question_text: "Sex at birth",
    field_type: "select",
    options: ["Male", "Female", "Intersex", "Prefer not to say"],
    condition_js: "",
    risk_tag: "demographic",
    weight: {}
  },
  {
    id: 4,
    step: 1,
    question_text: "Have you ever been diagnosed with cancer before?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "",
    risk_tag: "prior_cancer",
    weight: {"Yes": 6, "No": 0}
  },
  {
    id: 5,
    step: 2,
    question_text: "Has a parent, sibling or child had any type of cancer?",
    field_type: "toggle",
    options: ["Yes", "No", "Unsure"],
    condition_js: "",
    risk_tag: "family_history",
    weight: {"Yes": 4, "No": 0, "Unsure": 2}
  },
  {
    id: 6,
    step: 2,
    question_text: "Your current tobacco status",
    field_type: "select",
    options: ["Never", "Former", "Current – ≤10 pack-years", "Current – >10 pack-years"],
    condition_js: "",
    risk_tag: "tobacco",
    weight: {"Never": 0, "Former": 3, "Current – ≤10 pack-years": 4, "Current – >10 pack-years": 5}
  },
  {
    id: 7,
    step: 2,
    question_text: "Do you consume alcohol >3 times a week?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "",
    risk_tag: "alcohol",
    weight: {"Yes": 2, "No": 0}
  },
  {
    id: 8,
    step: 3,
    question_text: "Have you worked in mining, construction, agriculture or chemical plants (asbestos / pesticides / heavy metals)?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "",
    risk_tag: "occupational",
    weight: {"Yes": 3, "No": 0}
  },
  {
    id: 9,
    step: 3,
    question_text: "How many servings of fruit & vegetables do you eat daily?",
    field_type: "select",
    options: ["0–1", "2–3", "4+"],
    condition_js: "",
    risk_tag: "diet",
    weight: {"0–1": 2, "2–3": 1, "4+": 0}
  },
  {
    id: 10,
    step: 3,
    question_text: "Do you achieve ≥150 minutes of moderate exercise per week?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "",
    risk_tag: "lifestyle",
    weight: {"Yes": 0, "No": 1}
  },
  {
    id: 11,
    step: 3,
    question_text: "Have you ever had ≥5 blistering sunburns?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "",
    risk_tag: "uv_exposure",
    weight: {"Yes": 1, "No": 0}
  },
  {
    id: 12,
    step: 4,
    question_text: "In the past 3 months, have you experienced **any** of these?",
    field_type: "multicheck",
    options: ["Unexplained weight loss >5 kg", "Persistent pain / bleeding", "Non-healing lump / ulcer", "Chronic cough / hoarseness"],
    condition_js: "",
    risk_tag: "red_flag",
    weight: {"Unexplained weight loss >5 kg": 2, "Persistent pain / bleeding": 2, "Non-healing lump / ulcer": 2, "Chronic cough / hoarseness": 2}
  },
  {
    id: 13,
    step: 5,
    question_text: "Are you up to date with recommended cancer screenings for your age (mammogram / colonoscopy / low-dose CT)?",
    field_type: "toggle",
    options: ["Yes", "Overdue / Never"],
    condition_js: "",
    risk_tag: "screening",
    weight: {"Yes": 0, "Overdue / Never": 2}
  },
  {
    id: 14,
    step: 5,
    question_text: "Have you completed the **HPV vaccine** course?",
    field_type: "select",
    options: ["Completed", "Partial", "Not vaccinated"],
    condition_js: "",
    risk_tag: "vaccine",
    weight: {"Completed": 0, "Partial": 1, "Not vaccinated": 2}
  },
  {
    id: 15,
    step: 5,
    question_text: "Have you completed the **Hepatitis-B vaccine** course?",
    field_type: "select",
    options: ["Completed", "Partial", "Not vaccinated"],
    condition_js: "",
    risk_tag: "vaccine",
    weight: {"Completed": 0, "Partial": 1, "Not vaccinated": 1}
  },
  {
    id: 16,
    step: 6,
    question_text: "Women only – Any new breast lump, skin dimpling or nipple discharge?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "answers.sex==='Female'",
    risk_tag: "breast_symptom",
    weight: {"Yes": 5, "No": 0}
  },
  {
    id: 17,
    step: 6,
    question_text: "Women only – Are your Pap smear / HPV test up to date?",
    field_type: "toggle",
    options: ["Yes", "Overdue / Never"],
    condition_js: "answers.sex==='Female'",
    risk_tag: "cervical_screen",
    weight: {"Yes": 0, "Overdue / Never": 2}
  },
  {
    id: 18,
    step: 6,
    question_text: "Men only – Difficulty or pain during urination or weak stream?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "answers.sex==='Male'",
    risk_tag: "prostate_symptom",
    weight: {"Yes": 4, "No": 0}
  },
  {
    id: 19,
    step: 7,
    question_text: "Do you have any chronic illnesses (diabetes, hypertension, etc.)?",
    field_type: "toggle",
    options: ["Yes", "No"],
    condition_js: "",
    risk_tag: "comorbidity",
    weight: {"Yes": 1, "No": 0}
  },
  {
    id: 20,
    step: 7,
    question_text: "Preferred contact method for follow-up",
    field_type: "select",
    options: ["Phone", "WhatsApp", "Email"],
    condition_js: "",
    risk_tag: "meta",
    weight: {}
  },
  {
    id: 21,
    step: 7,
    question_text: "Please provide your mobile number",
    field_type: "text",
    options: [],
    condition_js: "",
    risk_tag: "meta",
    weight: {}
  },
  {
    id: 22,
    step: 7,
    question_text: "Please provide your name",
    field_type: "text",
    options: [],
    condition_js: "",
    risk_tag: "meta",
    weight: {}
  }
];

export const getStepQuestions = (step: number, answers: Record<string, any> = {}) => {
  return cancerScreeningQuestions.filter(q => {
    if (q.step !== step) return false;
    
    if (!q.condition_js) return true;
    
    // Simple condition evaluation for sex-based questions
    if (q.condition_js.includes("answers.sex==='Female'")) {
      return answers.sex === 'Female';
    }
    if (q.condition_js.includes("answers.sex==='Male'")) {
      return answers.sex === 'Male';
    }
    
    return true;
  });
};

export const calculateRiskScore = (answers: Record<string, any>) => {
  let totalScore = 0;
  let hasRedFlags = false;
  
  cancerScreeningQuestions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;
    
    if (question.field_type === 'multicheck' && Array.isArray(answer)) {
      answer.forEach(selectedOption => {
        const weight = question.weight[selectedOption];
        if (weight !== undefined && weight !== null) {
          totalScore += weight;
          if (question.risk_tag === 'red_flag') {
            hasRedFlags = true;
          }
        }
      });
    } else {
      const weight = question.weight[answer];
      if (weight !== undefined && weight !== null) {
        totalScore += weight;
        if (question.risk_tag === 'red_flag' && weight > 0) {
          hasRedFlags = true;
        }
      }
    }
  });
  
  return { totalScore, hasRedFlags };
};

export const getRiskLevel = (totalScore: number, hasRedFlags: boolean) => {
  if (hasRedFlags || totalScore >= 15) {
    return {
      level: 'High',
      color: 'red',
      message: 'We recommend immediate consultation with a healthcare provider.',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200'
    };
  } else if (totalScore >= 8) {
    return {
      level: 'Moderate',
      color: 'orange',
      message: 'Consider scheduling a consultation with a healthcare provider for personalized screening recommendations.',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200'
    };
  } else {
    return {
      level: 'Low',
      color: 'green',
      message: 'Continue with routine screenings as recommended for your age group.',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    };
  }
};
