import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { Registration } from './registration.entity';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    private jwtService: JwtService,
  ) {}
  async createToken(registration: Registration) {
    return await this.jwtService.signAsync(
      {
        id: registration.id,
        email: registration.email,
        name: registration.name,
      },
      { secret: process.env.JWT_SECRET },
    );
  }

  async signUp(dto: SignUpDto): Promise<Registration> {
    const { name } = dto;
    const email = dto.email.toLowerCase();

    if (email) {
      const registration = await this.registrationRepository.findOne({
        where: { email },
      });
      if (registration) {
        throw new UnprocessableEntityException({
          statusCode: 422,
          message: ['A registration with this email already exists'],
        });
      }
    }

    const newRegistration = new Registration({
      email,
      name,
    });
    await this.registrationRepository.save(newRegistration);
    return newRegistration;
  }

  async fetchRegistrations(): Promise<Registration[]>{
    return await this.registrationRepository.find();
  }

  async fetchRegistration(id: string): Promise<Registration> {
    const registration = await this.registrationRepository.findOne(id);
    if (!registration) {
      throw new NotFoundException({
        statusCode: 404,
        message: ['Registration not found'],
      });
    }
    return registration;
  }
}
