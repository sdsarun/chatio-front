import { graphql } from "@/core/services/graphql";

export const CreateUserIfNotExistsMutation = graphql(`
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
`);

export const UpdateUserProfileMutation = graphql(`
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
`);