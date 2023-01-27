// @ts-nocheck
import { User } from "../entities/User";
import { Request, Response } from "express";
import { Criteria } from "../common/Criteria";
import { Restrictions } from "../common/Restrictions";
import { HashGenerator } from "../common/HashGenerator";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  public static createUser = async (req: Request, res: Response)=> {
    await PermissionService.checkPermission("CreateUser", req);

    const reqData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    const passwordHash = HashGenerator.generateHash(reqData.password);

    const user = new User();
    user.setUserId(repoUser.id);
    user.setUsername(reqData.username);
    user.setEmail(reqData.email);
    user.setPassword(passwordHash);

    await UserRepository.save(user);

    const createdUserEvent = new ServiceEvent(CREATED_USER, {user});

    ServiceEvents.dispatch(createdUserEvent);

    const userJSON = user.toJSON(user);

    res.json({user: userJSON});
  }

  public static updateUser = async (req: Request, res: Response)=> {
    await checkPermission("UpdateUser", req);

    const reqData = {
      userId: req.params.userId,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      newPassword: req.body.newPassword
    }

    const user = await UserRepository.getUser(reqData.userId);
    const userExists = !!user;

    if(!userExists) {
      throw new NoFoundException("User no found");
    } 

    if(reqData.username && !(reqData.username === user.username)) {
      user.setUsername(reqData.username);
    }

    if(reqData.email && !(reqData.email === user.email)) {
      user.setEmail(reqData.email);
    }

    if(reqData.password && reqData.newPassword) {
      const isValidPassword = HashGenerator.compareHash(reqData.password, user.password);

      if(!isValidPassword) {
        throw new CredentialException("Invalid password");
      }

      const passwordHash = HashGenerator.generateHash(reqData.newPassword);

      user.setPassword(passwordHash);
    }

    await UserRepository.save(user);

    const updatedUserEvent = new ServiceEvent(UPDATED_USER, {user});

    ServiceEvent.dispatch(updatedUserEvent);

    res.json({updated: true});
  }

  public static deleteUser = async (req: Request, res: Response)=> {
    await checkPermission("DeleteUser", req);

    const reqData = {
      userId: req.params.userId
    }

    const user = await UserRepository.getUser(reqData.userId);
    const userExists = !!user;

    if(!userExists) {
      throw new NoFoundException("User no found");
    } 

    user.setIsDeleted(true);

    await UserRepository.save(user);

    res.json({deleted: true});
  }

  public static getUser = async (req: Request, res: Response)=> {
    await PermissionService.checkPermission("GetUserDetails", req);

    const reqData = {
      userId: req.params.userId
    }

    const criteria = new Criteria({id: reqData.userId});

    criteria.add(Restrictions.equal("id", reqData.userId));

    const user = await UserRepository.getUser(criteria);
    const userFound = !!user;

    if(!userFound) {
      throw new NoFoundException("User no found");
    } 
    
    const userJSON = user.toJSON();

    res.json({user: userJSON});
  }

  public static getUsers = async (req: Request, res: Response)=> {
    await checkPermission("GetUsers", req);

    const reqData = {
      search: req.query.search,
      page: Number(req.query.page)
    }

    const criteria = new Criteria();

    const conjunction = new Conjuntion();
    conjution.add(Restrictions.like("username", reqData.search))
    conjution.add(Restrictions.like("emai", reqData.search));

    const disjunction = new Disjunction();
    disjunction.add(Restrictions.between("price", 50, 100));
    
    criteria.add(Restrictions.conjunction(conjunction));
    criteria.add(Restrictions.disjunction(disjunction));

    criteria.setPage(reqData.page);

    const users = await UserRepository.getUsers(criteria);
    const pagination = await UserRepository.getPagination(criteria);
    const usersJSON = users.map((user)=> user.toJSON());

    res.json({users: usersJSON, pagination});
  }
}
