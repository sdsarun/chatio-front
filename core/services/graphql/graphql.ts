/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateUserIfNotExistsInput = {
  aka?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<UserGenderType>;
  role: UserRoleType;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUserIfNotExists: User;
  updateUserProfile: User;
};


export type MutationCreateUserIfNotExistsArgs = {
  createUserIfNotExistsInput: CreateUserIfNotExistsInput;
};


export type MutationUpdateUserProfileArgs = {
  id: Scalars['ID']['input'];
  updateUserData: UpdateUserProfileInput;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  aka?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProfileInput = {
  aka?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<UserGenderType>;
};

export type User = {
  __typename?: 'User';
  aka: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userGender?: Maybe<UserGender>;
  userGenderId?: Maybe<Scalars['String']['output']>;
  userRole?: Maybe<UserRole>;
  userRoleId?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserGender = {
  __typename?: 'UserGender';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum UserGenderType {
  Female = 'FEMALE',
  Male = 'MALE',
  RatherNotSay = 'RATHER_NOT_SAY'
}

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum UserRoleType {
  Guest = 'GUEST',
  Registered = 'REGISTERED'
}

export type CreateUserIfNotExistsMutationVariables = Exact<{
  userData: CreateUserIfNotExistsInput;
}>;


export type CreateUserIfNotExistsMutation = { __typename?: 'Mutation', createUserIfNotExists: { __typename?: 'User', id: string, username: string, aka: string, userRoleId?: string | null, isActive?: boolean | null, userRole?: { __typename?: 'UserRole', id: string, name: string } | null, userGender?: { __typename?: 'UserGender', id: string, name: string } | null } };

export type UpdateUserProfileMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  updateUserProfile: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'User', id: string, username: string, aka: string, userRoleId?: string | null, isActive?: boolean | null, userRole?: { __typename?: 'UserRole', id: string, name: string } | null, userGender?: { __typename?: 'UserGender', id: string, name: string } | null } };

export type UserInfoQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserInfoQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, aka: string, userRoleId?: string | null, isActive?: boolean | null, userRole?: { __typename?: 'UserRole', id: string, name: string } | null, userGender?: { __typename?: 'UserGender', name: string, id: string } | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CreateUserIfNotExistsDocument = new TypedDocumentString(`
    mutation CreateUserIfNotExists($userData: CreateUserIfNotExistsInput!) {
  createUserIfNotExists(createUserIfNotExistsInput: $userData) {
    id
    username
    aka
    userRoleId
    isActive
    userRole {
      id
      name
    }
    userGender {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<CreateUserIfNotExistsMutation, CreateUserIfNotExistsMutationVariables>;
export const UpdateUserProfileDocument = new TypedDocumentString(`
    mutation UpdateUserProfile($userId: ID!, $updateUserProfile: UpdateUserProfileInput!) {
  updateUserProfile(id: $userId, updateUserData: $updateUserProfile) {
    id
    username
    aka
    userRoleId
    isActive
    userRole {
      id
      name
    }
    userGender {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UserInfoDocument = new TypedDocumentString(`
    query UserInfo($username: String!) {
  user(username: $username) {
    id
    username
    aka
    userRoleId
    isActive
    userRole {
      id
      name
    }
    userGender {
      name
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UserInfoQuery, UserInfoQueryVariables>;