import { resetCategories } from "./category-service";
import { resetEnquiries } from "./enquiry-service";
import { resetProducts } from "./product-service";

export async function resetMockData() {
  await Promise.all([resetCategories(), resetProducts(), resetEnquiries()]);
}
