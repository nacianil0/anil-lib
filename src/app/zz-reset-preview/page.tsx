// TEMPORARY visual check for the reset form; deleted after the render run.
import { ResetReadingForm } from "../yonetim/reset-reading-form";

export default function ResetPreviewPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">anil</h1>
        <ResetReadingForm
          highlightCount={4}
          savedPlaceCount={0}
          userId="00000000-0000-4000-8000-00000000000a"
          username="anil"
        />
      </main>
    </div>
  );
}
