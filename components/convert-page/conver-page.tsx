import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import "react-medium-image-zoom/dist/styles.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ZoomImage from "../zoom-image/zoom-image";
const ConvertPage = async ({
  content,
}: Readonly<{
  content: string;
}>) => {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node instanceof Element && node.attribs) {
        if (node.name === "img") {
          const { src, width, height, alt } = node.attribs;
          return (
            <ZoomImage
              layout="responsive"
              src={src}
              width={parseInt(width)}
              height={parseInt(height)}
              alt={alt}
              sizes="(min-width: 768px) 1920px, 100vw"
            />
          );
        }

        if (node.name == "code") {
          const className = node.attribs.class;
          const codeText = domToReact(node.children as DOMNode[]);
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter PreTag="div" language={match[1]} style={oneDark}>
              {String(codeText).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className}>{String(codeText)}</code>
          );
        }

        if (node.name == "p") {
          const childNode = node.childNodes[0];
          if (childNode && childNode instanceof Element && childNode.attribs) {
            if (
              childNode.name == "span" &&
              childNode.attribs?.class == "equation"
            ) {
              const latexText = domToReact(childNode.children as DOMNode[]);
              return <BlockMath>{String(latexText)}</BlockMath>;
            }
          }
        }
      }
    },
  };
  const contentReact = parse(content, options);
  return <>{contentReact}</>;
};

export default ConvertPage;
