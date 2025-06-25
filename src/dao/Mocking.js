import mockingPetModel from "./models/MockingPet.js";
import mockingUserModel from "./models/MockingUser.js";

export class MockingPet {
  get = (params) => {
    return mockingPetModel.find(params);
  };

  getBy = (params) => {
    return mockingPetModel.findOne(params);
  };

  save = (doc) => {
    return mockingPetModel.create(doc);
  };

  update = (id, doc) => {
    return mockingPetModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return mockingPetModel.findByIdAndDelete(id);
  };
}

export class MockingUser {
  get = (params) => {
    return mockingUserModel.find(params);
  };

  getBy = (params) => {
    return mockingUserModel.findOne(params);
  };

  save = (doc) => {
    return mockingUserModel.create(doc);
  };

  update = (id, doc) => {
    return mockingUserModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return mockingUserModel.findByIdAndDelete(id);
  };
}
