import ApiEndpoints from "@/src/apis/api-endpoints";
import type { Category } from "@/src/models/category";
import { api } from "@/src/rtk/api";

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  id: Category["id"];
  name: string;
}

export const categoriesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: ApiEndpoints.GET_CATEGORIES,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((category) => ({
                type: "Category" as const,
                id: category.id,
              })),
              { type: "Category" as const, id: "LIST" },
            ]
          : [{ type: "Category" as const, id: "LIST" }],
    }),

    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: (body) => ({
        url: ApiEndpoints.CREATE_CATEGORY,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: builder.mutation<Category, UpdateCategoryRequest>({
      query: ({ id, ...body }) => ({
        url: ApiEndpoints.UPDATE_CATEGORY_BY_ID(id),
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    deleteCategory: builder.mutation<void, Category["id"]>({
      query: (id) => ({
        url: ApiEndpoints.DELETE_CATEGORY_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
