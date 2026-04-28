import { Slug } from "@/core/slug-generator";
import { QuestionRepositoryInMemory } from "@/infra/database/repositories/in-memory-repositories/question-repository";
import { makeQuestion } from "test/factories/make-question";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SlugValueObject } from "../../../enterprise/value-object/slug-value-object";
import type { QuestionRepository } from "../../repositories/question-repository";
import { FindQuestionBySlugUseCase } from "./find-question-by-slug";

describe("find question by slug use case", () => {
    let sut: FindQuestionBySlugUseCase;
    let questionRepository: QuestionRepository;

    beforeEach(() => {
        questionRepository = new QuestionRepositoryInMemory();
        sut = new FindQuestionBySlugUseCase({
            repositories: {
                questionRepository: questionRepository,
            },
        });
    });

    it("should find a question by slug", async () => {
        const title = "Title question 1";
        const slug = SlugValueObject.create(title);

        vi.spyOn(Slug, "generate").mockReturnValue(slug.value)

        const newQuestion = makeQuestion({
            title: title,

        });

        await questionRepository.save(newQuestion);

        const response = await sut.execute({
            slug: slug.value,
        });



        expect(response).toBeTruthy();
        expect(newQuestion.id.toString()).toEqual(response.question?.id.toString());
    });
});
