import { ObjectId } from 'mongodb';
import { ValidationError } from '../errors/validationerror';

export function validateObjectId(id: unknown): asserts id is string {
  if (typeof id !== 'string' || !ObjectId.isValid(id)) {
    throw new ValidationError('Valid seller id is required', 400);
  }
}