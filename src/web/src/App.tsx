export default function App() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16">
      <section aria-labelledby="app-title" className="w-full max-w-2xl">
        <p className="mb-6 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
          Project foundation
        </p>
        <h1
          id="app-title"
          className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-6xl"
        >
          Recipe Extractor
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
          A starting point for turning public cooking videos into recipes you
          can keep.
        </p>
        <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-semibold text-stone-900">Early development</h2>
          <p className="mt-2 text-stone-600">
            Recipe extraction is not available yet.
          </p>
        </div>
      </section>
    </main>
  );
}
