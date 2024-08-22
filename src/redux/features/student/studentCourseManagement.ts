import { TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourseManagement.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/offered-courses/my-offered-course",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TOfferedCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: `/enrolled-courses/create-enrolled-course`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const { useGetAllOfferedCoursesQuery, useEnrollCourseMutation } =
  studentCourseApi;
