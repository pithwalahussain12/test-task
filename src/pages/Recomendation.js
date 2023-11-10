import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery, gql } from "@apollo/client";
import Loader from '../Common/Loader';

const columns = [
  { field: "id", headerName: "Id", width: 70 },
  {
    field: "media",
    headerName: "Media Title",
    width: 380,
    valueGetter: (params) => params.row.media.title.english,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 180,
  },

  {
    field: "user",
    headerName: "User Name",
    width: 300,
    valueGetter: (params) => params.row.user.name
  },
  {
    field: "userRating",
    headerName: "User Rating",
    width: 200,
  },
];

const user_query = gql`
  query {
    Page(perPage: 100) {
      recommendations {
        id
        rating
        userRating
        media {
          title {
            romaji
            english
            native
            userPreferred
          }
        }
        user {
          name
        }
        mediaRecommendation {
          title {
            romaji
            english
            native
            userPreferred
          }
        }
      }
    }
  }
`;
export default function Studio() {
  const { loading, error, data } = useQuery(user_query);

  if (loading) return <p className="loader-pan"><Loader /></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h3 className="pb-4 text-xl text-color-gray font-bold">Recommendations</h3>
      <DataGrid
        rows={data.Page.recommendations}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 300 },
          },
        }}
        pageSizeOptions={[5, 10]}
      // checkboxSelection
      />
    </div>
  );
}
