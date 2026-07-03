import type { DemoDefinition, DemoParams } from "@/engine/core/types";

export function DemoControls<TParams extends DemoParams>({
  definition,
  params,
  onParamChange,
  onPresetSelect,
  onReset,
}: {
  definition: DemoDefinition<TParams>;
  params: TParams;
  onParamChange: <K extends keyof TParams>(key: K, value: TParams[K]) => void;
  onPresetSelect: (presetId: string) => void;
  onReset: () => void;
}) {
  const entries = Object.entries(params) as Array<
    [keyof TParams, TParams[keyof TParams]]
  >;

  return (
    <section className="contentCard" aria-labelledby="demo-controls-title">
      <div className="contentCard__meta">
        <span>Controls</span>
        <button type="button" onClick={onReset}>
          重置参数
        </button>
      </div>
      <h2 id="demo-controls-title">参数面板</h2>
      <div className="contentGrid">
        {entries.map(([key, value]) => (
          <label key={String(key)} className="contentCard">
            <span>{String(key)}</span>
            <input
              type="number"
              value={value}
              onChange={(event) =>
                onParamChange(key, Number(event.target.value) as TParams[typeof key])
              }
            />
          </label>
        ))}
      </div>
      {definition.presets.length > 0 ? (
        <div className="contentCard__chips">
          {definition.presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onPresetSelect(preset.id)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
