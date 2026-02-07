import { ValidationError } from '../errors/validationerror';

export interface SignupInput {
  name: unknown;
  email: unknown;
  password: unknown;
  confirmPassword: unknown;
}

export interface ValidatedSignupData {
  name: string;
  email: string;
  password: string;
}

export function validateSignupInput(
  input: SignupInput
): ValidatedSignupData {
  const { name, email, password, confirmPassword } = input;

  // Name
  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new ValidationError('Name is required');
  }

  // Email
  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new ValidationError('Valid email is required');
  }

  // Password
  if (typeof password !== 'string' || password.length < 8) {
    throw new ValidationError(
      'Password must be at least 8 characters long'
    );
  }

  // Confirm password
  if (password !== confirmPassword) {
    throw new ValidationError('Passwords do not match');
  }

  // Return ONLY what backend should persist
  return {
    name: name.trim(),
    email: email.toLowerCase(),
    password,
  };
}
