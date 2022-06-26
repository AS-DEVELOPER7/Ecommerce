import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: "sgzuld3d",
  dataset: "production",
  apiVersion: "2022-06-26",
  useCdn: true,
  token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
const builder = imageUrlBuilder(client);
export const urlfor = (source) => builder.image(source);
