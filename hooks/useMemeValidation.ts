import { useState } from "react";

interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    image?: string;
  };
}

export function useMemeValidation() {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: {},
  });

  const validateMeme = (name: string, imageUrl: string): ValidationResult => {
    const errors: { name?: string; image?: string } = {};

    // Validate name
    if (!name || name.length < 3 || name.length > 100) {
      errors.name = "Name must be between 3 and 100 characters";
    }

    // Validate image URL
    try {
      const url = new URL(imageUrl);
      const isValidProtocol = ["http:", "https:"].includes(url.protocol);
      const isImageExtension = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/.test(
        url.pathname,
      );

      if (!isValidProtocol || !isImageExtension) {
        errors.image = "Please enter a valid image URL (jpg, png, gif, etc.)";
      }
    } catch {
      errors.image = "Please enter a valid URL";
    }

    const isValid = Object.keys(errors).length === 0;

    setValidationResult({ isValid, errors });

    return { isValid, errors };
  };

  return {
    validationResult,
    validateMeme,
  };
}
