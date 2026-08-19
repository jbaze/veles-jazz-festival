import Link from "next/link";

/**
 * Locale-scoped not-found boundary. The locale isn't available as a param
 * in a not-found file, so it links to both language homes.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-24 text-center sm:px-6">
      <p className="type-display type-display-1 text-prussian">404</p>
      <p className="type-display mt-4 text-2xl text-paper">
        Страницата не е најдена · Page not found
      </p>
      <div className="mt-10 flex justify-center gap-3">
        <Link href="/mk" className="btn">
          Почетна
        </Link>
        <Link href="/en" className="btn">
          Home
        </Link>
      </div>
    </div>
  );
}
