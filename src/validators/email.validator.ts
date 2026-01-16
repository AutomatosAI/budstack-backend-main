import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsLowercaseEmailConstraint
  implements ValidatorConstraintInterface
{
  validate(email: string) {
    // Ensure the value is a string and is equal to its lowercase version
    return typeof email === "string" && email === email.toLowerCase();
  }

  defaultMessage() {
    return "Email must be in lowercase.";
  }
}

export function IsLowercaseEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLowercaseEmailConstraint,
    });
  };
}
