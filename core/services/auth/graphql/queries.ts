import { graphql } from "@/core/services/graphql";

export const GetUserInfoQuery = graphql(`
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
`);