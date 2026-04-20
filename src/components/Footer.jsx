import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">
              © {new Date().getFullYear()} StayScout
            </span>
          </div>
          <p className="text-sm text-text-muted flex items-center gap-1.5">
            Made with
            <Heart size={14} className="text-error fill-error" />
            for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
