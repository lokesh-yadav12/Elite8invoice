import { useState, useCallback } from 'react';
import { validateForm, ValidationRules, ValidationErrors } from '../utils/validation';

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules;
  onSubmit: (values: T) => void | Promise<void>;
  onError?: (errors: ValidationErrors) => void;
}

const useForm = <T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
  onError,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      
      // Handle different input types
      let finalValue: any = value;
      
      if (type === 'number') {
        finalValue = value === '' ? '' : Number(value);
      } else if (type === 'checkbox') {
        finalValue = (e.target as HTMLInputElement).checked;
      }
      
      setValues((prevValues) => ({
        ...prevValues,
        [name]: finalValue,
      }));

      // Clear error when user types
      if (errors[name]) {
        setErrors((prevErrors: ValidationErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  // Handle blur event (for showing validation errors)
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));

      // Validate field on blur if validation rules exist
      if (validationRules[name]) {
        const fieldErrors = validateForm(
          { [name]: values[name] },
          { [name]: validationRules[name] }
        );
        
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...fieldErrors,
        }));
      }
    },
    [validationRules, values]
  );

  // Set a field value programmatically
  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  // Set a field error programmatically
  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prevErrors: ValidationErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      
      // Validate all fields
      const formErrors = validationRules ? validateForm(values, validationRules) : {};
      setErrors(formErrors);
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouched(allTouched);
      
      // If no errors, submit the form
      if (Object.keys(formErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
          // Handle API errors here if needed
        } finally {
          setIsSubmitting(false);
        }
      } else if (onError) {
        onError(formErrors);
      }
    },
    [onSubmit, onError, validationRules, values]
  );

  // Check if a field has an error and has been touched
  const getFieldError = useCallback(
    (name: string) => {
      return touched[name] ? errors[name] || '' : '';
    },
    [errors, touched]
  );

  // Check if the form is valid
  const isValid = useCallback(() => {
    if (!validationRules) return true;
    const formErrors = validateForm(values, validationRules);
    return Object.keys(formErrors).length === 0;
  }, [validationRules, values]);

  return {
    // Form state
    values,
    errors,
    isSubmitting,
    touched,
    
    // Form actions
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    
    // Helpers
    getFieldError,
    isValid: isValid(),
    
    // Field props generator (for easier integration with form controls)
    getFieldProps: (name: string) => ({
      name,
      value: values[name] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: getFieldError(name),
    }),
  };
};

export default useForm;
