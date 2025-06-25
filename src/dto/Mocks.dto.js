export class MockingPetDTO {
  static getPetInputFrom = (pet) => {
    return {
      name: pet.name || "",
      specie: pet.specie || "",
      image: pet.image || "",
      birthDate: pet.birthDate || "12-30-2000",
      adopted: false,
    };
  };
}

export class MockingUserDTO {
  static getPetInputFrom = (user) => {
    return {
      name: user.name,
      password: user.password,
      role: user.role,
      pets: user.pets || [],
    };
  };
}
