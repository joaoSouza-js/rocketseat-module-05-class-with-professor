import { CredentialsError } from '@/core/error/credentials-error';
import { EmailValueObject } from '@/domain/forum/enterprise/value-object/email-value-object';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makeStudent } from 'test/factories/make-student';
import { StudentRepositoryInMemory } from 'test/in-memory-repositories/student-repository';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Encrypter } from '../../cryptography/encrypter';
import { HasherComparer } from '../../cryptography/hasher-comparer';
import { HasherGenerator } from '../../cryptography/hasher-generator';
import { StudentRepository } from '../../repositories/student-repository';
import { AuthenticateStudentUseCaseCase } from './authenticate-student-use-case';

describe('authenticate student use case', () => {
    let hasher: HasherComparer & HasherGenerator;
    let studentRepository: StudentRepository;
    let sut: AuthenticateStudentUseCaseCase;
    let encrypter: Encrypter;


    beforeEach(() => {
        hasher = new FakeHasher();
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
        const password = "userapassword";
        const passwordHash = await hasher.generate(password);
        const student = makeStudent({ email: studentEmail, password: passwordHash });
        await studentRepository.create(student);

        const response = await sut.execute({
            email: studentEmail.value,
            password: password,
        });

        expect(response).toEqual({
            access_token: expect.any(String),
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
