import { METHOD_STEPS } from "@/lib/content";

export function MethodPreview() {
  return (
    <section className="bg-muted py-24">
      <div className="container-sb">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold text-sb-navy sm:text-4xl">
            Une approche claire, du premier échange à la livraison
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {METHOD_STEPS.map((step, i) => (
            <div
              key={step.n}
              className="relative rounded-2xl bg-white p-6 shadow-sm"
            >
              <span className="text-4xl font-extrabold text-sb-gold/25">
                {step.n}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-sb-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sb-body">
                {step.desc}
              </p>
              {i < METHOD_STEPS.length - 1 && (
                <div className="absolute top-1/2 right-[-1.1rem] hidden h-px w-6 bg-sb-grayline lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
