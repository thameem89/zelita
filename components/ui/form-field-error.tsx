export function FormFieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <small className="form-error">{message}</small>;
}
