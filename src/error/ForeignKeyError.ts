export function foreignKeyError(): never {
  const error = new Error("Pre-condition failed: Foreign key constraint failed");
  (error as any).status = 412;
  throw error;
}
