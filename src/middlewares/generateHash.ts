import * as bcrypt from "bcryptjs";
class HashManager {
  public async hash(text: string): Promise<string> {
    const round = Number(process.env.BCRPYT_COST);
    const salt = await bcrypt.genSalt(round);
    return bcrypt.hash(text, salt);
  }

  public async compare(text: string, cryptText: string): Promise<boolean> {
    return bcrypt.compare(text, cryptText);
  }
}

export default new HashManager();
