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
    <section className="contentCard demoPanel" aria-labelledby="demo-controls-title">
      <div className="contentCard__meta">
        <span>Controls</span>
        <button type="button" onClick={onReset}>
          重置参数
        </button>
      </div>
      <h2 id="demo-controls-title">参数面板</h2>
      <div className="demoControlsGrid">
        {entries.map(([key, value]) => {
          const inputId = `demo-control-${definition.id}-${String(key)}`;
          const label = definition.controls?.[key]?.label ?? String(key);

          return (
            <div key={String(key)} className="demoControl">
              <div className="demoControl__head">
                <label htmlFor={inputId} className="demoControl__label">
                  {label}
                </label>
                <strong className="demoControl__value" aria-hidden="true">
                  {value}
                </strong>
              </div>
              <input
                id={inputId}
                type={definition.controls?.[key] ? "range" : "number"}
                value={value}
                min={definition.controls?.[key]?.min}
                max={definition.controls?.[key]?.max}
                step={definition.controls?.[key]?.step ?? 1}
                onChange={(event) =>
                  onParamChange(key, Number(event.target.value) as TParams[typeof key])
                }
              />
            </div>
          );
        })}
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
