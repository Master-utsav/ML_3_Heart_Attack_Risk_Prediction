import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
          {/* Left — branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-(--heart-primary) flex items-center justify-center shadow-sm shadow-(--heart-primary)/30">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-heading font-bold text-sm text-foreground tracking-tight">
              Cardio<span className="text-(--heart-primary)">Check</span>
            </span>
            <span className="text-border select-none">·</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              ML v1.0
            </span>
          </div>

          {/* Right — links */}
          <div className="flex items-center gap-3">
            <Link
              href="https://masterutsav.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted-foreground hover:text-(--heart-primary) transition-colors duration-200"
            >
              masterutsav.in
            </Link>
            <span className="text-border select-none">·</span>
            <Link
              href="https://github.com/Master-utsav/ML_3_Heart_Attack_Risk_Prediction"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-(--heart-primary) transition-colors duration-200"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </Link>
          </div>
        </div>

        {/* Copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 pb-5 text-[11px] text-muted-foreground">
          <span>
            Designed &amp; developed by{" "}
            <Link
              href="https://masterutsav.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-(--heart-primary) transition-colors duration-200"
            >
              master_utsav
            </Link>
          </span>
          <span className="text-border hidden sm:inline select-none">
            ·
          </span>
          <span>
            © {new Date().getFullYear()} CardioCheck. Estimates only — not
            medical advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
