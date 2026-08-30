import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileCheck2, Loader2, Upload, X } from "lucide-react";

const ALLOWED_EXTS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"] as const;
const ALLOWED_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
];
const MAX_BYTES = 10 * 1024 * 1024; // 10MB

export type CvValidationError = "extension" | "size" | null;

export function validateCvFile(file: File): { ok: boolean; error: CvValidationError; message: string | null } {
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const extOk = (ALLOWED_EXTS as readonly string[]).includes(ext);
  const mimeOk = file.type === "" || ALLOWED_MIMES.includes(file.type);
  if (!extOk || !mimeOk) {
    return {
      ok: false,
      error: "extension",
      message: "Dit bestandstype wordt niet ondersteund. Kies een PDF, DOC, DOCX, JPG of PNG.",
    };
  }
  if (file.size > MAX_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      ok: false,
      error: "size",
      message: `Bestand is ${mb}MB — te groot. Maximaal 10MB toegestaan.`,
    };
  }
  return { ok: true, error: null, message: null };
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface CvUploadFieldProps {
  file: File | null;
  setFile: (f: File | null) => void;
  uploading: boolean;
  fileError: string | null;
  setFileError: (m: string | null) => void;
  inputId?: string;
}

export const CvUploadField = ({
  file,
  setFile,
  uploading,
  fileError,
  setFileError,
  inputId = "cv",
}: CvUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);

  const handleFile = (next: File | null) => {
    setTouched(true);
    if (!next) {
      setFile(null);
      setFileError(null);
      return;
    }
    const result = validateCvFile(next);
    if (!result.ok) {
      setFile(null);
      setFileError(result.message);
      // reset input so re-selecting same file re-triggers onChange
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFileError(null);
    setFile(next);
  };

  const handleRemove = () => {
    setFile(null);
    setFileError(null);
    setTouched(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const showSuccess = !!file && !fileError && !uploading;
  const showError = !!fileError;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm text-[#0d3b2e] mb-2">
        CV / certificaten uploaden
      </label>

      {file ? (
        <div
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border ${
            showSuccess ? "border-[#9ed42e] bg-[#f0f7e6]" : "border-gray-200 bg-white"
          }`}
        >
          {showSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-[#0d3b2e] flex-shrink-0" aria-hidden="true" />
          ) : (
            <FileCheck2 className="w-5 h-5 text-[#0d3b2e] flex-shrink-0" aria-hidden="true" />
          )}
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-wider text-[#6c757d]">
              {showSuccess ? "Bestand klaar om te versturen" : "Bestand geselecteerd"}
            </div>
            <div className="text-sm text-[#0d3b2e] break-words [overflow-wrap:anywhere]">
              {file.name}{" "}
              <span className="text-[#6c757d]">({formatSize(file.size)})</span>
            </div>
          </div>
          <label
            htmlFor={inputId}
            className="text-xs text-[#0d3b2e] underline cursor-pointer min-h-[44px] flex items-center px-2"
          >
            Wijzig
          </label>
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            aria-label="Verwijder bestand"
            className="text-[#6c757d] hover:text-[#0d3b2e] min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={`flex items-center justify-center gap-3 w-full px-4 py-5 rounded-lg border-2 border-dashed cursor-pointer transition bg-white min-h-[88px] ${
            showError
              ? "border-red-400 hover:border-red-500 hover:bg-red-50/40"
              : "border-gray-300 hover:border-[#9ed42e] hover:bg-[#f0f7e6]/40"
          }`}
        >
          <Upload className={`w-5 h-5 ${showError ? "text-red-600" : "text-[#0d3b2e]"}`} aria-hidden="true" />
          <span className={`text-sm ${showError ? "text-red-700" : "text-[#6c757d]"}`}>
            {showError ? "Kies een ander bestand" : "Klik om bestand te kiezen"}
          </span>
        </label>
      )}

      <input
        id={inputId}
        ref={inputRef}
        name="cv"
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
        aria-describedby={showError ? `${inputId}-error` : `${inputId}-help`}
        aria-invalid={showError || undefined}
        className="hidden"
      />

      {uploading && (
        <div className="mt-3" role="status" aria-live="polite">
          <div className="flex items-center gap-2 text-xs text-[#0d3b2e] mb-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            <span>Bestand uploaden…</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/3 bg-[#9ed42e] rounded-full animate-progress" />
          </div>
        </div>
      )}

      {showError && (
        <div
          id={`${inputId}-error`}
          role="alert"
          aria-live="polite"
          className="mt-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3"
        >
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-red-800 leading-relaxed">{fileError}</p>
        </div>
      )}

      {showSuccess && touched && (
        <p className="mt-2 flex items-center gap-2 text-xs text-[#0d3b2e]">
          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Bestand toegevoegd. Je kunt het wijzigen of verwijderen voordat je verstuurt.</span>
        </p>
      )}

      <p id={`${inputId}-help`} className="mt-2 text-xs text-[#6c757d] leading-relaxed">
        Toegestane bestanden: <span className="text-[#0d3b2e]">PDF, DOC, DOCX, JPG, PNG</span> — maximaal 10MB. Geen CV bij de hand? Geen probleem, je kunt ook zonder bestand aanmelden.
      </p>
    </div>
  );
};
