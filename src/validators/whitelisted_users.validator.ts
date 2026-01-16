import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { NftLimit } from 'src/user/user.dto';
  
  @ValidatorConstraint({ async: false })
  class UniqueNftTypeConstraint implements ValidatorConstraintInterface {
    validate(nftLimits: NftLimit[], args: ValidationArguments) {
      const nftTypes = nftLimits.map((nft) => nft.nftType);
      return new Set(nftTypes).size === nftTypes.length;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Each nftType must be unique in the nftLimits array.';
    }
  }
  
  export function UniqueNftType(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: UniqueNftTypeConstraint,
      });
    };
  }
  