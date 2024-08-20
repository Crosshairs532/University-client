import { TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),

    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    updateSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registration/${args.id}`,
        method: "PATCH",
        data: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
} = courseManagementApi;
