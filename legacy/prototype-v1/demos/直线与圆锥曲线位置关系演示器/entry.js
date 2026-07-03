import { mountDemo } from "../../assets/engine/demo-shell.mjs";
import { config } from "./config.js";
import { plugin } from "./plugin.js";

mountDemo(document.querySelector("[data-demo-root]"), config, plugin);
