import Users from "../dao/Users.dao.js";
import Pet from "../dao/Pets.dao.js";
import Adoption from "../dao/Adoption.js";
import { MockingPet, MockingUser } from "../dao/Mocking.js";

import UserRepository from "../repository/UserRepository.js";
import PetRepository from "../repository/PetRepository.js";
import AdoptionRepository from "../repository/AdoptionRepository.js";
import {
  MockingPetRepository,
  MockingUserRepository,
} from "../repository/MockingRepository.js";

export const usersService = new UserRepository(new Users());
export const petsService = new PetRepository(new Pet());
export const adoptionsService = new AdoptionRepository(new Adoption());
export const mockingPetService = new MockingPetRepository(new MockingPet());
export const mockingUserService = new MockingUserRepository(new MockingUser());
