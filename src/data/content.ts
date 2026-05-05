export interface Section {
  id: string;
  titleEn: string;
  titleAm: string;
  contentEn: string;
  contentAm: string;
  isAdvanced?: boolean;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionAm: string;
  optionsEn: string[];
  optionsAm: string[];
  correctAnswer: number;
  explanationEn: string;
  explanationAm: string;
}

export const ISQM2_CONTENT: Section[] = [
  {
    id: "intro",
    titleEn: "1. Definition and Purpose of ISQM 2",
    titleAm: "1. የ ISQM 2 ትርጉም እና ዓላማ",
    contentEn: "International Standard on Quality Management 2 (ISQM 2) deals with the appointment and eligibility of the engagement quality reviewer, and the performance and documentation of an engagement quality review. Its primary purpose is to ensure that a second, objective review is conducted for certain audits and reviews to enhance the quality of the engagement.",
    contentAm: "ዓለም አቀፍ የጥራት አስተዳደር ደረጃ 2 (ISQM 2) የሚያተኩረው የሥራ ጥራት ገምጋሚን (Engagement Quality Reviewer) ምደባ እና ብቁነት፣ እንዲሁም የግምገማውን አፈፃፀም እና ሰነድ አያያዝ ላይ ነው። ዋና ዓላማው ለተወሰኑ የኦዲት ሥራዎች ጥራታቸውን ከፍ ለማድረግ ሲባል ሁለተኛ እና ገለልተኛ የሆነ ግምገማ መደረጉን ማረጋገጥ ነው።",
    isAdvanced: false
  },
  {
    id: "concepts",
    titleEn: "2. Key Concepts and principles",
    titleAm: "2. ቁልፍ ጽንሰ-ሀሳቦች እና መርሆዎች",
    contentEn: "- **Objectivity**: The reviewer must remain unbiased.\n- **Eligibility**: Criteria for who can be a reviewer.\n- **Engagement Quality Review (EQR)**: An objective evaluation of the significant judgments and conclusions of the engagement team.",
    contentAm: "- **ገለልተኝነት (Objectivity)**: ገምጋሚው ያለምንም አድልዎ መሥራት አለበት።\n- **ብቁነት (Eligibility)**: ማን ገምጋሚ ሊሆን እንደሚችል የሚቀመጡ መስፈርቶች ናቸው።\n- **የሥራ ጥራት ግምገማ (EQR)**: በሥራ ቡድኑ የተሰጡ ዋና ዋና ውሳኔዎች እና መደምደሚያዎች ላይ የሚደረግ ተጨባጭ ግምገማ ነው።",
    isAdvanced: false
  },
  {
    id: "eqr-detail",
    titleEn: "3. Engagement Quality Review (EQR) in Detail",
    titleAm: "3. የሥራ ጥራት ግምገማ (EQR) በዝርዝር",
    contentEn: "The EQR involves discussing significant matters with the engagement partner, reviewing financial statements, and evaluating the team's responses to identified risks. It is performed before the report is issued.",
    contentAm: "EQR ከሥራ ባልደረባው (Engagement Partner) ጋር ስለ ዋና ዋና ጉዳዮች መወያየትን፣ የፋይናንስ መግለጫዎችን መመርመርን እና ቡድኑ ለአደጋዎች (Risks) የሰጠውን ምላሽ መገምገምን ያካትታል። ይህ የሚከናወነው ሪፖርቱ ከመውጣቱ በፊት ነው።",
    isAdvanced: true
  },
  {
    id: "objectives",
    titleEn: "4. Objectives of ISQM 2",
    titleAm: "4. የ ISQM 2 ግቦች",
    contentEn: "The objective of the firm is to operate a system of quality management that provides reasonable assurance that the engagement quality review is performed in accordance with the standards and the firm's policies.",
    contentAm: "የድርጅቱ ዓላማ የሥራ ጥራት ግምገማው በደረጃው እና በድርጅቱ ፖሊሲዎች መሠረት መከናወኑን የሚያረጋግጥ የጥራት አስተዳደር ሥርዓት መዘርጋት ነው።",
    isAdvanced: false
  },
  {
    id: "scope",
    titleEn: "5. Scope and Applicability",
    titleAm: "5. ወሰን እና ተፈጻሚነት",
    contentEn: "ISQM 2 applies to all audit firms that are required to perform an engagement quality review under ISQM 1 or by law. It focuses specifically on the roles that ensure the EQR is effective.",
    contentAm: "ISQM 2 በ ISQM 1 ወይም በሕግ መሠረት የሥራ ጥራት ግምገማ እንዲያደርጉ በሚገደዱ ሁሉም የኦዲት ድርጅቶች ላይ ተፈጻሚ ይሆናል። በተለይም የጥራት ግምገማው ውጤታማ መሆኑን በሚያረጋግጡ ሚናዎች ላይ ያተኩራል።",
    isAdvanced: true
  },
  {
    id: "roles",
    titleEn: "6. Roles and Responsibilities of the Reviewer",
    titleAm: "6. የገምጋሚው ሚናዎች እና ኃላፊነቶች",
    contentEn: "The reviewer is responsible for maintaining objectivity throughout the review, reading and understanding the engagement report, and challenging the engagement team's significant judgments.",
    contentAm: "ገምጋሚው በግምገማው ሂደት ሁሉ ገለልተኝነቱን የመጠበቅ፣ የሥራውን ሪፖርት የማንበብ እና የመረዳት፣ እንዲሁም በሥራ ቡድኑ የተሰጡ ዋና ዋና ውሳኔዎችን የመሞገት ኃላፊነት አለበት።",
    isAdvanced: false
  },
  {
    id: "documentation",
    titleEn: "7. Documentation Requirements",
    titleAm: "7. የሰነድ አያያዝ መስፈርቶች",
    contentEn: "Documentation must demonstrate that the EQR was performed correctly, identifying who performed it, what was reviewed, and the date the review was completed.",
    contentAm: "ሰነዶች ግምገማው በትክክል መከናወኑን፣ ማን እንደገመገመው፣ ምን እንደተገመገመ እና ግምገማው የተጠናቀቀበትን ቀን ማሳየት አለባቸው።",
    isAdvanced: true
  },
  {
    id: "diff",
    titleEn: "8. Differences Between ISQM 1 and ISQM 2",
    titleAm: "8. በ ISQM 1 እና ISQM 2 መካከል ያሉ ልዩነቶች",
    contentEn: "ISQM 1 addresses the overall system of quality management for the entire firm. ISQM 2 specifically addresses the engagement quality review process. Think of ISQM 1 as the foundation and ISQM 2 as a specific pillar for high-risk engagements.",
    contentAm: "ISQM 1 ስለ መላው ድርጅት አጠቃላይ የጥራት አስተዳደር ሥርዓት ይናገራል። ISQM 2 ግን በተለይ ስለ ሥራ ጥራት ግምገማ ሂደት ብቻ ያብራራል። ISQM 1 እንደ መሠረት ሲታይ፣ ISQM 2 ደግሞ ለአደገኛ (High-risk) ወደሆኑ ሥራዎች የሚተገበር ምሰሶ ነው።",
    isAdvanced: false
  }
];

export const PRACTICAL_EXAMPLES: Section[] = [
  {
    id: "ex1",
    titleEn: "Practical Example: The Listed Entity",
    titleAm: "ተግባራዊ ምሳሌ፡ በገበያ የተመዘገበ ድርጅት",
    contentEn: "When auditing a publicly listed company, ISQM 2 requires a formal EQR. The reviewer must be a senior partner with no involvement in the current year's audit to ensure full objectivity.",
    contentAm: "በአደባባይ የተመዘገበ (Publicly listed) ኩባንያ ኦዲት በሚደረግበት ጊዜ፣ ISQM 2 መደበኛ የ EQR ግምገማ እንዲደረግ ይጠይቃል። ሙሉ ገለልተኝነትን ለማረጋገጥ ገምጋሚው በዚያ ዓመት የኦዲት ሥራ ላይ ምንም ተሳትፎ የሌለው ከፍተኛ ባለሙያ መሆን አለበት።",
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    questionEn: "What is the primary focus of ISQM 2?",
    questionAm: "የ ISQM 2 ዋና ትኩረት ምንድነው?",
    optionsEn: ["Tax planning", "Engagement Quality Review", "Marketing for firms", "Employee benefits"],
    optionsAm: ["የግብር እቅድ", "የሥራ ጥራት ግምገማ (EQR)", "ለድርጅቶች ማስታወቂያ መስራት", "የሰራተኞች ጥቅማጥቅም"],
    correctAnswer: 1,
    explanationEn: "ISQM 2 specifically deals with the appointment and performance of Engagement Quality Reviews.",
    explanationAm: "ISQM 2 የሚያተኩረው የሥራ ጥራት ገምጋሚዎችን ምደባ እና አፈፃፀም ላይ ነው።"
  },
  {
    id: "q2",
    questionEn: "When should the Engagement Quality Review be completed?",
    questionAm: "የሥራ ጥራት ግምገማው መቼ መጠናቀቅ አለበት?",
    optionsEn: ["After the report is issued", "Before the report is issued", "One year later", "During the planning phase only"],
    optionsAm: ["ሪፖርቱ ከወጣ በኋላ", "ሪፖርቱ ከመውጣቱ በፊት", "ከአንድ ዓመት በኋላ", "በእቅድ ዝግጅት ወቅት ብቻ"],
    correctAnswer: 1,
    explanationEn: "The review must be finalized before the engagement partner signs off on the audit report.",
    explanationAm: "ግምገማው የኦዲት ሪፖርቱ ከመፈረሙ በፊት መጠናቀቅ አለበት።"
  }
];
