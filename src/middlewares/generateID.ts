import { v4 as uuidv4 } from "uuid";
class GenerateId {
  public generateId(): string {
    return uuidv4();
  }
}

export default new GenerateId();
