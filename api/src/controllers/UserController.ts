import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schmea = yup.object().shape({
      name: yup.string().required("Nome é obrigatorio"),
      email: yup.string().email("Email é obrigatorio")
    });

    /* Fazer validação */

    // if(!(await schmea.isValid(request.body))) {
    //     return response.status(400).json({
    //         error: "Validation Falied! "
    //     });
    // }

    /* 
    Outro modo para Fazer validação com try catch, mais recomendado para fazer validações
     abortEarly: false = Para tazer todos erros(Validações)
    */

    try {
      await schmea.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError (err);

      /* return response.status(400).json({ error: err }); */
    }




    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    })

    if (userAlreadyExists) {
      throw new AppError("User already exists!");

      /* return response.status(400).json({
        error: "User already exists!",
      }); */
    }

    const user = usersRepository.create({
      name, email
    })

    await usersRepository.save(user);

    
    return response.status(201).json(user);
  }
}

export { UserController };
