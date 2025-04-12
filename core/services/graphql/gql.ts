/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateUserIfNotExists($userData: CreateUserIfNotExistsInput!) {\n    createUserIfNotExists(createUserIfNotExistsInput: $userData) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        id\n        name\n      }\n    }\n  }\n": typeof types.CreateUserIfNotExistsDocument,
    "\n  mutation UpdateUserProfile($userId: ID!, $updateUserProfile: UpdateUserProfileInput!) {\n    updateUserProfile(id: $userId, updateUserData: $updateUserProfile) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UpdateUserProfileDocument,
    "\n  query UserInfo($username: String!) {\n    user(username: $username) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        name\n        id\n      }\n    }\n  }\n": typeof types.UserInfoDocument,
};
const documents: Documents = {
    "\n  mutation CreateUserIfNotExists($userData: CreateUserIfNotExistsInput!) {\n    createUserIfNotExists(createUserIfNotExistsInput: $userData) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        id\n        name\n      }\n    }\n  }\n": types.CreateUserIfNotExistsDocument,
    "\n  mutation UpdateUserProfile($userId: ID!, $updateUserProfile: UpdateUserProfileInput!) {\n    updateUserProfile(id: $userId, updateUserData: $updateUserProfile) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        id\n        name\n      }\n    }\n  }\n": types.UpdateUserProfileDocument,
    "\n  query UserInfo($username: String!) {\n    user(username: $username) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        name\n        id\n      }\n    }\n  }\n": types.UserInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUserIfNotExists($userData: CreateUserIfNotExistsInput!) {\n    createUserIfNotExists(createUserIfNotExistsInput: $userData) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        id\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').CreateUserIfNotExistsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserProfile($userId: ID!, $updateUserProfile: UpdateUserProfileInput!) {\n    updateUserProfile(id: $userId, updateUserData: $updateUserProfile) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        id\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateUserProfileDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserInfo($username: String!) {\n    user(username: $username) {\n      id\n      username\n      aka\n      userRoleId\n      isActive\n      userRole {\n        id\n        name\n      }\n      userGender {\n        name\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UserInfoDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
