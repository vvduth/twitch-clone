"use server"
import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onBlock = async (id: string) => {
    // TODO: adapt to disconnect from live stream
    // TODO: allow the ability to kick the guest
    const blockedUser = await blockUser(id)

    revalidatePath("/")

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`)
    }
    return blockedUser
}

export const onunBlock = async (id: string) => {
    const unblockedUser = await unblockUser(id)

    revalidatePath("/")

    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`)
    }
    return unblockedUser
}