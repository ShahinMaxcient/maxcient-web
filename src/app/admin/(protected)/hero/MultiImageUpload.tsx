"use client";

import { useState } from "react";
import ImageUpload from "../ImageUpload";

/**
 * Up to `max` hero background images. Serializes the non-empty URLs to a hidden
 * `name` field as a JSON array, which the hero save action parses.
 */
export default function MultiImageUpload({ name, value, max = 4 }: { name: string; value: string[]; max?: number }) {
  const [slots, setSlots] = useState<string[]>(value.length ? value : [""]);

  const setAt = (i: number, url: string) => setSlots((prev) => prev.map((v, idx) => (idx === i ? url : v)));
  const add = () => setSlots((prev) => (prev.length < max ? [...prev, ""] : prev));
  const removeSlot = (i: number) => setSlots((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : [""]));

  const clean = slots.filter(Boolean);

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(clean)} />

      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
        Add up to {max} images. With more than one, the hero background cross-fades between them automatically.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {slots.map((img, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
            <ImageUpload value={img} onChange={(url) => setAt(i, url)} label={`Image ${i + 1}`} />
            {slots.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlot(i)}
                className="mt-2 text-xs font-semibold hover:underline"
                style={{ color: "#dc2626" }}
              >
                Remove this slot
              </button>
            )}
          </div>
        ))}
      </div>

      {slots.length < max && (
        <button
          type="button"
          onClick={add}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg"
          style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
          Add image ({slots.length}/{max})
        </button>
      )}
    </div>
  );
}
