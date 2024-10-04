import supabase from "../supabase";

export default async function uploadImage(patwithName: string, buffer: Buffer, mimetype: string) {
    const { error, data } = await supabase.storage.from('foto').upload(patwithName, buffer, {
        contentType: mimetype
    })

    if (error) {
        return error.message
    }

    return data!.fullPath
}