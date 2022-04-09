import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  getSchemaPath,
  ApiOkResponse,
  ApiExtraModels,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse
} from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { Registration } from './registration.entity';

@ApiTags('Registrations')
@Controller('registrations')
@ApiExtraModels(Registration)
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {
  }

  @Public()
  @Post('')
  @ApiOperation({summary: 'Sign up new registration'})
  @ApiCreatedResponse({
    description: 'registration was created successfully',
    schema: {
      properties: {
        data: {$ref: getSchemaPath(Registration)},
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWM5NzgwLWZhNzMtNDNmYS1iMzQzLTMxMGRkN2Q5YWQxZSIsImVtYWlsIjoiYWJjQGFzYy5jb20iLCJuYW1lIjoiMTIzIiwiaWF0IjoxNjQ5NDQ3NDYwLCJleHAiOjE3MzU4NDc0NjB9.JG1Kmk58cncl3Zqt9z8qCxAsZHzje8ZSI2PD42X0iYg'
        }
      },
    },
  })
  @ApiUnprocessableEntityResponse({description: 'A registration with same email was existed'})
  @ApiBadRequestResponse({description: 'Name or email is not valid'})
  async register(@Body() dto: SignUpDto) {
    const registration = await this.registrationService.signUp(dto);
    const accessToken = await this.registrationService.createToken(
      registration,
    );
    return {
      data: registration,
      accessToken,
    };
  }

  @Get('')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Fetch registrations'})
  @ApiOkResponse({
    description: 'fetch registrations successfully',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {type: 'string', example: 'Test'},
              id: {type: 'string', example: '43dc091-6954-4894-a865-e1edfbedaa1c'}
            }
          },
        },
      },
    }
  })
  async fetchRegistrations() {
    const registrations = await this.registrationService.fetchRegistrations();
    return {
      data: registrations.map(registration => {
        return {name: registration.name, id: registration.id}
      }),
    };
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Fetch registration by id'})
  @ApiOkResponse({
    description: 'fetch registration successfully',
    schema: {
      properties: {
        data: {$ref: getSchemaPath(Registration)},
      },
    },
  })
  @ApiNotFoundResponse({description: 'Registration was not found'})
  async fetchRegistration(@Param('id') id: string) {
    const registration = await this.registrationService.fetchRegistration(id);
    return {
      data: registration,
    };
  }
}
