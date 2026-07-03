import type { ReactNode } from "react";

type RichBlock =
  | {
      type: "heading";
      content: string;
      level: 2 | 3;
    }
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "list";
      items: string[];
    };

type InlineToken =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "code";
      content: string;
    };

function parseInlineTokens(content: string): InlineToken[] {
  const segments = content.split(/(`[^`]+`)/g).filter((segment) => segment.length > 0);

  return segments.map((segment) => {
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return {
        type: "code" as const,
        content: segment.slice(1, -1),
      };
    }

    return {
      type: "text" as const,
      content: segment,
    };
  });
}

function renderInlineContent(content: string): ReactNode[] {
  return parseInlineTokens(content).map((token, index) => {
    if (token.type === "code") {
      return <code key={`${token.content}-${index}`}>{token.content}</code>;
    }

    return <span key={`${token.content}-${index}`}>{token.content}</span>;
  });
}

function parseRichContent(source: string): RichBlock[] {
  const blocks: RichBlock[] = [];
  const lines = source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let listItems: string[] = [];

  function flushList() {
    if (listItems.length === 0) {
      return;
    }

    blocks.push({
      type: "list",
      items: listItems,
    });
    listItems = [];
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({
        type: "heading",
        level: 2,
        content: line.slice(3).trim(),
      });
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      blocks.push({
        type: "heading",
        level: 3,
        content: line.slice(4).trim(),
      });
      continue;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2).trim());
      continue;
    }

    flushList();
    blocks.push({
      type: "paragraph",
      content: line,
    });
  }

  flushList();

  return blocks;
}

export function RichContent({ source }: { source: string }) {
  const blocks = parseRichContent(source);

  return (
    <div className="richContent">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 2) {
            return <h2 key={index}>{renderInlineContent(block.content)}</h2>;
          }

          return <h3 key={index}>{renderInlineContent(block.content)}</h3>;
        }

        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{renderInlineContent(item)}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{renderInlineContent(block.content)}</p>;
      })}
    </div>
  );
}
