"use server"

// core
import { UpdateUserProfileMutation } from "@/core/services/auth/graphql/mutations";
import { executeGraphQL } from "@/core/services/graphql/execute";
import { verifySession } from "@/core/lib/dal";

// constants
import { type UpdateUserProfileMutation as UpdateUserProfileResult, UserGenderType } from "@/core/services/graphql/graphql";
import { ServerActionResult } from "@/core/types/server-action";

export type CompleteProfileDTO = {
  userId: string;
  gender: UserGenderType;
}

export type CompleteProfileResult = ServerActionResult<UpdateUserProfileResult>

export async function completeProfile(
  dto: CompleteProfileDTO
): Promise<CompleteProfileResult> {
  const session = await verifySession();

  const { data, errors } = await executeGraphQL(UpdateUserProfileMutation, {
    userId: dto.userId,
    updateUserProfile: { gender: dto.gender }
  }, {
    requestOptions: {
      headers: {
        Authorization: `Bearer ${session?.token?.accessToken}`
      }
    }
  });

  if (errors) {
    return {
      success: false,
      error: errors.map(({ message, extensions }) => ({ 
        code: extensions?.code as string,
        message
      }))
    }
  }

  return {
    success: true,
    data: data!,
  }
}
