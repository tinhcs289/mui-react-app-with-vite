import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  return {
    plugins: [react()],
    envDir: "./env",
    server: {
      port: 8888,
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
    logLevel: ["localhost", "development", "staging"].includes(env.mode)
      ? "info"
      : "silent",
    build: {
      sourcemap: ["localhost", "development"].includes(env.mode),
      rollupOptions: {
        output: {
          chunkFileNames: "[hash].js",       
          manualChunks: (id) => {
            if (id.indexOf("react") !== -1) {
              return;
            }

            if (id.includes("node_modules"))
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
          },
        },
        onLog(level, log, handler) {
          if (
            log.cause &&
            // @ts-ignore
            log.cause.message === `Can't resolve original location of error.`
          ) {
            return;
          }
          handler(level, log);
        },
      },
    },
  };
});
