"use client";

import { useEffect, useRef, useState } from "react";

import { DemoControls } from "@/components/demo/demo-controls";
import { DemoExplanation } from "@/components/demo/demo-explanation";
import { DemoStage } from "@/components/demo/demo-stage";
import { createDemoStore } from "@/engine/core/store";
import type { DemoDefinition, DemoParams, DemoStore } from "@/engine/core/types";

function cloneState<TParams extends DemoParams>(store: DemoStore<TParams>) {
  const state = store.getState();

  return {
    params: { ...state.params },
  };
}

export function DemoShell<TParams extends DemoParams>({
  definition,
}: {
  definition: DemoDefinition<TParams>;
}) {
  const storeRef = useRef<DemoStore<TParams>>(createDemoStore(definition));
  const definitionIdRef = useRef(definition.id);
  const [state, setState] = useState(() => ({
    params: { ...definition.defaultParams },
  }));

  useEffect(() => {
    if (definitionIdRef.current === definition.id) {
      return;
    }

    definitionIdRef.current = definition.id;
    storeRef.current = createDemoStore(definition);
    setState(cloneState(storeRef.current));
  }, [definition.id, definition]);

  function syncState() {
    setState(cloneState(storeRef.current));
  }

  function handleParamChange<K extends keyof TParams>(key: K, value: TParams[K]) {
    storeRef.current.setParam(key, value);
    syncState();
  }

  function handlePresetSelect(presetId: string) {
    storeRef.current.applyPreset(presetId);
    syncState();
  }

  function handleReset() {
    storeRef.current.reset();
    syncState();
  }

  const explanation = definition.explanation(state.params);
  const renderedStage = definition.renderStage?.(state.params);
  const controlCount = Object.keys(definition.defaultParams).length;
  const presetCount = definition.presets.length;

  return (
    <section className="contentSection" aria-labelledby="demo-shell-title">
      <div className="contentSection__hero">
        <p className="sectionHeading__eyebrow">交互探索</p>
        <h2 id="demo-shell-title">{definition.title}</h2>
        <p className="contentSection__summary">
          {definition.description ??
            "通过参数、场景与例句切换，把抽象知识点变成可观察、可推演的结构。"}
        </p>
        <ul className="contentCard__chips">
          <li>{controlCount} 个调节参数</li>
          <li>{presetCount} 个典型场景</li>
          <li>先调参数，再看图形和解释同步变化</li>
        </ul>
      </div>

      <div className="demoGrid">
        <DemoStage title={definition.title}>
          {renderedStage ?? <pre>{JSON.stringify(state.params, null, 2)}</pre>}
        </DemoStage>
        <DemoControls
          definition={definition}
          params={state.params}
          onParamChange={handleParamChange}
          onPresetSelect={handlePresetSelect}
          onReset={handleReset}
        />
        <DemoExplanation lines={explanation} />
      </div>
    </section>
  );
}
