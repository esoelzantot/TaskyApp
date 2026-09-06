import type { Category } from "@/src/models/category";
import { api } from "@/src/rtk/api";

import ApiEndpoints from "@/src/apis/api-endpoints";

export const categoriesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: ApiEndpoints.GET_CATEGORIES,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
