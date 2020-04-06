import {IS_AUTH, IS_NOT_AUTH} from './type';
export const isLogedIn = () => ({type:IS_AUTH});
export const isLogedOut = () => ({type:IS_NOT_AUTH});