import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) { }

  async validate(email: String, args: ValidationArguments) {
    // return false
    return await this.userService.findByEmail(email).then(user => {
      if (user) return false;
      return true;
    });
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}

// import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
// import { UserService } from '../user.service';
// import { Injectable } from '@nestjs/common';

// @ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
// @Injectable() // this is needed in order to the class be injected into the module
// export class IsUserAlreadyExist implements ValidatorConstraintInterface {
//   constructor(protected readonly userService: UserService) { }

//   async validate(text: String) {
//     const user = await this.userService.findByEmail(text);
//     // const user = await this.userService.batata();
//     return !user;
//   }
// }
