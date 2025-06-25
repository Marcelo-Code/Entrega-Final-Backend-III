import GenericRepository from "./GenericRepository.js";

export class MockingPetRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}

export class MockingUserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}
