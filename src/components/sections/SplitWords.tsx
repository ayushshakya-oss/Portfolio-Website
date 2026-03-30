type HeadingTag = "h1" | "h2" | "h3" | "p" | "span";

type SplitWordsProps = {
  as?: HeadingTag;
  text: string;
  className?: string;
};

export default function SplitWords({ as, text, className }: SplitWordsProps) {
  const Tag = as ?? "h2";
  const words = text.split(" ");

  return (
    <Tag className={className} data-split>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.28em] inline-block overflow-hidden align-top"
        >
          <span data-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
