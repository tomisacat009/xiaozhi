"use client";

import { startTransition, useDeferredValue, useEffect, useState } from "react";

import type {
  English3500Category,
  English3500Stage,
  English3500Word,
} from "@/content/english-3500-word-bank";

const PAGE_SIZE = 60;
const STORAGE_KEY = "xiaozhi:english-3500-word-bank-state";

function persistWordBankState(
  studyDay: "day-1" | "day-2" | "day-3" | "day-7",
  difficultWordIds: string[],
  masteredWordIds: string[],
  todayQueueWordIds: string[],
  completedTodayWordIds: string[],
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      studyDay,
      difficultWordIds,
      masteredWordIds,
      todayQueueWordIds,
      completedTodayWordIds,
    }),
  );
}

function matchesFilter(
  wordEntry: English3500Word,
  keyword: string,
  categoryId: string,
  pos: string,
  priority: string,
  detailLevel: string,
) {
  if (
    keyword &&
    !wordEntry.searchTokens?.some((token) => token.includes(keyword))
  ) {
    return false;
  }

  if (categoryId !== "all" && wordEntry.categoryId !== categoryId) {
    return false;
  }

  if (pos !== "all" && wordEntry.pos !== pos) {
    return false;
  }

  if (priority !== "all" && wordEntry.examPriority !== priority) {
    return false;
  }

  if (detailLevel !== "all" && wordEntry.detailLevel !== detailLevel) {
    return false;
  }

  return true;
}

export function EnglishWordBankExplorer({
  categories,
  stages,
  words,
}: {
  categories: English3500Category[];
  stages: English3500Stage[];
  words: English3500Word[];
}) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [pos, setPos] = useState("all");
  const [priority, setPriority] = useState("all");
  const [detailLevel, setDetailLevel] = useState("all");
  const [focusFilter, setFocusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [recallMode, setRecallMode] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [studyDay, setStudyDay] = useState<"day-1" | "day-2" | "day-3" | "day-7">("day-1");
  const [difficultWordIds, setDifficultWordIds] = useState<string[]>([]);
  const [masteredWordIds, setMasteredWordIds] = useState<string[]>([]);
  const [todayQueueWordIds, setTodayQueueWordIds] = useState<string[]>([]);
  const [completedTodayWordIds, setCompletedTodayWordIds] = useState<string[]>([]);
  const [drillMode, setDrillMode] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(words[0]?.id ?? null);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const positionOptions = [
    "all",
    ...new Set(words.map((wordEntry) => wordEntry.pos).filter((value): value is string => Boolean(value))),
  ];
  const stageById = new Map(stages.map((stage) => [stage.id, stage]));
  const stageGroupMap = new Map(stages.map((stage) => [stage.id, new Set(stage.focusGroupIds)]));

  const filteredWords = words.filter((wordEntry) => {
    if (
      !matchesFilter(
        wordEntry,
        deferredSearch,
        categoryId,
        pos,
        priority,
        detailLevel,
      )
    ) {
      return false;
    }

    if (focusFilter === "high-frequency" && wordEntry.examPriority !== "high") {
      return false;
    }

    if (focusFilter === "confusing" && wordEntry.confusingWords.length === 0) {
      return false;
    }

    if (focusFilter === "polysemy" && wordEntry.extendedMeanings.length === 0) {
      return false;
    }

    if (focusFilter === "chunks" && !wordEntry.word.includes(" ")) {
      return false;
    }

    if (
      stageFilter !== "all" &&
      wordEntry.groupId &&
      !stageGroupMap.get(stageFilter)?.has(wordEntry.groupId)
    ) {
      return false;
    }

    return true;
  });

  const visibleWords = filteredWords.slice(0, visibleCount);
  const selectedWord =
    filteredWords.find((wordEntry) => wordEntry.id === selectedWordId) ??
    filteredWords[0] ??
    null;
  const categoryCoverage = categories.map((category) => {
    const count = words.filter((wordEntry) => wordEntry.categoryId === category.id).length;
    return {
      ...category,
      count,
      percent: Math.round((count / words.length) * 100),
    };
  });
  const activeStage = stageFilter === "all" ? null : stageById.get(stageFilter) ?? null;
  const recommendedStudyPack = filteredWords
    .filter((wordEntry) => wordEntry.detailLevel === "full")
    .sort((left, right) => {
      if (left.examPriority === right.examPriority) {
        return left.word.localeCompare(right.word);
      }

      return left.examPriority === "high" ? -1 : 1;
    })
    .slice(0, 6);
  const studyDayPlans = [
    {
      id: "day-1" as const,
      title: "第 1 天：新词入门",
      summary: "先背今天的新词包，重点抓核心义、固定搭配和场景例句。",
    },
    {
      id: "day-2" as const,
      title: "第 2 天：回看昨天",
      summary: "先回忆昨天背过的词，再补充今天真正没想起来的空缺。",
    },
    {
      id: "day-3" as const,
      title: "第 3 天：易混纠错",
      summary: "把近义词、多义词和总混淆的词拉出来做对照巩固。",
    },
    {
      id: "day-7" as const,
      title: "第 7 天：整包回收",
      summary: "一周后重新串联主题和阶段，让单词从点状记忆变成网络记忆。",
    },
  ];
  const activeStudyDay = studyDayPlans.find((entry) => entry.id === studyDay) ?? studyDayPlans[0];
  const difficultWords = words.filter((wordEntry) => wordEntry.id && difficultWordIds.includes(wordEntry.id));
  const queuedWords = words.filter((wordEntry) => wordEntry.id && todayQueueWordIds.includes(wordEntry.id));
  const completedTodayWords = words.filter(
    (wordEntry) => wordEntry.id && completedTodayWordIds.includes(wordEntry.id),
  );
  const pendingQueueWords = queuedWords.filter(
    (wordEntry) => !completedTodayWordIds.includes(wordEntry.id ?? ""),
  );
  const drillWord = difficultWords[0] ?? null;
  const masteryPercent = recommendedStudyPack.length
    ? Math.round((masteredWordIds.filter((id) => recommendedStudyPack.some((wordEntry) => wordEntry.id === id)).length / recommendedStudyPack.length) * 100)
    : 0;
  const memoryHints = selectedWord
    ? [
        selectedWord.detailLevel === "full"
          ? "这是重点详解词，建议把核心义、搭配和例句一起记。"
          : "这是整合索引词，先借助分类和课文场景建立第一层熟悉感。",
        selectedWord.extendedMeanings.length > 0
          ? "它有多义分支，记的时候先抓核心义，再看语境偏转。"
          : "如果当前只有主义项，先保证课文里见到时能快速认出。",
        selectedWord.confusingWords.length > 0
          ? "它和其他词容易混，最好和易混词放进一组做对比记忆。"
          : "如果没有明显易混词，优先和同主题或同搭配词一起回收。",
      ]
    : [];
  const memoryAnchors = selectedWord
    ? [
        {
          title: "核心义",
          content: recallMode
            ? "先回忆：这个词的核心义是什么？"
            : selectedWord.coreMeaning ?? "先回到课文或例句里建立第一层词义印象。",
        },
        {
          title: "搭配抓手",
          content:
            selectedWord.collocations[0] ??
            "当前词条先和同主题词一起记，再逐步补常见搭配。",
        },
        {
          title: "易混对照",
          content:
            selectedWord.confusingWords.join(" / ") ||
            "没有明显易混词时，优先和同场景词一起回收。",
        },
        {
          title: "场景挂钩",
          content:
            selectedWord.exampleSentence ??
            "先把这个词挂回课文、周测或阅读场景里，再做第二轮巩固。",
        },
      ]
    : [];
  const reviewRhythm = [
    "今天先记 6 到 8 个词，先抓核心义，再看搭配和例句。",
    "明天优先回看今天背过的词，不要急着一口气开太多新词。",
    "第三天把易混词和多义词拿出来做对比，避免“认识但总选错”。",
    "周末按主题或阶段重新串一次，让词从单点记忆变成网络记忆。",
  ];
  const isFocusActive = (value: string) => focusFilter === value;
  const isStageActive = (value: string) => stageFilter === value;
  const isStudyDayActive = (value: string) => studyDay === value;
  const isDifficultWord = selectedWord?.id ? difficultWordIds.includes(selectedWord.id) : false;
  const isMasteredWord = selectedWord?.id ? masteredWordIds.includes(selectedWord.id) : false;
  const isQueuedWord = selectedWord?.id ? todayQueueWordIds.includes(selectedWord.id) : false;
  const isCompletedTodayWord = selectedWord?.id ? completedTodayWordIds.includes(selectedWord.id) : false;
  const selectedWordSummary = selectedWord
    ? recallMode
      ? "先遮住核心义做回忆，再用搭配、例句和易混词校正记忆。"
      : (selectedWord.coreMeaning ??
        "该词已纳入 3500 词正式索引，当前以分类、检索和分组记忆为主，适合先回到课文和真题语境里建立第一层印象。")
    : "当前筛选结果为空，换一个关键词或筛选组合再试试。";
  const studyPackTitle = activeStage ? `${activeStage.title}今日背诵包` : "今日背诵包";
  const quizPrompt = quizMode
    ? "看到中文先说英文，再补出搭配或例句。"
    : "先看英文回忆中文义，再顺着搭配和例句往下展开。";

  useEffect(() => {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    let nextStudyDay: "day-1" | "day-2" | "day-3" | "day-7" | null = null;
    let nextDifficultWordIds: string[] | null = null;
    let nextMasteredWordIds: string[] | null = null;
    let nextTodayQueueWordIds: string[] | null = null;
    let nextCompletedTodayWordIds: string[] | null = null;

    if (rawState) {
      try {
        const parsedState = JSON.parse(rawState) as {
          studyDay?: "day-1" | "day-2" | "day-3" | "day-7";
          difficultWordIds?: string[];
          masteredWordIds?: string[];
          todayQueueWordIds?: string[];
          completedTodayWordIds?: string[];
        };

        if (parsedState.studyDay) {
          nextStudyDay = parsedState.studyDay;
        }

        if (Array.isArray(parsedState.difficultWordIds)) {
          nextDifficultWordIds = parsedState.difficultWordIds;
        }

        if (Array.isArray(parsedState.masteredWordIds)) {
          nextMasteredWordIds = parsedState.masteredWordIds;
        }

        if (Array.isArray(parsedState.todayQueueWordIds)) {
          nextTodayQueueWordIds = parsedState.todayQueueWordIds;
        }

        if (Array.isArray(parsedState.completedTodayWordIds)) {
          nextCompletedTodayWordIds = parsedState.completedTodayWordIds;
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    const frameId = window.requestAnimationFrame(() => {
      if (nextStudyDay) {
        setStudyDay(nextStudyDay);
      }

      if (nextDifficultWordIds) {
        setDifficultWordIds(nextDifficultWordIds);
      }

      if (nextMasteredWordIds) {
        setMasteredWordIds(nextMasteredWordIds);
      }

      if (nextTodayQueueWordIds) {
        setTodayQueueWordIds(nextTodayQueueWordIds);
      }

      if (nextCompletedTodayWordIds) {
        setCompletedTodayWordIds(nextCompletedTodayWordIds);
      }

      setHasHydrated(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        studyDay,
        difficultWordIds,
        masteredWordIds,
        todayQueueWordIds,
        completedTodayWordIds,
      }),
    );
  }, [
    completedTodayWordIds,
    difficultWordIds,
    hasHydrated,
    masteredWordIds,
    studyDay,
    todayQueueWordIds,
  ]);

  return (
    <section className="wordBankExplorer" aria-labelledby="english-word-bank-title">
      <div className="contentCard wordBankExplorer__toolbar">
        <div className="contentCard__meta">
          <span>全量词库</span>
          <span>搜索 / 分类 / 词卡浏览</span>
        </div>
        <div>
          <h2 id="english-word-bank-title">3500 词全量词库浏览器</h2>
          <p className="contentSection__summary">
            这一页把高中常见 3500 词按产品词库方式整理成可搜索、可分类、可筛选的正式入口。
          </p>
        </div>
        <div className="wordBankExplorer__searchRow">
          <label className="wordBankExplorer__field">
            <span>搜索单词</span>
            <input
              type="search"
              role="searchbox"
              aria-label="搜索单词"
              placeholder="输入单词、搭配、主题词或中文记忆线索"
              value={search}
              onChange={(event) =>
                startTransition(() => {
                  setSearch(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                })
              }
            />
          </label>
        </div>
        <div className="wordBankExplorer__filters">
          <label className="wordBankExplorer__field">
            <span>分类</span>
            <select
              value={categoryId}
              onChange={(event) => {
                setCategoryId(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              <option value="all">全部分类</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          <label className="wordBankExplorer__field">
            <span>词性</span>
            <select
              value={pos}
              onChange={(event) => {
                setPos(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              {positionOptions.map((entry) => (
                <option key={entry} value={entry}>
                  {entry === "all" ? "全部词性" : entry}
                </option>
              ))}
            </select>
          </label>
          <label className="wordBankExplorer__field">
            <span>考试优先级</span>
            <select
              value={priority}
              onChange={(event) => {
                setPriority(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              <option value="all">全部优先级</option>
              <option value="high">高频优先</option>
              <option value="medium">中频扩展</option>
              <option value="low">补充词</option>
            </select>
          </label>
          <label className="wordBankExplorer__field">
            <span>词条密度</span>
            <select
              value={detailLevel}
              onChange={(event) => {
                setDetailLevel(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              <option value="all">全部词条</option>
              <option value="full">重点详解</option>
              <option value="index">索引词条</option>
            </select>
          </label>
        </div>
        <div className="wordBankExplorer__focusFilters">
          <button type="button" aria-pressed={isFocusActive("all")} onClick={() => setFocusFilter("all")}>
            看全部词条
          </button>
          <button
            type="button"
            aria-pressed={isFocusActive("high-frequency")}
            onClick={() => setFocusFilter("high-frequency")}
          >
            只看高频重点
          </button>
          <button type="button" aria-pressed={isFocusActive("confusing")} onClick={() => setFocusFilter("confusing")}>
            只看易混词
          </button>
          <button type="button" aria-pressed={isFocusActive("polysemy")} onClick={() => setFocusFilter("polysemy")}>
            只看多义词
          </button>
          <button type="button" aria-pressed={isFocusActive("chunks")} onClick={() => setFocusFilter("chunks")}>
            只看词块表达
          </button>
        </div>
        <div className="wordBankExplorer__stageFilters">
          <button type="button" aria-pressed={isStageActive("all")} onClick={() => setStageFilter("all")}>
            看整学期路线
          </button>
          {stages.map((stage) => (
            <button
              key={stage.id}
              type="button"
              aria-pressed={isStageActive(stage.id)}
              onClick={() => setStageFilter(stage.id)}
            >
              按{stage.title}筛选
            </button>
          ))}
        </div>
        <ul className="contentCard__chips">
          <li>3500 词已整理入库</li>
          <li>{filteredWords.length} 条当前结果</li>
          <li>{words.filter((wordEntry) => wordEntry.detailLevel === "full").length} 条重点详解词</li>
        </ul>
        <div className="wordBankExplorer__progressStats">
          <article className="wordBankExplorer__progressCard">
            <strong>当前进度</strong>
            <span>已掌握 {masteredWordIds.length} 词</span>
          </article>
          <article className="wordBankExplorer__progressCard">
            <strong>错词回收</strong>
            <span>错词 {difficultWordIds.length} 词</span>
          </article>
          <article className="wordBankExplorer__progressCard">
            <strong>今日完成度</strong>
            <span>{masteryPercent}%</span>
          </article>
        </div>
        <div className="wordBankExplorer__coveragePanel">
          <h3>覆盖分布</h3>
          <div className="wordBankExplorer__coverageList">
            {categoryCoverage.map((category) => (
              <article key={category.id} className="wordBankExplorer__coverageCard">
                <strong>{category.title}</strong>
                <p>{category.summary}</p>
                <span>
                  {category.count} 词 · 约 {category.percent}%
                </span>
              </article>
            ))}
          </div>
        </div>
        <div className="wordBankExplorer__stagePanel">
          <h3>推荐背诵顺序</h3>
          <div className="wordBankExplorer__stageList">
            {stages.map((stage) => (
              <article key={stage.id} className="wordBankExplorer__stageCard">
                <strong>{stage.title}</strong>
                <p>{stage.summary}</p>
                <span>{stage.targetWordCount} 词建议量</span>
              </article>
            ))}
          </div>
          {activeStage ? (
            <p className="contentSection__summary">
              当前已切到 {activeStage.title}：{activeStage.summary}
            </p>
          ) : null}
        </div>
        <div className="wordBankExplorer__memoryWorkbench">
          <div className="wordBankExplorer__memoryBoard">
            <div className="wordBankExplorer__dayPlanner">
              {studyDayPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  aria-pressed={isStudyDayActive(plan.id)}
                  onClick={() => {
                    setStudyDay(plan.id);
                    persistWordBankState(
                      plan.id,
                      difficultWordIds,
                      masteredWordIds,
                      todayQueueWordIds,
                      completedTodayWordIds,
                    );
                  }}
                >
                  {plan.title}
                </button>
              ))}
            </div>
            <div className="wordBankExplorer__daySummary">
              <h3>{activeStudyDay.id === "day-1" ? "今日背诵入口" : `${activeStudyDay.title.replace("：", "复习入口：")}`}</h3>
              <p className="contentSection__summary">{activeStudyDay.summary}</p>
            </div>
            <div className="wordBankExplorer__queueSummary">
              <article className="wordBankExplorer__queueCard">
                <strong>待处理</strong>
                <span>{pendingQueueWords.length} 词</span>
                <p>今天准备背的词先集中在这里，避免一上来把词散掉。</p>
              </article>
              <article className="wordBankExplorer__queueCard">
                <strong>今日完成</strong>
                <span>{completedTodayWords.length} 词</span>
                <p>今天已经过完一轮的词先沉淀在这里，帮助形成完成感。</p>
              </article>
              <article className="wordBankExplorer__queueCard">
                <strong>需要回收</strong>
                <span>{difficultWords.length} 词</span>
                <p>记不住或易混的词继续沉到回收区，后面专门做纠错。</p>
              </article>
            </div>
            <div className="wordBankExplorer__memoryHead">
              <div>
                <h3>{studyPackTitle}</h3>
                <p className="contentSection__summary">
                  {activeStage
                    ? "先围绕当前阶段做小包背诵，减少词量焦虑，更容易形成连续复习节奏。"
                    : "从当前筛选结果里先抽一小包重点词，优先形成每天都能完成的背诵闭环。"}
                </p>
                <p className="contentSection__summary">{quizPrompt}</p>
              </div>
              <div className="wordBankExplorer__modeActions">
                <button
                  type="button"
                  className="wordBankExplorer__modeButton"
                  aria-pressed={quizMode}
                  onClick={() => setQuizMode((current) => !current)}
                >
                  {quizMode ? "返回背词模式" : "切换到自测模式"}
                </button>
                <button
                  type="button"
                  className="wordBankExplorer__modeButton"
                  aria-pressed={recallMode}
                  onClick={() => setRecallMode((current) => !current)}
                >
                  {recallMode ? "显示答案" : "进入回忆模式"}
                </button>
              </div>
            </div>
            <div className="wordBankExplorer__studyPack">
              {recommendedStudyPack.map((wordEntry, index) => (
                <button
                  key={wordEntry.id}
                  type="button"
                  className={`wordBankExplorer__studyCard${selectedWord?.id === wordEntry.id ? " is-active" : ""}`}
                  onClick={() => setSelectedWordId(wordEntry.id ?? null)}
                >
                  <span>第 {index + 1} 个</span>
                  <strong>{quizMode ? wordEntry.coreMeaning ?? wordEntry.word : wordEntry.word}</strong>
                  <p>
                    {recallMode
                      ? "先回忆词义与搭配，再点进详情核对。"
                      : quizMode
                        ? `尝试说出 ${wordEntry.word}`
                        : (wordEntry.coreMeaning ?? "先按分组和场景建立印象。")}
                  </p>
                </button>
              ))}
            </div>
            <div className="wordBankExplorer__queueColumns">
              <article className="wordBankExplorer__queueColumn">
                <div className="wordBankExplorer__queueColumnHead">
                  <h3>待处理</h3>
                  <span>{pendingQueueWords.length} 词</span>
                </div>
                {pendingQueueWords.length > 0 ? (
                  <div className="wordBankExplorer__queueList">
                    {pendingQueueWords.map((wordEntry) => (
                      <button
                        key={wordEntry.id}
                        type="button"
                        className="wordBankExplorer__queueItem"
                        onClick={() => setSelectedWordId(wordEntry.id ?? null)}
                      >
                        <strong>{wordEntry.word}</strong>
                        <span>{wordEntry.coreMeaning ?? "先回到课文和例句场景建立第一层印象。"}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="contentSection__summary">今天待处理的词，可以从右侧详情区直接加入。</p>
                )}
              </article>
              <article className="wordBankExplorer__queueColumn">
                <div className="wordBankExplorer__queueColumnHead">
                  <h3>今日完成</h3>
                  <span>{completedTodayWords.length} 词</span>
                </div>
                {completedTodayWords.length > 0 ? (
                  <div className="wordBankExplorer__queueList">
                    {completedTodayWords.map((wordEntry) => (
                      <button
                        key={wordEntry.id}
                        type="button"
                        className="wordBankExplorer__queueItem"
                        onClick={() => setSelectedWordId(wordEntry.id ?? null)}
                      >
                        <strong>{wordEntry.word}</strong>
                        <span>{wordEntry.coreMeaning ?? "今天已经完成一轮回忆，晚些再做二次确认。"}</span>
                        <div className="wordBankExplorer__queueReview">
                          <p>
                            <strong>回想例句：</strong>
                            {wordEntry.exampleSentence ?? "先回想这个词在课文或阅读里是怎么出现的。"}
                          </p>
                          <p>
                            <strong>易混对照：</strong>
                            {wordEntry.confusingWords.join(" / ") || "没有明显易混词时，优先回想它的核心搭配。"}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="contentSection__summary">完成一轮回忆后的词会移动到这里，帮助孩子看到进展。</p>
                )}
              </article>
            </div>
          </div>
          <div className="wordBankExplorer__memoryBoard">
            <h3>复习节奏建议</h3>
            <ul className="wordBankExplorer__rhythmList">
              {reviewRhythm.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="wordBankExplorer__memoryBoard">
            <div className="wordBankExplorer__memoryHead">
              <h3>错词回收</h3>
              <button
                type="button"
                className="wordBankExplorer__modeButton"
                aria-pressed={drillMode}
                onClick={() => setDrillMode((current) => !current)}
              >
                {drillMode ? "返回错词列表" : "开始错词快测"}
              </button>
            </div>
            {drillMode && drillWord ? (
              <div className="wordBankExplorer__drillCard">
                <strong>错词快测</strong>
                <p>请先说出这个词的英文</p>
                <h4>{drillWord.coreMeaning ?? "先根据场景回忆这个词"}</h4>
                <span>{drillWord.groupTitle ?? "错词回收组"}</span>
              </div>
            ) : null}
            {difficultWords.length > 0 ? (
              <div className="wordBankExplorer__recoveryList">
                {difficultWords.map((wordEntry) => (
                  <button
                    key={wordEntry.id}
                    type="button"
                    className="wordBankExplorer__recoveryItem"
                    onClick={() => setSelectedWordId(wordEntry.id ?? null)}
                  >
                    <strong>{wordEntry.word}</strong>
                    <span>{wordEntry.coreMeaning ?? "先回到课文场景里复习这个词。"}</span>
                    <div className="wordBankExplorer__queueReview">
                      <p>
                        <strong>搭配提醒：</strong>
                        {wordEntry.collocations[0] ?? "先回到同主题词或课文场景里找它最常见的搭配。"}
                      </p>
                      <p>
                        <strong>回想例句：</strong>
                        {wordEntry.exampleSentence ?? "先回想这个词在阅读、周测或课文里出现的句子。"}
                      </p>
                      <p>
                        <strong>易混对照：</strong>
                        {wordEntry.confusingWords.join(" / ") || "没有明显易混词时，优先回想它最容易搭错的表达。"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="contentSection__summary">
                先把总记不住、总混淆或总写错的词加入这里，后面专门做二次回收。
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="wordBankExplorer__layout">
        <section className="contentCard wordBankExplorer__results" aria-labelledby="english-word-bank-results">
          <div className="contentCard__meta">
            <span>结果列表</span>
            <span>先按词形查，再进详情卡片</span>
          </div>
          <div>
            <h2 id="english-word-bank-results">筛选结果</h2>
            <p className="contentSection__summary">
              默认按整理顺序展示。高频重点词会带更完整的例句、搭配和易混提示。
            </p>
          </div>
          <div className="wordBankExplorer__resultList">
            {visibleWords.map((wordEntry) => (
              <button
                key={wordEntry.id}
                type="button"
                className={`wordBankExplorer__resultItem${selectedWord?.id === wordEntry.id ? " is-active" : ""}`}
                onClick={() => setSelectedWordId(wordEntry.id ?? null)}
              >
                <div className="wordBankExplorer__resultHead">
                  <strong>{wordEntry.word}</strong>
                  <span>{wordEntry.detailLevel === "full" ? "重点详解" : "词表索引"}</span>
                </div>
                <div className="wordBankExplorer__resultMeta">
                  <span>{wordEntry.pos ?? "词类待细分"}</span>
                  <span>{wordEntry.groupTitle ?? "整合分组"}</span>
                </div>
                {wordEntry.coreMeaning ? (
                  <p>{recallMode ? "回忆模式中：先想词义，再点进详情核对。" : wordEntry.coreMeaning}</p>
                ) : null}
              </button>
            ))}
          </div>
          {visibleCount < filteredWords.length ? (
            <button
              type="button"
              className="wordBankExplorer__loadMore"
              onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
            >
              继续加载更多词条
            </button>
          ) : null}
        </section>

        <section className="contentCard wordBankExplorer__detail" aria-labelledby="english-word-bank-detail">
          <div className="contentCard__meta">
            <span>词条详情</span>
            <span>桌面端固定观察，手机端顺序展开</span>
          </div>
          <div>
            <h2 id="english-word-bank-detail">{selectedWord?.word ?? "词条详情"}</h2>
            <p className="contentSection__summary">{selectedWordSummary}</p>
          </div>
          {selectedWord ? (
            <>
              <ul className="contentCard__chips">
                <li>{selectedWord.groupTitle ?? "整合索引组"}</li>
                <li>{selectedWord.pos ?? "词类待细分"}</li>
                <li>{selectedWord.examPriority === "high" ? "高频优先" : selectedWord.examPriority === "medium" ? "中频扩展" : "补充词"}</li>
              </ul>
              {selectedWord.phonetic ? (
                <div className="wordBankExplorer__detailBlock">
                  <h3>音标</h3>
                  <p>{selectedWord.phonetic}</p>
                </div>
              ) : null}
              {selectedWord.collocations.length > 0 ? (
                <div className="wordBankExplorer__detailBlock">
                  <h3>常见搭配</h3>
                  <ul className="contentCard__chips">
                    {selectedWord.collocations.map((collocation) => (
                      <li key={collocation}>{collocation}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {selectedWord.confusingWords.length > 0 ? (
                <div className="wordBankExplorer__detailBlock">
                  <h3>易混词</h3>
                  <ul className="contentCard__chips">
                    {selectedWord.confusingWords.map((word) => (
                      <li key={word}>{word}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {selectedWord.topicTags.length > 0 ? (
                <div className="wordBankExplorer__detailBlock">
                  <h3>主题标签</h3>
                  <ul className="contentCard__chips">
                    {selectedWord.topicTags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {selectedWord.exampleSentence ? (
                <div className="wordBankExplorer__detailBlock">
                  <h3>例句</h3>
                  <p>{selectedWord.exampleSentence}</p>
                </div>
              ) : null}
              <div className="wordBankExplorer__detailBlock">
                <h3>记忆提醒</h3>
                <ul className="contentCard__chips">
                  {memoryHints.map((hint) => (
                    <li key={hint}>{hint}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="wordBankExplorer__recoveryButton"
                  aria-pressed={isMasteredWord}
                  onClick={() => {
                    if (!selectedWord?.id) {
                      return;
                    }

                    setMasteredWordIds((current) => {
                      const nextMasteredWordIds = current.includes(selectedWord.id!)
                        ? current.filter((wordId) => wordId !== selectedWord.id)
                        : [...current, selectedWord.id!];

                      persistWordBankState(
                        studyDay,
                        difficultWordIds,
                        nextMasteredWordIds,
                        todayQueueWordIds,
                        completedTodayWordIds,
                      );

                      return nextMasteredWordIds;
                    });
                  }}
                >
                  {isMasteredWord ? "已掌握" : "标记为已掌握"}
                </button>
                <button
                  type="button"
                  className="wordBankExplorer__recoveryButton"
                  aria-pressed={isQueuedWord}
                  onClick={() => {
                    if (!selectedWord?.id) {
                      return;
                    }

                    setTodayQueueWordIds((current) => {
                      const isCurrentQueued = current.includes(selectedWord.id!);
                      const nextTodayQueueWordIds = isCurrentQueued
                        ? current.filter((wordId) => wordId !== selectedWord.id)
                        : [...current, selectedWord.id!];
                      const nextCompletedTodayWordIds = isCurrentQueued
                        ? completedTodayWordIds.filter((wordId) => wordId !== selectedWord.id)
                        : completedTodayWordIds;

                      if (isCurrentQueued) {
                        setCompletedTodayWordIds(nextCompletedTodayWordIds);
                      }

                      persistWordBankState(
                        studyDay,
                        difficultWordIds,
                        masteredWordIds,
                        nextTodayQueueWordIds,
                        nextCompletedTodayWordIds,
                      );

                      return nextTodayQueueWordIds;
                    });
                  }}
                >
                  {isQueuedWord ? "已加入今日任务" : "加入今日任务"}
                </button>
                <button
                  type="button"
                  className="wordBankExplorer__recoveryButton"
                  aria-pressed={isCompletedTodayWord}
                  onClick={() => {
                    if (!selectedWord?.id) {
                      return;
                    }

                    const nextTodayQueueWordIds = todayQueueWordIds.includes(selectedWord.id)
                      ? todayQueueWordIds
                      : [...todayQueueWordIds, selectedWord.id];

                    if (!todayQueueWordIds.includes(selectedWord.id)) {
                      setTodayQueueWordIds(nextTodayQueueWordIds);
                    }

                    setCompletedTodayWordIds((current) => {
                      const nextCompletedTodayWordIds = current.includes(selectedWord.id!)
                        ? current.filter((wordId) => wordId !== selectedWord.id)
                        : [...current, selectedWord.id!];

                      persistWordBankState(
                        studyDay,
                        difficultWordIds,
                        masteredWordIds,
                        nextTodayQueueWordIds,
                        nextCompletedTodayWordIds,
                      );

                      return nextCompletedTodayWordIds;
                    });
                  }}
                >
                  今天已完成
                </button>
                <button
                  type="button"
                  className="wordBankExplorer__recoveryButton"
                  aria-pressed={isDifficultWord}
                  onClick={() => {
                    if (!selectedWord?.id) {
                      return;
                    }

                    setDifficultWordIds((current) => {
                      const nextDifficultWordIds = current.includes(selectedWord.id!)
                        ? current.filter((wordId) => wordId !== selectedWord.id)
                        : [...current, selectedWord.id!];

                      persistWordBankState(
                        studyDay,
                        nextDifficultWordIds,
                        masteredWordIds,
                        todayQueueWordIds,
                        completedTodayWordIds,
                      );

                      return nextDifficultWordIds;
                    });
                  }}
                >
                  {isDifficultWord ? "已加入错词回收" : "加入错词回收"}
                </button>
              </div>
              <div className="wordBankExplorer__detailBlock">
                <h3>记忆抓手</h3>
                <div className="wordBankExplorer__anchorGrid">
                  {memoryAnchors.map((anchor) => (
                    <article key={anchor.title} className="wordBankExplorer__anchorCard">
                      <strong>{anchor.title}</strong>
                      <p>{anchor.content}</p>
                    </article>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="contentSection__summary">当前筛选结果为空，换一个关键词或筛选组合再试试。</p>
          )}
        </section>
      </div>
    </section>
  );
}
