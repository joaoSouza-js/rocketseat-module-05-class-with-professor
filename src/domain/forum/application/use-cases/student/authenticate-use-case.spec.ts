import { CredentialsError } from '@/core/error/credentials-error';
import { EmailValueObject } from '@/domain/forum/enterprise/value-object/email-value-object';
import { StudentRepositoryInMemory } from '@/infra/database/repositories/in-memory-repositories/student-repository';
import { makeStudent } from 'test/factories/make-student';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Encrypter } from '../../cryptography/encrypter';
import { HasherComparer } from '../../cryptography/hasher-comparer';
import { StudentRepository } from '../../repositories/student-repository';
import { AuthenticateStudentUseCaseCase } from './authenticate-student-use-case';

describe('authenticate student use case', () => {
    let hasher: HasherComparer;
    let studentRepository: StudentRepository;
    let sut: AuthenticateStudentUseCaseCase;
    let encrypter: Encrypter;

    beforeEach(() => {
        hasher = {
            compare: vi.fn().mockReturnValue(true),
        };
        encrypter = {
            encrypt: vi.fn().mockReturnValue('token'),
        };
        studentRepository = new StudentRepositoryInMemory();
        sut = new AuthenticateStudentUseCaseCase({
            repositories: {
                studentRepository: studentRepository,
            },
            services: {
                hasher: hasher,
                encrypter,
            },
        });
    });

    it('should authenticate a student', async () => {
        const studentEmail = EmailValueObject.fromString('joedo@gmail.com');
        const student = makeStudent({ email: studentEmail });
        await studentRepository.create(student);

        const response = await sut.execute({
            email: studentEmail.value,
            password: 'password',
        });

        expect(response).toEqual({
            accessToken: expect.any(String),
        });
    });

    it('should throw a CredentialsError if password is incorrect    ', async () => {
        const studentEmail = EmailValueObject.fromString('joedo@gmail.com');
        const student = makeStudent({ email: studentEmail });
        await studentRepository.create(student);
        hasher.compare = vi.fn().mockReturnValue(false);

        await expect(async () => {
            await sut.execute({
                email: studentEmail.value,
                password: 'password',
            });
        }).rejects.toBeInstanceOf(CredentialsError);
    });
});
