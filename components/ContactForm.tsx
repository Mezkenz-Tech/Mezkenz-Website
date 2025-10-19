"use client";

import { z } from "zod";
import { useState, type ChangeEvent, type FormEvent } from "react";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(1, "Company is required"),
  teamSize: z.string().min(1, "Team size is required"),
  message: z.string().min(1, "Message is required")
});

type ContactFormState = {
  values: z.infer<typeof ContactSchema>;
  errors: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
  status: "idle" | "submitting" | "success" | "error";
  formMessage: string | null;
};

const initialState: ContactFormState = {
  values: {
    name: "",
    email: "",
    company: "",
    teamSize: "",
    message: ""
  },
  errors: {},
  status: "idle",
  formMessage: null
};

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState);

  const updateField = (field: keyof ContactFormState["values"]) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [field]: event.target.value }
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, status: "submitting", formMessage: null, errors: {} }));
    const parseResult = ContactSchema.safeParse(state.values);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      setState((prev) => ({
        ...prev,
        status: "error",
        errors: Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? ""])
        ) as ContactFormState["errors"],
        formMessage: "Please correct the errors in the form."
      }));
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parseResult.data)
      });
      const data = await response.json();
      if (response.ok) {
        setState({ ...initialState, status: "success", formMessage: data.message ?? "Thanks! We’ll get back within one business day." });
      } else {
        setState((prev) => ({
          ...prev,
          status: "error",
          formMessage: data.message ?? "We couldn’t submit the form. Please try again."
        }));
      }
    } catch (error) {
      console.error(error);
      setState((prev) => ({
        ...prev,
        status: "error",
        formMessage: "We couldn’t submit the form. Please try again."
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={state.values.name}
            onChange={updateField("name")}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-secondary shadow-sm focus-visible:ring-primary"
          />
          {state.errors.name && <p className="mt-1 text-xs text-red-600">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={state.values.email}
            onChange={updateField("email")}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-secondary shadow-sm focus-visible:ring-primary"
          />
          {state.errors.email && <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-secondary">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            value={state.values.company}
            onChange={updateField("company")}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-secondary shadow-sm focus-visible:ring-primary"
          />
          {state.errors.company && <p className="mt-1 text-xs text-red-600">{state.errors.company}</p>}
        </div>
        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-secondary">
            Team Size
          </label>
          <input
            id="teamSize"
            name="teamSize"
            type="text"
            required
            value={state.values.teamSize}
            onChange={updateField("teamSize")}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-secondary shadow-sm focus-visible:ring-primary"
          />
          {state.errors.teamSize && <p className="mt-1 text-xs text-red-600">{state.errors.teamSize}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-secondary">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={state.values.message}
          onChange={updateField("message")}
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-secondary shadow-sm focus-visible:ring-primary"
        />
        {state.errors.message && <p className="mt-1 text-xs text-red-600">{state.errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/70"
      >
        {state.status === "submitting" ? "Sending…" : "Submit"}
      </button>
      {state.formMessage && (
        <p
          role="status"
          className={`text-sm ${state.status === "success" ? "text-accent" : "text-red-600"}`}
        >
          {state.formMessage}
        </p>
      )}
    </form>
  );
}
