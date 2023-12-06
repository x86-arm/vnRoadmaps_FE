import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            to="https://t.me/x86arm"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            x86arm
          </Link>
          . All rights reserved{" "}
          {/* <a
            href="https://github.com/shadcn/ui"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a> */}
          .
        </p>
      </div>
    </footer>
  );
}
