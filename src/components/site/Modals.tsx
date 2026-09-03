import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        id={id}
        required
        {...props}
        className="mt-1.5 w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
      />
    </label>
  );
}

function ModalShell({
  trigger,
  title,
  description,
  children,
}: {
  trigger: ReactNode;
  title: string;
  description: string;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children(() => setOpen(false))}
      </DialogContent>
    </Dialog>
  );
}

export function ScheduleVisitModal({ pgName, trigger }: { pgName: string; trigger: ReactNode }) {
  return (
    <ModalShell
      trigger={trigger}
      title="Schedule a visit"
      description={`Pick a slot to see ${pgName} in person. The owner will confirm over a call.`}
    >
      {(close) => (
        <form
          className="space-y-3"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            close();
            toast.success("Visit request submitted successfully!", {
              description: `${pgName} will confirm your slot shortly.`,
            });
          }}
        >
          <Field label="Name" placeholder="Your full name" />
          <Field label="Phone" type="tel" placeholder="+91 98xxx xxxxx" pattern="[0-9+ ]{8,15}" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Preferred date" type="date" />
            <Field label="Preferred time" type="time" />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            Request visit
          </button>
        </form>
      )}
    </ModalShell>
  );
}

export function ContactOwnerModal({
  pgName,
  ownerName,
  trigger,
}: {
  pgName: string;
  ownerName: string;
  trigger: ReactNode;
}) {
  return (
    <ModalShell
      trigger={trigger}
      title={`Contact ${ownerName}`}
      description={`Send a message about ${pgName}. Usually replies within 2 hours.`}
    >
      {(close) => (
        <form
          className="space-y-3"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            close();
            toast.success("Message sent to the owner!", {
              description: "You'll get a reply on your phone number.",
            });
          }}
        >
          <Field label="Name" placeholder="Your full name" />
          <Field label="Phone" type="tel" placeholder="+91 98xxx xxxxx" pattern="[0-9+ ]{8,15}" />
          <label htmlFor="message" className="block">
            <span className="text-xs font-semibold text-muted-foreground">Message</span>
            <textarea
              id="message"
              required
              rows={3}
              defaultValue={`Hi, I'm interested in ${pgName}. Is a room available from next month?`}
              className="mt-1.5 w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
            />
          </label>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            Send message
          </button>
        </form>
      )}
    </ModalShell>
  );
}
