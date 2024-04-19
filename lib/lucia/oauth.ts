import { Google,  } from "arctic";

export const google = new Google(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/google");

