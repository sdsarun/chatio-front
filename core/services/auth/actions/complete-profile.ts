"use server"

// core
import { executeGraphQL } from "@/core/services/graphql/execute";
import { UpdateUserProfileMutation } from "@/core/services/auth/graphql/mutations";

// constants
import { UserGenderType } from "@/core/services/graphql/graphql";

export type CompleteProfileDTO = {
  userId: string;
  gender: UserGenderType;
}

export async function completeProfile(
  dto: CompleteProfileDTO
) {
  return executeGraphQL(UpdateUserProfileMutation, { 
    userId: dto.userId,
    updateUserProfile: { gender: dto.gender }
  });
}
