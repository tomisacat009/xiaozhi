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

  return (
    <section className="contentSection" aria-labelledby="demo-shell-title">
      <div className="contentSection__hero">
        <p className="sectionHeading__eyebrow">Demo Engine</p>
        <h2 id="demo-shell-title">{definition.title}</h2>
        <p className="contentSection__summary">
          {definition.description ??
            "统一 demo shell 已就绪，当前展示基础参数状态与说明区域，具体可视化渲染留给后续任务接入。"}
        </p>
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
