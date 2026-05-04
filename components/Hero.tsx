import Image from "next/image";
import { MaterialIcon } from "./MaterialIcon";

export function Hero() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-12 md:items-center md:gap-10">
        <div className="mx-auto flex max-w-[720px] flex-col gap-6 text-center md:col-span-7 md:mx-0 md:max-w-none md:text-left">
          <span className="eyebrow animate-fade-up tracking-[0.2em] text-[color:var(--color-primary)]">
            For ambitious women
          </span>
          <h1
            className="animate-fade-up font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-[color:var(--color-primary)] sm:text-[48px] sm:leading-[1.05] md:text-[56px] lg:text-[64px]"
            style={{ animationDelay: "100ms" }}
          >
            Your hormones aren&apos;t a bug. They&apos;re a{" "}
            <em className="font-display italic">feature.</em>
          </h1>
          <p
            className="mx-auto mt-2 max-w-[600px] animate-fade-up font-display text-[17px] leading-[1.4] text-[color:var(--color-on-surface-variant)] sm:mt-4 sm:text-[20px] sm:leading-[1.3] md:mx-0 lg:text-[22px]"
            style={{ animationDelay: "200ms" }}
          >
            A cycle-aware productivity planner. Schedule deep work, meetings, and
            creative time around the four hormonal phases, so you stop fighting
            your biology.
          </p>
          <div
            className="mx-auto mt-2 animate-fade-up md:mx-0"
            style={{ animationDelay: "250ms" }}
          >
            <a
              href="#check-cycle"
              className="hairline inline-flex items-center gap-2 bg-[color:var(--color-primary)] px-6 py-3 font-display text-[14px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-on-primary,#fff)] transition-opacity hover:opacity-90"
            >
              Check my cycle
              <MaterialIcon name="arrow_downward" size={18} weight={400} />
            </a>
          </div>
        </div>

        <div
          className="hidden animate-fade-up md:col-span-5 md:block"
          style={{ animationDelay: "150ms" }}
        >
          <Image
            src="/hero-illustration.png"
            alt="Editorial illustration of a woman planning her week with cycle phase markers in a hardcover journal"
            width={853}
            height={1280}
            priority
            sizes="(max-width: 768px) 0px, 360px"
            className="block h-auto w-full"
          />
        </div>
      </section>

      <div
        className="hairline-b w-full animate-fade-in"
        style={{ animationDelay: "300ms" }}
      />

      <section
        className="grid animate-fade-up grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3"
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
      <h3 className="font-display text-[19px] sm:text-[22px] leading-tight font-medium text-[color:var(--color-primary)]">
        {title}
      </h3>
      <p className="text-[14px] sm:text-[15px] leading-relaxed text-[color:var(--color-on-surface-variant)]">
        {body}
      </p>
    </div>
  );
}
