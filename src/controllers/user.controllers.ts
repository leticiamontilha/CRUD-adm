import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service"
import { IUserRequest } from "../interfaces/users.interfaces"
import deleteUserService from "../services/users/deleteUserService"
import listUserService from "../services/users/listUsers.services"
import listUserProfileService from "../services/users/listUserProfile.service"
import editUserService from "../services/users/editUser.service"
import activeUserService from "../services/users/activeUser.service"

const createUsersController = async (request: Request, response: Response): Promise<Response> => {

    const userData: IUserRequest = request.body

    const newUser = await createUserService(userData)

    return response.status(201).json(newUser)

}

const listUserController = async (request:Request, response:Response): Promise<Response> => {
    
    const users = await listUserService()
    
    return response.json(users)
}

const listUserProfile = async (request: Request, response: Response): Promise <Response> => {
    const userId: number = request.user.id

    const userProfile = await listUserProfileService(userId)

    return response.json(userProfile)
}

const deleteUserControler = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = parseInt(request.params.id)

    await deleteUserService(userId)

    return response.status(204).send()
}

const editUserControler = async (request: Request, response: Response): Promise<Response> => {
    const userData = request.body

    const id: number = +request.params.id

    const editUser = await editUserService(userData, id)

    return response.json(editUser)
}

const activeUserControler = async (request: Request, response: Response): Promise<Response> => {
    const idUser: number = +request.params.id

    const activeUser = await activeUserService(idUser)

    return response.json(activeUser)
}

export {
    createUsersController,
    listUserController,
    listUserProfile,
    editUserControler,
    deleteUserControler, 
    activeUserControler
}