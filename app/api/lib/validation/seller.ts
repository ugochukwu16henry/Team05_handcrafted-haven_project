import { Seller } from '../../types/user';
import { ValidationError } from '../errors/validationerror';

export function validateNewSeller(body: Partial<Seller>) {
  if (!body.name || !body.email) {
    throw new ValidationError(
      'Missing required fields: name, email',
      400
    );
  }
}

export function sanitizeSellerUpdate(body: Partial<Seller>) {
  const sanitized = { ...body };

  // Prevent restricted updates
  delete sanitized._id;
  delete sanitized.createdAt;

  if (Object.keys(sanitized).length === 0) {
    throw new ValidationError(
      'No fields provided to update',
      400
    );
  }

  return sanitized;
}
