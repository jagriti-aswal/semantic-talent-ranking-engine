import { useRef, useState } from "react";
import { CloudUpload, FileText, Clock, Database } from "lucide-react";
import { cn } from "../../lib/utils";
import type { DatasetInfo } from "../../data/candidates";

export function DatasetCard({ dataset }: { dataset: DatasetInfo }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);
   const uploadFile = async (
      file: File
    ) => {

      try {

        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            "https://jagriti-aswal-semantic-talent-ranking-engine.hf.space/upload-dataset",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        alert(data.message);

      } catch (err) {

        console.error(err);

        alert("Upload failed");

      } finally {

        setUploading(false);
      }
    };

  return (
    <section className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-sm font-semibold text-foreground">Candidate Dataset</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Upload candidates to rank</p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border transition-colors hover:bg-accent"
        >
          <CloudUpload className="h-3.5 w-3.5" />

          {uploading
            ? "Uploading..."
            : "Upload Dataset"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jsonl"
        className="hidden"
        onChange={(e) => {

          console.log("FILE SELECTED");

          const file =
            e.target.files?.[0];

          console.log(file);

          if (file) {

            uploadFile(
              file
            );
          }
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        className={cn(
          "mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragging
            ? "border-primary bg-primary-muted"
            : "border-border-strong/60 bg-surface/40 hover:border-primary/50 hover:bg-surface",
        )}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-muted text-primary">
          <CloudUpload className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-foreground">
          Drag &amp; drop your file here
        </span>
        <span className="text-xs text-muted-foreground">
          or click to browse · accepts{" "}
          <span className="font-medium text-foreground">JSONL</span> and{" "}
          <span className="font-medium text-foreground">CSV</span>
        </span>
      </button>

      <div className="mt-4 rounded-xl border border-border bg-surface/50 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Database className="h-3.5 w-3.5" />
          Dataset Statistics
        </div>
        <dl className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-3">
          <Stat label="Candidates Loaded" value={dataset.candidatesLoaded.toLocaleString()} icon={<Database className="h-3.5 w-3.5" />} />
          <Stat label="File Name" value={dataset.fileName} icon={<FileText className="h-3.5 w-3.5" />} mono />
          <Stat label="Last Uploaded" value={dataset.lastUploaded} icon={<Clock className="h-3.5 w-3.5" />} />
        </dl>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  icon,
  mono,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="bg-card p-3">
      <div className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "mt-1.5 truncate text-sm font-semibold text-foreground",
          mono && "font-mono text-xs",
        )}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}
