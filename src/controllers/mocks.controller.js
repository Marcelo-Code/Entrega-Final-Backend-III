import { __dirname, createHash } from "../utils/index.js";
import { faker } from "@faker-js/faker";
import { mockingPetService, mockingUserService } from "../services/index.js";
import { MockingPetDTO, MockingUserDTO } from "../dto/Mocks.dto.js";

const generateData = async (req, res) => {
  try {
    const { petQuantity, userQuantity } = req.body;

    //Validación de las quantities
    if (
      typeof petQuantity !== "number" ||
      petQuantity <= 0 ||
      typeof userQuantity !== "number" ||
      userQuantity <= 0
    ) {
      return res.status(400).send({
        status: "error",
        error:
          "Las cantidades de usuarios y mascotas deben ser números positivos",
      });
    }

    const mockingPets = [];
    const mockingUsers = [];

    for (let index = 0; index < petQuantity; index++) {
      const newMockingPet = MockingPetDTO.getPetInputFrom({
        name: faker.animal.dog(),
        specie: faker.animal.type(),
        image: faker.image.urlPicsumPhotos(),
        birthDate: faker.date.past({ years: 10 }),
      });

      const result = await mockingPetService.create(newMockingPet);

      mockingPets.push(result);
    }
    for (let index = 0; index < userQuantity; index++) {
      const newMockingUser = MockingUserDTO.getPetInputFrom({
        name: faker.person.firstName(),
        password: await createHash("coder123"),
        role: faker.helpers.arrayElement(["admin", "user"]),
      });

      const result = await mockingUserService.create(newMockingUser);

      mockingUsers.push(result);
    }
    res.send({ status: "success", payload: { mockingPets, mockingUsers } });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const getMockingPets = async (req, res) => {
  try {
    const mockingPets = await mockingPetService.getAll();
    res.send({ status: "success", payload: mockingPets });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const getMockingUsers = async (req, res) => {
  try {
    const mockingUsers = await mockingUserService.getAll();
    res.send({ status: "success", payload: mockingUsers });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  generateData,
  getMockingPets,
  getMockingUsers,
};
