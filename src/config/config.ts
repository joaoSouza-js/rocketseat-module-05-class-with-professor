
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision",
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV!: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT!: number;

    @IsString()

    DATABASE_URL!: string

    @IsString()
    JWT_SECRET_RSA_KEY!: string


    @IsString()
    JWT_PUBLIC_RSA_KEY!: string

}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        const formatted = errors.map(err => ({
            property: err.property,
            constraints: err.constraints,
        }))

        throw new Error(JSON.stringify(formatted, null, 2))
    }
    return validatedConfig;
}
