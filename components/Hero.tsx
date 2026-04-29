import { MaterialIcon } from "./MaterialIcon";

export function Hero() {
  return (
    <>
      <section className="mx-auto flex max-w-[720px] flex-col gap-6 text-center">
        <span className="eyebrow text-[color:var(--color-primary)] tracking-[0.2em] animate-fade-up">
          For ambitious women
        </span>
        <h1
          className="font-display text-[44px] sm:text-[64px] md:text-[72px] leading-[1.05] tracking-[-0.02em] text-[color:var(--color-primary)] animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          Your hormones aren&apos;t a bug. They&apos;re a{" "}
          <em className="font-display italic">feature.</em>
        </h1>
        <p
          className="mx-auto mt-4 max-w-[600px] font-display text-[24px] leading-[1.3] text-[color:var(--color-on-surface-variant)] animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          A cycle-aware productivity planner. Schedule deep work, meetings, and
          creative time around the four hormonal phases, so you stop fighting
          your biology.
        </p>
      </section>

      <div
        className="hairline-b w-full animate-fade-in"
        style={{ animationDelay: "300ms" }}
      />

      <section
        className="grid grid-cols-1 gap-8 md:grid-cols-3 animate-fade-up"
        style={{ animationDelay: "350ms" }}
      >
        <ValueProp
          icon="psychology"
          eyebrow="Deep work"
          title="Schedule it when your brain is wired for it"
          body="Capitalize on the estrogen peak of your follicular phase for complex problem solving."
        />
        <ValueProp
          icon="forum"
          eyebrow="Hard conversations"
          title="Time them to peak verbal cognition"
          body="Leverage ovulatory communication spikes for negotiations and critical team alignments."
        />
        <ValueProp
          icon="bed"
          eyebrow="Low-energy days"
          title="Stop fighting them. Use them."
          body="Repurpose menstrual fatigue into analytical reflection and system auditing."
        />
      </section>
    </>
  );
}

function ValueProp({
  icon,
  eyebrow,
  title,
  body,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-[color:var(--color-primary)]">
        <MaterialIcon name={icon} size={28} weight={200} />
      </span>
      <span className="eyebrow text-[color:var(--color-on-surface-variant)]">
        {eyebrow}
      </span>
      <h3 className="font-display text-[22px] leading-tight font-medium text-[color:var(--color-primary)]">
        {title}
      </h3>
      <p className="text-[15px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
        {body}
      </p>
    </div>
  );
}
