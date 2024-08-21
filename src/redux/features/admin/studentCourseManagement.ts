import { TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourseManagement.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/offered-courses/my-offered-course",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TOfferedCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseID}/assign-faculties`,
        method: "PUT",
        data: args.data,
      }),
    }),
  }),
});

export const { useGetAllOfferedCoursesQuery } = studentCourseApi;
