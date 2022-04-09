import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'registrations' })
@Unique(['email'])
export class Registration {
  constructor(partial: Partial<Registration> = {}) {
    if (partial && Object.keys(partial).length > 0) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '43dc091-6954-4894-a865-e1edfbedaa1c' })
  id: string;

  @Column()
  @ApiProperty({ example: 'test' })
  name: string;

  @Column()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;
}
