import { LoaderFunction, redirect } from "@remix-run/node";
import { requireClientId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireClientId(request)
  return redirect('/home')
}