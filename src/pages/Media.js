import * as React from "react";
import { useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import { useQuery, gql } from "@apollo/client";
import Loader from '../Common/Loader'

const columns = [
  { field: "id", headerName: "Media Id", width: 70 },
  { field: "title", headerName: "Title", width: 280, valueGetter: (params) => params.row.title.english },

  {
    field: "description",
    headerName: "Description",
    sortable: true,
    width: 420,
  },
  {
    field: "type",
    headerName: "Type",
    sortable: true,
    width: 80,
  },
  {
    field: "status",
    headerName: "status",
    sortable: true,
    width: 160,
  },
  {
    field: "episodes",
    headerName: "Episodes",
    sortable: true,
    width: 100,
  },
  {
    field: "duration",
    headerName: "Duration",
    sortable: true,
    width: 80,
  },
];

const user_query = gql`
query{
    Page(perPage:100){
        media{
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            description
            type
            status
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            episodes
            chapters
            duration
          }
      }
    }`;
export default function Studio() {
  const { loading, error, data } = useQuery(user_query);


  if (loading) return <p className="loader-pan"><Loader /></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h3 className="pb-4 text-xl text-color-gray font-bold">Media</h3>
      <DataGrid
        rows={data.Page.media}
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
