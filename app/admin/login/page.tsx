import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[420px] flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <span className="eyebrow text-[color:var(--color-primary)]">Admin</span>
        <h1 className="font-display text-[28px] font-medium text-[color:var(--color-primary)]">
          Sign in
        </h1>
      </div>
      <form
        action="/api/admin/login"
        method="POST"
        className="flex flex-col gap-3"
      >
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="hairline bg-[color:var(--color-surface-container-lowest)] px-4 py-3 font-display text-[16px] text-[color:var(--color-primary)] focus:outline-none"
        />
        {error ? (
          <p className="text-[13px] text-[color:var(--color-error,#b00020)]">
            Wrong password.
          </p>
        ) : null}
        <button
          type="submit"
          className="hairline bg-[color:var(--color-primary)] px-4 py-3 font-display text-[14px] font-medium tracking-wide text-[color:var(--color-on-primary,#fff)] transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
