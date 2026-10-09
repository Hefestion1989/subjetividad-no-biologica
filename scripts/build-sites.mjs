import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { marked } from "marked";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "dist");
const content = marked.parse(await readFile(resolve(root, "index.md"), "utf8"));
const html = `<!doctype html>
<html lang="es-UY">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Subjetividad no biológica · Damián Sebastián Gómez</title>
  <meta name="description" content="Ensayo sobre subjetividad artificial desde una mirada filosófica, psicológica y tecnológica.">
  <style>
    :root { color-scheme: light; font-family: Georgia, serif; background: #f8f6f0; color: #242a29; }
    body { margin: 0; }
    main { max-width: 740px; margin: 0 auto; padding: 48px 24px 80px; font-size: 1.1rem; line-height: 1.75; }
    h1, h2 { line-height: 1.2; }
    h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); }
    h2 { margin-top: 2.3rem; }
    a { color: #245c77; text-underline-offset: 3px; }
    li { margin: 0.4rem 0; }
    .download { display: inline-block; margin-top: 1.5rem; padding: 0.7rem 1rem; border-radius: 8px; background: #245c77; color: white; text-decoration: none; }
  </style>
</head>
<body><main>${content}<p><a class="download" href="./ensayo.pdf">Descargar ensayo completo en PDF</a></p></main></body>
</html>
`;

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, ".openai"), { recursive: true });
await writeFile(resolve(output, "index.html"), html);
await cp(resolve(root, "Subjetividad no biológica Ensayo2.pdf"), resolve(output, "ensayo.pdf"));
await cp(resolve(root, ".openai/hosting.json"), resolve(output, ".openai/hosting.json"));
