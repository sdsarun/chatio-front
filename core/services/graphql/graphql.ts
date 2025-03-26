/* eslint-disable */
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
  gender: UserGenderType;
  role: UserRoleType;
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUserIfNotExists: User;
};


export type MutationCreateUserIfNotExistsArgs = {
  createUserIfNotExistsInput: CreateUserIfNotExistsInput;
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

export type User = {
  __typename?: 'User';
  aka: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userGender?: Maybe<UserGender>;
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
