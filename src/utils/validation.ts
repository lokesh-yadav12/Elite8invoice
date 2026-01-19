export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | boolean;
  message?: string;
}

export type ValidationRules = Record<string, ValidationRule>;

export type ValidationErrors = Record<string, string>;

/**
 * Validates form data against the provided validation rules
 * @param data - The form data to validate
 * @param rules - The validation rules to apply
 * @returns An object containing validation errors (if any)
 */
export const validateForm = (
  data: Record<string, any>,
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const fieldRules = rules[field];
    const fieldError = validateField(value, fieldRules, field, data);
    
    if (fieldError) {
      errors[field] = fieldError;
    }
  });

  return errors;
};

/**
 * Validates a single field against its validation rules
 * @param value - The field value to validate
 * @param rules - The validation rules for the field
 * @param fieldName - The name of the field (used for error messages)
 * @param formData - The complete form data (for cross-field validation)
 * @returns An error message if validation fails, otherwise null
 */
const validateField = (
  value: any,
  rules: ValidationRule,
  fieldName: string,
  formData: Record<string, any>
): string | null => {
  // Handle required validation
  if (rules.required) {
    if (value === undefined || value === null || value === '') {
      return rules.message || `${fieldName} is required`;
    }
  }

  // Skip further validation if value is empty (unless it's required)
  if (value === undefined || value === null || value === '') {
    return null;
  }

  // Min length validation
  if (rules.minLength !== undefined && String(value).length < rules.minLength) {
    return (
      rules.message ||
      `${fieldName} must be at least ${rules.minLength} characters`
    );
  }

  // Max length validation
  if (rules.maxLength !== undefined && String(value).length > rules.maxLength) {
    return (
      rules.message ||
      `${fieldName} must be no more than ${rules.maxLength} characters`
    );
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(String(value))) {
    return rules.message || `${fieldName} is not valid`;
  }

  // Custom validation function
  if (typeof rules.custom === 'function') {
    const customError = rules.custom(value);
    if (typeof customError === 'string') {
      return customError;
    } else if (customError === false) {
      return rules.message || `${fieldName} is not valid`;
    }
  }

  return null; // No error
};

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,15}$/,
  PINCODE: /^[0-9]{6}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
  ALPHA: /^[A-Za-z\s]+$/,
  ALPHA_NUMERIC: /^[A-Za-z0-9\s]+$/,
  NUMERIC: /^[0-9]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Common validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_PASSWORD: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  MIN_LENGTH: (field: string, length: number) => 
    `${field} must be at least ${length} characters`,
  MAX_LENGTH: (field: string, length: number) => 
    `${field} must be no more than ${length} characters`,
};

// Example usage:
/*
const formData = {
  email: 'test@example.com',
  password: 'Password123!',
  confirmPassword: 'Password123!',
};

const validationRules = {
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.EMAIL,
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: VALIDATION_PATTERNS.PASSWORD,
    message: VALIDATION_MESSAGES.INVALID_PASSWORD,
  },
  confirmPassword: {
    required: true,
    custom: (value: string) => value === formData.password || VALIDATION_MESSAGES.PASSWORD_MISMATCH,
  },
};

const errors = validateForm(formData, validationRules);
*/
