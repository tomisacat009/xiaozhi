"use client";

import { DemoShell } from "@/components/demo/demo-shell";
import { quadraticFunctionDemo } from "@/content/demos/quadratic-function";

export function QuadraticFunctionDemo() {
  return <DemoShell definition={quadraticFunctionDemo} />;
}
