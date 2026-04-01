
import { dbConnect } from "@/lib/dbConnect";
import { getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { userModel } from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

}
