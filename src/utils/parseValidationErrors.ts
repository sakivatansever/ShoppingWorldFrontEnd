export function parseValidationErrors(
    errors?: Record<string, string[]> | null
  ): string {
    if (!errors) {
      return "";
    }
    
    return Object.values(errors)
      .flat()
      .filter(message => message.trim() !== "")
      .join("\n");
  }
  