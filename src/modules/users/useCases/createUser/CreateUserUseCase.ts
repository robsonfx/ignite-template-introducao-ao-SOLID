import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailTaken = this.usersRepository.findByEmail(email);

    if (emailTaken) throw new Error("Email taken by another user");

    if (!email) {
      throw new Error("E-mail não pode ser nulo");
    }

    if (!name) throw new Error("Name não pode ser nulo");

    const user = this.usersRepository.create({ name, email });
    return user;
  }
}

export { CreateUserUseCase };
