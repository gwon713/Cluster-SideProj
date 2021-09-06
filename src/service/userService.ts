import { UserClass_all } from "../models/json_model/jsonModel"
import fs from 'fs';
import path from "path";
import { get_userJSONData } from "../models/json_model/jsonModel_user";
import { connection } from '../config/database';
import logger from '../config/logger';
import { search_User_SQL } from "../config/sql";


export const search_User = async(userEmail: String, userToken: String, userSocial: String) => {
    const postdb = await connection.connect();
    // const params = [userEmail, userToken, userSocial];
    const params = ['test1@gmail.com', 'kakaoIsdtsonrsofnolnqpinf','kakao'];
    try {        
        return postdb.query(search_User_SQL, params, (err, res)=>{
            if(err){
                logger.error("sql point 1",err);
                throw err;
            }
            return res.rows;
        });
    } catch (err) {
        logger.error("sql point 2", err);
        throw err;
    } finally {
        postdb.release();
    }
}

export const add_User = async(userEmail: String, userNickname: String, userToken: String, userSocial: String) => {
    const postdb = await connection.connect();
    const params = [userEmail, userNickname, userToken, userSocial]
    try {
        const result = await postdb.query(search_User_SQL, params); // select * from "ddudoSchema"."user" where user_email = ? and user_token = ? and user_social = ? and user_deleted = false ;
        logger.info(result.rows);
        return result.rows;
    } catch (err) {
        logger.error(JSON.stringify(err));
        return "ERROR";
    } finally {
        await postdb.release();
    }
}