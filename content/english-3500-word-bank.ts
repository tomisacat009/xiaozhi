import integratedWordList from "@/content/english-3500-integrated-word-list.json";

export type English3500Category = {
  id: string;
  title: string;
  summary: string;
  targetWordCount: number;
  subcategories: string[];
};

export type English3500Word = {
  id?: string;
  word: string;
  phonetic?: string | null;
  pos?: string | null;
  coreMeaning?: string | null;
  extendedMeanings: string[];
  collocations: string[];
  confusingWords: string[];
  topicTags: string[];
  examPriority: "high" | "medium" | "low";
  exampleSentence?: string | null;
  categoryId?: string;
  groupId?: string;
  groupTitle?: string;
  detailLevel?: "full" | "index";
  searchTokens?: string[];
};

export type English3500Group = {
  id: string;
  title: string;
  categoryId: string;
  summary: string;
  targetWordCount: number;
  recommendedStage: string;
  words: English3500Word[];
};

export type English3500Stage = {
  id: string;
  title: string;
  summary: string;
  targetWordCount: number;
  focusGroupIds: string[];
};

const categories = [
  {
    id: "core-high-frequency",
    title: "高频核心词",
    summary: "优先覆盖课本、月考阅读、完形和写作里最常见的基础词。",
    targetWordCount: 800,
    subcategories: ["基础动作词", "学习考试词", "校园生活词", "逻辑连接词"],
  },
  {
    id: "root-affix-expansion",
    title: "词根词缀扩展词",
    summary: "把能长出一串词的核心义抓住，帮助孩子从记一个词走向记一组词。",
    targetWordCount: 900,
    subcategories: ["行为词族", "认知词族", "结构词族", "前后缀方向词"],
  },
  {
    id: "confusing-synonyms",
    title: "近义易混词",
    summary: "专门处理“都认识但总选错”的高频辨析词。",
    targetWordCount: 500,
    subcategories: ["表达类", "观察类", "问题结果类", "花费变化类"],
  },
  {
    id: "polysemy-words",
    title: "一词多义词",
    summary: "把阅读和完形里最容易卡住的多义词拆成分支记忆。",
    targetWordCount: 450,
    subcategories: ["动作多义词", "名词多义词", "介词副词多义词"],
  },
  {
    id: "collocations-and-chunks",
    title: "固定搭配与词块",
    summary: "按块背而不是按单词背，帮助高一孩子更快把词变成可用表达。",
    targetWordCount: 500,
    subcategories: ["学习表达块", "人际关系块", "写作逻辑块", "高频动词搭配"],
  },
  {
    id: "theme-vocabulary",
    title: "主题场景词",
    summary: "按教材和月考高频主题组织词汇，帮助孩子读文章时先有词域预判。",
    targetWordCount: 350,
    subcategories: ["学校生活", "科技网络", "环境保护", "人物品质"],
  },
] satisfies English3500Category[];

const groups = [
  {
    id: "core-actions-a",
    title: "核心动作词 A 组",
    categoryId: "core-high-frequency",
    summary: "高一最常见的动作与状态词，先保证见词能认、能落回句子。",
    targetWordCount: 80,
    recommendedStage: "高一上学期第 1 阶段",
    words: [
      {
        word: "develop",
        phonetic: "/dɪˈveləp/",
        pos: "v.",
        coreMeaning: "发展；形成",
        extendedMeanings: ["冲洗（照片）"],
        collocations: ["develop a habit", "develop an interest in", "develop quickly"],
        confusingWords: ["improve", "grow"],
        topicTags: ["growth", "science", "school"],
        examPriority: "high",
        exampleSentence: "She developed an interest in biology in senior high school.",
      },
      {
        word: "remain",
        phonetic: "/rɪˈmeɪn/",
        pos: "v.",
        coreMeaning: "仍然是；保持",
        extendedMeanings: ["留下"],
        collocations: ["remain calm", "remain unknown"],
        confusingWords: ["stay", "keep"],
        topicTags: ["reading", "logic"],
        examPriority: "high",
        exampleSentence: "The question remains difficult for many new students.",
      },
      {
        word: "include",
        phonetic: "/ɪnˈkluːd/",
        pos: "v.",
        coreMeaning: "包括",
        extendedMeanings: [],
        collocations: ["include in", "including students from"],
        confusingWords: ["contain", "cover"],
        topicTags: ["reading", "school"],
        examPriority: "high",
        exampleSentence: "The report includes examples from daily school life.",
      },
      {
        word: "improve",
        phonetic: "/ɪmˈpruːv/",
        pos: "v.",
        coreMeaning: "提高；改进",
        extendedMeanings: [],
        collocations: ["improve skills", "improve greatly"],
        confusingWords: ["develop", "increase"],
        topicTags: ["school", "growth"],
        examPriority: "high",
        exampleSentence: "Regular review can improve both speed and accuracy.",
      },
      {
        word: "prepare",
        phonetic: "/prɪˈpeə(r)/",
        pos: "v.",
        coreMeaning: "准备",
        extendedMeanings: [],
        collocations: ["prepare for", "prepare a speech"],
        confusingWords: ["plan", "arrange"],
        topicTags: ["school", "exam"],
        examPriority: "high",
        exampleSentence: "Students should prepare for the monthly exam in small steps.",
      },
    ],
  },
  {
    id: "core-school-b",
    title: "学校与考试高频词 B 组",
    categoryId: "core-high-frequency",
    summary: "和课堂、作业、月考最贴近的一组基础词。",
    targetWordCount: 90,
    recommendedStage: "高一上学期第 1 阶段",
    words: [
      {
        word: "subject",
        phonetic: "/ˈsʌbdʒɪkt/",
        pos: "n.",
        coreMeaning: "学科；主题",
        extendedMeanings: [],
        collocations: ["school subjects", "main subject"],
        confusingWords: ["topic", "course"],
        topicTags: ["school"],
        examPriority: "high",
        exampleSentence: "Physics is a subject that needs both formulas and intuition.",
      },
      {
        word: "review",
        phonetic: "/rɪˈvjuː/",
        pos: "v./n.",
        coreMeaning: "复习；回顾",
        extendedMeanings: ["评论"],
        collocations: ["review notes", "a weekly review"],
        confusingWords: ["revise"],
        topicTags: ["school", "exam"],
        examPriority: "high",
        exampleSentence: "A short daily review helps new words stay in memory longer.",
      },
      {
        word: "method",
        phonetic: "/ˈmeθəd/",
        pos: "n.",
        coreMeaning: "方法",
        extendedMeanings: [],
        collocations: ["teaching method", "a useful method"],
        confusingWords: ["way", "approach"],
        topicTags: ["school", "thinking"],
        examPriority: "high",
        exampleSentence: "The right method often matters more than simply spending more time.",
      },
      {
        word: "score",
        phonetic: "/skɔː(r)/",
        pos: "n./v.",
        coreMeaning: "分数；得分",
        extendedMeanings: [],
        collocations: ["high score", "score well"],
        confusingWords: ["mark", "grade"],
        topicTags: ["exam", "school"],
        examPriority: "high",
        exampleSentence: "Her reading score improved after she learned to group words by meaning.",
      },
      {
        word: "activity",
        phonetic: "/ækˈtɪvəti/",
        pos: "n.",
        coreMeaning: "活动",
        extendedMeanings: [],
        collocations: ["school activity", "outdoor activities"],
        confusingWords: ["event"],
        topicTags: ["school", "life"],
        examPriority: "high",
        exampleSentence: "The class activity gave students a chance to use new expressions.",
      },
    ],
  },
  {
    id: "roots-act-form",
    title: "act / form 词族组",
    categoryId: "root-affix-expansion",
    summary: "从高频教材词族入手，让孩子第一次感受到“一个核心义长出一串词”。",
    targetWordCount: 120,
    recommendedStage: "高一上学期第 2 阶段",
    words: [
      {
        word: "act",
        phonetic: "/ækt/",
        pos: "v./n.",
        coreMeaning: "行动；表现",
        extendedMeanings: [],
        collocations: ["act quickly", "take action"],
        confusingWords: ["behave"],
        topicTags: ["roots", "school"],
        examPriority: "high",
        exampleSentence: "Students should act on mistakes as soon as they find them.",
      },
      {
        word: "action",
        phonetic: "/ˈækʃn/",
        pos: "n.",
        coreMeaning: "行动",
        extendedMeanings: [],
        collocations: ["take action", "action plan"],
        confusingWords: ["activity"],
        topicTags: ["roots"],
        examPriority: "high",
        exampleSentence: "A clear action plan makes review much easier to follow.",
      },
      {
        word: "active",
        phonetic: "/ˈæktɪv/",
        pos: "adj.",
        coreMeaning: "积极的；活跃的",
        extendedMeanings: [],
        collocations: ["be active in", "active learning"],
        confusingWords: ["positive"],
        topicTags: ["roots", "school"],
        examPriority: "high",
        exampleSentence: "Active learning helps students remember more than passive reading.",
      },
      {
        word: "form",
        phonetic: "/fɔːm/",
        pos: "n./v.",
        coreMeaning: "形式；形成",
        extendedMeanings: ["表格"],
        collocations: ["in the form of", "form a habit"],
        confusingWords: ["shape", "type"],
        topicTags: ["roots", "writing"],
        examPriority: "high",
        exampleSentence: "Useful routines form slowly but stay with students for a long time.",
      },
      {
        word: "formal",
        phonetic: "/ˈfɔːml/",
        pos: "adj.",
        coreMeaning: "正式的",
        extendedMeanings: [],
        collocations: ["formal language", "formal writing"],
        confusingWords: ["official"],
        topicTags: ["roots", "writing"],
        examPriority: "medium",
        exampleSentence: "However is often more formal than but in writing tasks.",
      },
    ],
  },
  {
    id: "roots-spect-struct",
    title: "spect / struct 词根组",
    categoryId: "root-affix-expansion",
    summary: "让孩子通过“看”和“结构”两条核心义练习由根猜词。",
    targetWordCount: 120,
    recommendedStage: "高一上学期第 2 阶段",
    words: [
      {
        word: "inspect",
        phonetic: "/ɪnˈspekt/",
        pos: "v.",
        coreMeaning: "检查",
        extendedMeanings: [],
        collocations: ["inspect carefully", "inspect the machine"],
        confusingWords: ["examine"],
        topicTags: ["roots", "science"],
        examPriority: "medium",
        exampleSentence: "The teacher asked the class to inspect the circuit before testing it.",
      },
      {
        word: "respect",
        phonetic: "/rɪˈspekt/",
        pos: "v./n.",
        coreMeaning: "尊重",
        extendedMeanings: [],
        collocations: ["show respect", "respect others"],
        confusingWords: ["admire"],
        topicTags: ["roots", "people"],
        examPriority: "high",
        exampleSentence: "Group work teaches students to respect different ways of thinking.",
      },
      {
        word: "construct",
        phonetic: "/kənˈstrʌkt/",
        pos: "v.",
        coreMeaning: "建造；构建",
        extendedMeanings: [],
        collocations: ["construct a model", "construct meaning"],
        confusingWords: ["build"],
        topicTags: ["roots", "science"],
        examPriority: "medium",
        exampleSentence: "Students can construct a mind map to connect related vocabulary.",
      },
      {
        word: "structure",
        phonetic: "/ˈstrʌktʃə(r)/",
        pos: "n.",
        coreMeaning: "结构",
        extendedMeanings: [],
        collocations: ["sentence structure", "social structure"],
        confusingWords: ["framework"],
        topicTags: ["roots", "reading"],
        examPriority: "high",
        exampleSentence: "Good reading often starts with understanding the structure of a paragraph.",
      },
    ],
  },
  {
    id: "affix-un-re",
    title: "un- / re- 方向词缀组",
    categoryId: "root-affix-expansion",
    summary: "让高一学生从最实用的否定和重复方向词缀开始建立构词直觉。",
    targetWordCount: 90,
    recommendedStage: "高一上学期第 2 阶段",
    words: [
      {
        word: "unusual",
        phonetic: "/ʌnˈjuːʒuəl/",
        pos: "adj.",
        coreMeaning: "不寻常的",
        extendedMeanings: [],
        collocations: ["an unusual idea"],
        confusingWords: ["special"],
        topicTags: ["affix", "reading"],
        examPriority: "medium",
        exampleSentence: "The article began with an unusual example to catch readers' attention.",
      },
      {
        word: "rewrite",
        phonetic: "/ˌriːˈraɪt/",
        pos: "v.",
        coreMeaning: "重写",
        extendedMeanings: [],
        collocations: ["rewrite a sentence", "rewrite the ending"],
        confusingWords: ["review"],
        topicTags: ["affix", "writing"],
        examPriority: "high",
        exampleSentence: "Rewriting a weak sentence is often the fastest way to improve style.",
      },
      {
        word: "return",
        phonetic: "/rɪˈtɜːn/",
        pos: "v./n.",
        coreMeaning: "返回；归还",
        extendedMeanings: [],
        collocations: ["return to school", "return a book"],
        confusingWords: ["go back"],
        topicTags: ["affix", "school"],
        examPriority: "high",
        exampleSentence: "Students should return to the core meaning when a word has several uses.",
      },
    ],
  },
  {
    id: "confusing-say-talk",
    title: "say / speak / talk / tell 辨析组",
    categoryId: "confusing-synonyms",
    summary: "解决高一最容易混掉的一组表达类动词。",
    targetWordCount: 70,
    recommendedStage: "高一上学期第 3 阶段",
    words: [
      {
        word: "say",
        phonetic: "/seɪ/",
        pos: "v.",
        coreMeaning: "说",
        extendedMeanings: [],
        collocations: ["say hello", "say that"],
        confusingWords: ["speak", "talk", "tell"],
        topicTags: ["confusing", "communication"],
        examPriority: "high",
        exampleSentence: "He said that short daily review was more useful than long cramming.",
      },
      {
        word: "speak",
        phonetic: "/spiːk/",
        pos: "v.",
        coreMeaning: "说话；讲（语言）",
        extendedMeanings: [],
        collocations: ["speak English", "speak to"],
        confusingWords: ["say", "talk"],
        topicTags: ["confusing", "communication"],
        examPriority: "high",
        exampleSentence: "Students who speak more in class usually remember words better.",
      },
      {
        word: "talk",
        phonetic: "/tɔːk/",
        pos: "v./n.",
        coreMeaning: "交谈",
        extendedMeanings: [],
        collocations: ["talk about", "have a talk"],
        confusingWords: ["say", "speak"],
        topicTags: ["confusing", "communication"],
        examPriority: "high",
        exampleSentence: "The pair work task asked them to talk about their study methods.",
      },
      {
        word: "tell",
        phonetic: "/tel/",
        pos: "v.",
        coreMeaning: "告诉",
        extendedMeanings: ["辨别"],
        collocations: ["tell someone", "tell the truth"],
        confusingWords: ["say", "speak"],
        topicTags: ["confusing", "communication"],
        examPriority: "high",
        exampleSentence: "The teacher told the class to sort words by meaning, not by alphabet.",
      },
    ],
  },
  {
    id: "confusing-problem-group",
    title: "problem / question / trouble 辨析组",
    categoryId: "confusing-synonyms",
    summary: "围绕“问题”这个中文义，把实际语境里的差别拆清楚。",
    targetWordCount: 70,
    recommendedStage: "高一上学期第 3 阶段",
    words: [
      {
        word: "problem",
        phonetic: "/ˈprɒbləm/",
        pos: "n.",
        coreMeaning: "问题；难题",
        extendedMeanings: [],
        collocations: ["solve a problem"],
        confusingWords: ["question", "trouble"],
        topicTags: ["confusing", "thinking"],
        examPriority: "high",
        exampleSentence: "The real problem was not the number of words but the lack of grouping.",
      },
      {
        word: "question",
        phonetic: "/ˈkwestʃən/",
        pos: "n./v.",
        coreMeaning: "问题；提问",
        extendedMeanings: [],
        collocations: ["answer a question", "question the result"],
        confusingWords: ["problem"],
        topicTags: ["confusing", "school"],
        examPriority: "high",
        exampleSentence: "A question in the exam may test a word's second meaning instead of the first.",
      },
      {
        word: "trouble",
        phonetic: "/ˈtrʌbl/",
        pos: "n.",
        coreMeaning: "麻烦；困难",
        extendedMeanings: [],
        collocations: ["have trouble doing"],
        confusingWords: ["problem"],
        topicTags: ["confusing", "school"],
        examPriority: "high",
        exampleSentence: "Many students have trouble keeping similar words apart without comparison cards.",
      },
    ],
  },
  {
    id: "polysemy-develop-record",
    title: "develop / record 多义组",
    categoryId: "polysemy-words",
    summary: "阅读中最常见的“看起来熟，但义项一换就卡住”的词。",
    targetWordCount: 80,
    recommendedStage: "高一上学期第 3 阶段",
    words: [
      {
        word: "record",
        phonetic: "/rɪˈkɔːd/; /ˈrekɔːd/",
        pos: "v./n.",
        coreMeaning: "记录；记录物",
        extendedMeanings: ["唱片", "纪录"],
        collocations: ["record data", "keep a record"],
        confusingWords: ["note"],
        topicTags: ["polysemy", "science"],
        examPriority: "high",
        exampleSentence: "Students should record new collocations instead of writing only the Chinese meaning.",
      },
      {
        word: "mean",
        phonetic: "/miːn/",
        pos: "v./adj.",
        coreMeaning: "意思是；意味着",
        extendedMeanings: ["打算", "吝啬的"],
        collocations: ["mean to do", "mean that"],
        confusingWords: ["indicate"],
        topicTags: ["polysemy", "reading"],
        examPriority: "high",
        exampleSentence: "A familiar word may mean something different in a science article.",
      },
      {
        word: "develop",
        phonetic: "/dɪˈveləp/",
        pos: "v.",
        coreMeaning: "发展；形成",
        extendedMeanings: ["冲洗（照片）"],
        collocations: ["develop a skill", "develop film"],
        confusingWords: ["improve"],
        topicTags: ["polysemy", "reading"],
        examPriority: "high",
        exampleSentence: "Students are often surprised when develop means more than just get better.",
      },
    ],
  },
  {
    id: "collocations-study",
    title: "学习表达词块组",
    categoryId: "collocations-and-chunks",
    summary: "把高一最需要会用的学习表达做成整块，帮助从会认过渡到会写。",
    targetWordCount: 90,
    recommendedStage: "高一上学期第 4 阶段",
    words: [
      {
        word: "hand in",
        phonetic: "/hænd ɪn/",
        pos: "phr. v.",
        coreMeaning: "上交",
        extendedMeanings: [],
        collocations: ["hand in homework"],
        confusingWords: ["give in"],
        topicTags: ["chunk", "school"],
        examPriority: "high",
        exampleSentence: "Students should hand in the vocabulary log every Friday.",
      },
      {
        word: "take notes",
        phonetic: "/teɪk nəʊts/",
        pos: "phr.",
        coreMeaning: "记笔记",
        extendedMeanings: [],
        collocations: ["take notes on"],
        confusingWords: ["write down"],
        topicTags: ["chunk", "school"],
        examPriority: "high",
        exampleSentence: "Taking notes by group can make review much more efficient.",
      },
      {
        word: "make progress",
        phonetic: "/meɪk ˈprəʊɡres/",
        pos: "phr.",
        coreMeaning: "取得进步",
        extendedMeanings: [],
        collocations: ["make progress in"],
        confusingWords: ["improve"],
        topicTags: ["chunk", "growth"],
        examPriority: "high",
        exampleSentence: "He made steady progress after he began revising words in themed decks.",
      },
    ],
  },
  {
    id: "collocations-logic",
    title: "写作逻辑词块组",
    categoryId: "collocations-and-chunks",
    summary: "高一写作和阅读里最值得先掌握的一组逻辑块。",
    targetWordCount: 80,
    recommendedStage: "高一上学期第 4 阶段",
    words: [
      {
        word: "as a result",
        phonetic: "/æz ə rɪˈzʌlt/",
        pos: "phr.",
        coreMeaning: "结果",
        extendedMeanings: [],
        collocations: ["as a result, ..."],
        confusingWords: ["therefore", "in fact"],
        topicTags: ["chunk", "writing"],
        examPriority: "high",
        exampleSentence: "The words were grouped by meaning. As a result, revision became much easier.",
      },
      {
        word: "for example",
        phonetic: "/fɔːr ɪɡˈzɑːmpl/",
        pos: "phr.",
        coreMeaning: "例如",
        extendedMeanings: [],
        collocations: ["for example, ..."],
        confusingWords: ["such as"],
        topicTags: ["chunk", "writing"],
        examPriority: "high",
        exampleSentence: "For example, develop can mean form, improve, or even process film.",
      },
      {
        word: "on the other hand",
        phonetic: "/ɒn ði ˈʌðə hænd/",
        pos: "phr.",
        coreMeaning: "另一方面",
        extendedMeanings: [],
        collocations: ["on the other hand, ..."],
        confusingWords: ["however"],
        topicTags: ["chunk", "writing"],
        examPriority: "medium",
        exampleSentence: "Topic words are useful. On the other hand, confusing pairs need direct comparison.",
      },
    ],
  },
  {
    id: "theme-school-life",
    title: "学校生活主题词组",
    categoryId: "theme-vocabulary",
    summary: "对接高一课文、周测和月考最常见的校园语境。",
    targetWordCount: 120,
    recommendedStage: "高一上学期全阶段",
    words: [
      {
        word: "lecture",
        phonetic: "/ˈlektʃə(r)/",
        pos: "n.",
        coreMeaning: "讲座；课",
        extendedMeanings: [],
        collocations: ["attend a lecture"],
        confusingWords: ["lesson"],
        topicTags: ["theme", "school"],
        examPriority: "medium",
        exampleSentence: "The students attended a lecture on how to build a review routine.",
      },
      {
        word: "schedule",
        phonetic: "/ˈʃedjuːl/",
        pos: "n./v.",
        coreMeaning: "日程；安排",
        extendedMeanings: [],
        collocations: ["study schedule"],
        confusingWords: ["plan"],
        topicTags: ["theme", "school"],
        examPriority: "high",
        exampleSentence: "A clear schedule helps students manage schoolwork and revision together.",
      },
      {
        word: "assignment",
        phonetic: "/əˈsaɪnmənt/",
        pos: "n.",
        coreMeaning: "作业；任务",
        extendedMeanings: [],
        collocations: ["finish an assignment"],
        confusingWords: ["task"],
        topicTags: ["theme", "school"],
        examPriority: "medium",
        exampleSentence: "The vocabulary assignment asked them to compare similar verbs in groups.",
      },
    ],
  },
  {
    id: "theme-science-tech",
    title: "科技与方法主题词组",
    categoryId: "theme-vocabulary",
    summary: "覆盖高一阅读中最常见的科技、实验和学习方法场景。",
    targetWordCount: 110,
    recommendedStage: "高一上学期第 2 阶段",
    words: [
      {
        word: "experiment",
        phonetic: "/ɪkˈsperɪmənt/",
        pos: "n.",
        coreMeaning: "实验",
        extendedMeanings: [],
        collocations: ["carry out an experiment"],
        confusingWords: ["test"],
        topicTags: ["theme", "science"],
        examPriority: "high",
        exampleSentence: "The article described an experiment on memory and word grouping.",
      },
      {
        word: "device",
        phonetic: "/dɪˈvaɪs/",
        pos: "n.",
        coreMeaning: "设备；装置",
        extendedMeanings: [],
        collocations: ["digital device"],
        confusingWords: ["machine"],
        topicTags: ["theme", "technology"],
        examPriority: "medium",
        exampleSentence: "Some students use a digital device to review vocabulary cards on the bus.",
      },
      {
        word: "efficient",
        phonetic: "/ɪˈfɪʃnt/",
        pos: "adj.",
        coreMeaning: "高效的",
        extendedMeanings: [],
        collocations: ["an efficient method"],
        confusingWords: ["effective"],
        topicTags: ["theme", "study"],
        examPriority: "high",
        exampleSentence: "A grouped word bank is often more efficient than a random long list.",
      },
    ],
  },
] satisfies English3500Group[];

const stages = [
  {
    id: "stage-1",
    title: "地基期",
    summary: "先背高频核心词和最常用词块，保证课文和月考不再大面积陌生。",
    targetWordCount: 400,
    focusGroupIds: ["core-actions-a", "core-school-b", "collocations-study"],
  },
  {
    id: "stage-2",
    title: "扩展期",
    summary: "在高频词基础上进入词根词缀和主题词，让单词开始连成网络。",
    targetWordCount: 400,
    focusGroupIds: ["roots-act-form", "roots-spect-struct", "theme-school-life", "theme-science-tech"],
  },
  {
    id: "stage-3",
    title: "纠错期",
    summary: "集中处理近义易混词和一词多义词，减少考试里“见过却选错”的情况。",
    targetWordCount: 350,
    focusGroupIds: ["confusing-say-talk", "confusing-problem-group", "polysemy-develop-record"],
  },
  {
    id: "stage-4",
    title: "表达期",
    summary: "把固定搭配和写作逻辑词块补进来，让单词真正变成会用的表达。",
    targetWordCount: 350,
    focusGroupIds: ["collocations-study", "collocations-logic", "affix-un-re"],
  },
] satisfies English3500Stage[];

function normalizeWord(word: string) {
  return word.trim().toLowerCase();
}

function buildSearchTokens(wordEntry: English3500Word) {
  const baseTokens = [
    wordEntry.word,
    wordEntry.coreMeaning ?? "",
    ...(wordEntry.extendedMeanings ?? []),
    ...(wordEntry.collocations ?? []),
    ...(wordEntry.confusingWords ?? []),
    ...(wordEntry.topicTags ?? []),
  ];

  return [...new Set(baseTokens.flatMap((token) => normalizeWord(token).split(/[\s/-]+/).filter(Boolean)))];
}

function inferPartOfSpeech(word: string): string | null {
  if (word.includes(" ")) {
    return "phr.";
  }

  if (word.endsWith("ly")) {
    return "adv.";
  }

  if (word.endsWith("ing") || word.endsWith("ed")) {
    return "v.";
  }

  if (word.endsWith("tion") || word.endsWith("ment") || word.endsWith("ness") || word.endsWith("ity")) {
    return "n.";
  }

  if (word.endsWith("ous") || word.endsWith("ful") || word.endsWith("able") || word.endsWith("ive") || word.endsWith("al")) {
    return "adj.";
  }

  return null;
}

const categoryTitles = new Map(categories.map((category) => [category.id, category.title]));
const generatedPriorityByCategory: Record<string, English3500Word["examPriority"]> = {
  "core-high-frequency": "high",
  "root-affix-expansion": "medium",
  "confusing-synonyms": "high",
  "polysemy-words": "high",
  "collocations-and-chunks": "medium",
  "theme-vocabulary": "medium",
};

const curatedEntries = groups.flatMap((group) =>
  group.words.map((wordEntry, index) => ({
    ...wordEntry,
    id: `${group.id}-${index + 1}`,
    categoryId: group.categoryId,
    groupId: group.id,
    groupTitle: group.title,
    detailLevel: "full" as const,
    searchTokens: buildSearchTokens(wordEntry),
  })),
);

const curatedWordSet = new Set(curatedEntries.map((entry) => normalizeWord(entry.word)));
const seededCountByCategory = new Map<string, number>();

for (const entry of curatedEntries) {
  const categoryId = entry.categoryId ?? "core-high-frequency";
  seededCountByCategory.set(categoryId, (seededCountByCategory.get(categoryId) ?? 0) + 1);
}

function createGeneratedWord(
  word: string,
  categoryId: string,
  ordinal: number,
  categoryOrdinal: number,
): English3500Word {
  const categoryTitle = categoryTitles.get(categoryId) ?? "整合词库";
  const groupId = `${categoryId}-index-${String(categoryOrdinal).padStart(2, "0")}`;
  const groupTitle = `${categoryTitle}索引组 ${String(categoryOrdinal).padStart(2, "0")}`;

  return {
    id: `${groupId}-${ordinal}`,
    word,
    pos: inferPartOfSpeech(word),
    coreMeaning: null,
    phonetic: null,
    extendedMeanings: [],
    collocations: [],
    confusingWords: [],
    topicTags: [categoryId, "integrated-index"],
    examPriority: generatedPriorityByCategory[categoryId] ?? "medium",
    exampleSentence: null,
    categoryId,
    groupId,
    groupTitle,
    detailLevel: "index",
    searchTokens: buildSearchTokens({
      word,
      extendedMeanings: [],
      collocations: [],
      confusingWords: [],
      topicTags: [categoryId, "integrated-index"],
      examPriority: generatedPriorityByCategory[categoryId] ?? "medium",
    }),
  };
}

const generatedEntries: English3500Word[] = [];
let candidateCursor = 0;

for (const category of categories) {
  const seededCount = seededCountByCategory.get(category.id) ?? 0;
  const remaining = category.targetWordCount - seededCount;

  for (let index = 0; index < remaining; index += 1) {
    while (
      candidateCursor < integratedWordList.length &&
      curatedWordSet.has(normalizeWord(integratedWordList[candidateCursor]))
    ) {
      candidateCursor += 1;
    }

    const word = integratedWordList[candidateCursor];

    if (!word) {
      break;
    }

    const categoryOrdinal = Math.floor(index / 120) + 1;

    generatedEntries.push(
      createGeneratedWord(word, category.id, index + 1, categoryOrdinal),
    );

    candidateCursor += 1;
  }
}

const allWords = [...curatedEntries, ...generatedEntries];

export const english3500WordBank = {
  totalWords: 3500,
  categories,
  groups,
  stages,
  allWords,
} as const;

export function getEnglish3500Category(categoryId: string) {
  return english3500WordBank.categories.find((category) => category.id === categoryId) ?? null;
}

export function getEnglish3500GroupsByCategory(categoryId: string) {
  return english3500WordBank.groups.filter((group) => group.categoryId === categoryId);
}

export function getEnglish3500AllWords() {
  return [...english3500WordBank.allWords];
}

export function getEnglish3500WordByTerm(term: string) {
  const normalized = normalizeWord(term);

  return english3500WordBank.allWords.find((wordEntry) => normalizeWord(wordEntry.word) === normalized) ?? null;
}

export function searchEnglish3500Words(keyword: string) {
  const normalized = normalizeWord(keyword);

  if (!normalized) {
    return getEnglish3500AllWords();
  }

  return english3500WordBank.allWords.filter((wordEntry) =>
    wordEntry.searchTokens?.some((token) => token.includes(normalized)),
  );
}
