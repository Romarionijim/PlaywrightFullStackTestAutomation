import { faker } from "@faker-js/faker";

export default class Randomizer {

    public static get getRandomFirstName(): string {
        return faker.name.firstName();
    }

    public static get getRandomLastName(): string {
        return faker.name.lastName();
    }

    public static get getRandomEmail(): string {
        return faker.internet.email();
    }

    public static get getRandomWords(): string {
        return faker.random.words();
    }

    public static get getRandomJobTitle(): string {
        return faker.name.jobTitle();
    }

    public static get getRandomJobDescription(): string {
        return faker.name.jobDescriptor();
    }

    public static get getRandomDepartment(): string {
        return faker.commerce.department();
    }

    public static get getRandomDomainWords(): string {
        return faker.internet.domainWord();
    }

    public static get getRandomNumbers(): number {
        return faker.datatype.number({ min: 1, max: 1000 });
    }

}