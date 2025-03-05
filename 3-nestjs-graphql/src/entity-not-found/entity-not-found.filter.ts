// import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
// import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
// import { EntityNotFoundError } from 'typeorm';

// @Catch(EntityNotFoundError)
// export class EntityNotFoundFilter<T> implements GqlExceptionFilter {
//   catch(exception: EntityNotFoundError, host: ArgumentsHost) {
//     GqlArgumentsHost.create(host);
//     return new NotFoundException('Entity not found');
//   }
// }

import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { EntityNotFoundError } from 'typeorm';
import { GraphQLError } from 'graphql';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements GqlExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host); // Ensure GraphQL context is created

    return new GraphQLError('Entity not found', {
      extensions: {
        code: 'NOT_FOUND',
        httpStatus: 404,
      },
    });
  }
}
