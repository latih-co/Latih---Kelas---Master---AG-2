/**
 * renderMD — converts lightweight inline markdown to an HTML string.
 *
 * Supported syntax:
 *   **text**  → <strong>text</strong>
 *   *text*    → <em>text</em>
 *   \n        → <br/>
 *
 * Usage in React widgets:
 *   <p dangerouslySetInnerHTML={{ __html: md(text) }} />
 */

export function md(text = "") {
  if (!text) return "";
  return (
    text
      // **bold** — must come before *italic*
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // *italic*
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // newline → <br>
      .replace(/\n/g, "<br/>")
  );
}

