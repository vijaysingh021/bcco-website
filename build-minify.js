const fs = require('fs');
const path = require('path');

function minifyCSS(css) {
  return css
    // remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // collapse whitespace
    .replace(/\s+/g, ' ')
    // remove space around symbols except where needed (like + and - in calc)
    .replace(/\s*([{};:,>~])\s*/g, '$1')
    .replace(/;\}/g, '}')
    .trim();
}

function minifyJS(js) {
  // Safe JS minification preserving strings and syntax
  return js
    // remove multi-line comments (except URLs)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // remove single-line comments that are alone on a line
    .replace(/^\s*\/\/.*$/gm, '')
    // collapse multiple empty lines
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

try {
  const cssPath = path.join(__dirname, 'css', 'style.css');
  const cssMinPath = path.join(__dirname, 'css', 'style.min.css');
  const jsPath = path.join(__dirname, 'js', 'main.js');
  const jsMinPath = path.join(__dirname, 'js', 'main.min.js');

  const rawCss = fs.readFileSync(cssPath, 'utf8');
  const minCss = minifyCSS(rawCss);
  fs.writeFileSync(cssMinPath, minCss, 'utf8');
  console.log(`CSS minified: ${rawCss.length} -> ${minCss.length} bytes`);

  const rawJs = fs.readFileSync(jsPath, 'utf8');
  const minJs = minifyJS(rawJs);
  fs.writeFileSync(jsMinPath, minJs, 'utf8');
  console.log(`JS minified: ${rawJs.length} -> ${minJs.length} bytes`);

  const aiJsPath = path.join(__dirname, 'js', 'ai-assistant.js');
  const aiJsMinPath = path.join(__dirname, 'js', 'ai-assistant.min.js');
  if (fs.existsSync(aiJsPath)) {
    const rawAiJs = fs.readFileSync(aiJsPath, 'utf8');
    const minAiJs = minifyJS(rawAiJs);
    fs.writeFileSync(aiJsMinPath, minAiJs, 'utf8');
    console.log(`AI JS minified: ${rawAiJs.length} -> ${minAiJs.length} bytes`);
  }

  const i18nJsPath = path.join(__dirname, 'js', 'i18n.js');
  const i18nJsMinPath = path.join(__dirname, 'js', 'i18n.min.js');
  if (fs.existsSync(i18nJsPath)) {
    const rawI18nJs = fs.readFileSync(i18nJsPath, 'utf8');
    const minI18nJs = minifyJS(rawI18nJs);
    fs.writeFileSync(i18nJsMinPath, minI18nJs, 'utf8');
    console.log(`i18n JS minified: ${rawI18nJs.length} -> ${minI18nJs.length} bytes`);
  }
} catch (err) {
  console.error('Minification failed:', err);
  process.exit(1);
}

