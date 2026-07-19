"use client";

import { useState, useRef } from "react";

type Props = {
  name: string;
  value: string;
  onChange?: (url: string) => void;
  label?: string;
  help?: string;
};

export default function ImageUpload({ name, value, onChange, label, help }: Props) {
  const [url, setUrl] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const { url: newUrl } = await res.json();
      setUrl(newUrl);
      onChange?.(newUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      {label && (
        <label className="block text-[13px] font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>
          {label}
        </label>
      )}

      <input type="hidden" name={name} value={url} />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative rounded-xl border-2 border-dashed cursor-pointer transition-colors overflow-hidden"
        style={{
          borderColor: uploading ? "var(--primary)" : "var(--border)",
          background: "var(--surface)",
          minHeight: url ? 160 : 120,
        }}
      >
        {url ? (
          <div className="relative group">
            <img
              src={url}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <span className="text-white text-sm font-medium">
                {uploading ? "Uploading..." : "Click or drop to replace"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <svg className="w-8 h-8 mb-2" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              {uploading ? "Uploading..." : "Click or drag image here"}
            </span>
            <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              JPG, PNG, WebP, SVG (max 4.5 MB)
            </span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/40 rounded-xl">
            <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
        className="hidden"
        onChange={handleInputChange}
      />

      {error && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{error}</p>}
      {help && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{help}</p>}

      {url && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setUrl(""); onChange?.(""); }}
          className="text-xs mt-1.5 font-medium hover:underline"
          style={{ color: "var(--text-muted)" }}
        >
          Remove image
        </button>
      )}
    </div>
  );
}
